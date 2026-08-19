use std::collections::HashMap;

use dioxus::prelude::*;
use viewer_api_dioxus::{
    is_mobile_sidebar_viewport,
    set_gpu_overlay_enabled,
    Camera,
    EdgeRef3D,
    FileContentViewer,
    FileTree,
    FilterDef,
    GlassPanel,
    Graph3D,
    HamburgerIcon,
    Header,
    HeaderActions,
    Layout,
    Layout3D,
    LogIcon,
    Node3D,
    Overlay,
    SearchIcon,
    Sidebar,
    StatsIcon,
    TabBar,
    TabItem,
    ThemeProvider,
    ThemeSettings,
    TreeNode,
    ViewerShell,
    WgpuOverlay,
};

use crate::{
    api::{
        HttpLogViewerBackend,
        LogViewerBackend,
    },
    types::{
        LogEntry,
        LogFileInfo,
        Signatures,
    },
};

#[derive(Clone, Debug, Default, PartialEq)]
struct FileViewState {
    all_entries: Vec<LogEntry>,
    visible_entries: Vec<LogEntry>,
    search_query: String,
    jq_filter: String,
    active_tab: String,
    selected_line: Option<usize>,
    code_file: Option<String>,
    code_content: String,
    code_language: Option<String>,
    signatures: Signatures,
}

impl FileViewState {
    fn with_entries(entries: Vec<LogEntry>) -> Self {
        Self {
            all_entries: entries.clone(),
            visible_entries: entries,
            active_tab: "logs".to_string(),
            ..Self::default()
        }
    }
}

#[derive(Clone, Copy)]
struct Category {
    key: &'static str,
    label: &'static str,
}

const CATEGORIES: [Category; 4] = [
    Category {
        key: "graph",
        label: "Graph",
    },
    Category {
        key: "search",
        label: "Search",
    },
    Category {
        key: "insert",
        label: "Insert",
    },
    Category {
        key: "paths",
        label: "Paths",
    },
];

#[derive(Clone, Debug, serde::Deserialize)]
struct SnapshotNode {
    index: usize,
    label: String,
    width: usize,
}

#[derive(Clone, Debug, serde::Deserialize)]
struct SnapshotEdge {
    from: usize,
    to: usize,
    pattern_idx: usize,
    sub_index: usize,
}

#[derive(Clone, Debug, serde::Deserialize)]
struct GraphSnapshot {
    nodes: Vec<SnapshotNode>,
    edges: Vec<SnapshotEdge>,
}

fn parse_graph_snapshot(value: &serde_json::Value) -> Option<GraphSnapshot> {
    if value.is_string() {
        let raw = value.as_str()?;
        return serde_json::from_str::<GraphSnapshot>(raw).ok();
    }
    serde_json::from_value::<GraphSnapshot>(value.clone()).ok()
}

fn build_hypergraph_layout(entries: &[LogEntry]) -> Option<Layout3D> {
    let snapshot = entries.iter().rev().find_map(|entry| {
        entry
            .fields
            .get("graph_data")
            .and_then(parse_graph_snapshot)
    })?;

    let mut groups: HashMap<usize, Vec<&SnapshotNode>> = HashMap::new();
    for node in &snapshot.nodes {
        groups.entry(node.width).or_default().push(node);
    }

    let width_values: Vec<f32> = snapshot
        .nodes
        .iter()
        .map(|node| node.width as f32)
        .collect();
    let mean_width = if width_values.is_empty() {
        1.0
    } else {
        width_values.iter().sum::<f32>() / width_values.len() as f32
    };

    let mut widths: Vec<usize> = groups.keys().copied().collect();
    widths.sort_unstable();

    let mut nodes = Vec::with_capacity(snapshot.nodes.len());
    let mut index_to_layout_idx = HashMap::new();

    for width in widths {
        let mut layer = groups.remove(&width).unwrap_or_default();
        layer.sort_by_key(|node| node.index);
        let len = layer.len() as f32;

        for (i, node) in layer.iter().enumerate() {
            // Spread nodes horizontally within the tier; use Y for the width
            // dimension so layers stack top (large width) to bottom (small width).
            let x = (i as f32 - (len - 1.0) * 0.5) * 3.6;
            let y = (width as f32 - mean_width) * 4.0;
            let z = 0.0_f32;
            index_to_layout_idx.insert(node.index, nodes.len());
            nodes.push(Node3D {
                id: node.index.to_string(),
                label: Some(node.label.clone()),
                state: Some(format!("w{}", node.width)),
                x,
                y,
                z,
            });
        }
    }

    let mut edges = Vec::with_capacity(snapshot.edges.len());
    for edge in snapshot.edges {
        let Some(from_idx) = index_to_layout_idx.get(&edge.from).copied()
        else {
            continue;
        };
        let Some(to_idx) = index_to_layout_idx.get(&edge.to).copied() else {
            continue;
        };
        edges.push(EdgeRef3D {
            from_idx,
            to_idx,
            kind: format!("p{}:{}", edge.pattern_idx, edge.sub_index),
        });
    }

    Some(Layout3D::new(nodes, edges))
}

fn parse_route(hash: &str) -> Option<(String, String)> {
    let raw = hash.trim_start_matches('#');
    let path = raw.trim_start_matches('/');
    let rest = path.strip_prefix("file/")?;

    let valid_tabs = ["logs", "stats", "hypergraph"];
    if let Some(last_slash) = rest.rfind('/') {
        let possible_tab = &rest[last_slash + 1..];
        if valid_tabs.contains(&possible_tab) {
            let file =
                urlencoding::decode(&rest[..last_slash]).ok()?.to_string();
            return Some((file, possible_tab.to_string()));
        }
    }

    let file = urlencoding::decode(rest).ok()?.to_string();
    Some((file, "logs".to_string()))
}

// This helper is only invoked from wasm hash updates.
#[cfg_attr(not(target_arch = "wasm32"), allow(dead_code))]
fn build_route(
    file: &str,
    tab: &str,
) -> String {
    let encoded = urlencoding::encode(file);
    if tab == "logs" {
        format!("/file/{encoded}")
    } else {
        format!("/file/{encoded}/{tab}")
    }
}

fn current_hash() -> Option<String> {
    #[cfg(target_arch = "wasm32")]
    {
        web_sys::window().and_then(|w| w.location().hash().ok())
    }
    #[cfg(not(target_arch = "wasm32"))]
    {
        None
    }
}

fn update_hash(
    file: &str,
    tab: &str,
) {
    #[cfg(target_arch = "wasm32")]
    {
        if let Some(window) = web_sys::window() {
            let _ = window.location().set_hash(&build_route(file, tab));
        }
    }
    #[cfg(not(target_arch = "wasm32"))]
    {
        let _ = (file, tab);
    }
}

fn file_matches_category(
    file: &LogFileInfo,
    category: Option<&str>,
) -> bool {
    match category {
        Some("graph") => file.has_graph_snapshot,
        Some("search") => file.has_search_ops,
        Some("insert") => file.has_insert_ops,
        Some("paths") => file.has_search_paths,
        _ => true,
    }
}

fn render_source_panel(current_state: Option<FileViewState>) -> Element {
    rsx! {
        div {
            class: "log-source-panel",
            if let Some(state) = current_state {
                if state.code_content.is_empty() {
                    GlassPanel {
                        title: "Source",
                        div {
                            class: "empty-state",
                            "Select a log entry with source info to open code context."
                        }
                    }
                } else {
                    FileContentViewer {
                        content: state.code_content,
                        filename: state.code_file.unwrap_or_else(|| "source.rs".to_string()),
                        language: state.code_language,
                        highlighted_line: state.selected_line,
                    }
                }
            } else {
                GlassPanel {
                    title: "Source",
                    div {
                        class: "empty-state",
                        "No file selected."
                    }
                }
            }
        }
    }
}

fn restore_existing_file_state(
    file_states: Signal<HashMap<String, FileViewState>>,
    mut current_file: Signal<Option<String>>,
    mut active_tab: Signal<String>,
    mut search_input: Signal<String>,
    mut jq_input: Signal<String>,
    mut status_message: Signal<String>,
    name: &str,
    route_tab: Option<String>,
) -> bool {
    if let Some(existing) = file_states.read().get(name).cloned() {
        let tab = route_tab.unwrap_or(existing.active_tab);
        current_file.set(Some(name.to_string()));
        active_tab.set(tab.clone());
        search_input.set(existing.search_query);
        jq_input.set(existing.jq_filter);
        status_message.set(format!(
            "Loaded {name} ({} entries)",
            existing.visible_entries.len()
        ));
        update_hash(name, &tab);
        return true;
    }
    false
}

fn spawn_load_file_task(
    backend: HttpLogViewerBackend,
    name: String,
    route_tab: Option<String>,
    mut file_states: Signal<HashMap<String, FileViewState>>,
    mut current_file: Signal<Option<String>>,
    mut active_tab: Signal<String>,
    mut search_input: Signal<String>,
    mut jq_input: Signal<String>,
    mut is_loading: Signal<bool>,
    mut status_message: Signal<String>,
    mut error_message: Signal<Option<String>>,
) {
    spawn(async move {
        is_loading.set(true);
        error_message.set(None);
        status_message.set(format!("Loading {name}..."));

        let result = backend.get_log(&name).await;
        match result {
            Ok(data) => {
                let signatures =
                    backend.get_signatures(&name).await.unwrap_or_default();
                let first_source =
                    data.entries.iter().find(|entry| entry.file.is_some());

                let mut state =
                    FileViewState::with_entries(data.entries.clone());
                state.signatures = signatures;
                state.active_tab =
                    route_tab.unwrap_or_else(|| "logs".to_string());

                if let Some(entry) = first_source {
                    if let Some(path) = &entry.file {
                        if let Ok(src) = backend.get_source_file(path).await {
                            state.code_file = Some(path.clone());
                            state.code_content = src.content;
                            state.code_language = Some(src.language);
                            state.selected_line =
                                entry.source_line.map(|v| v as usize);
                        }
                    }
                }

                file_states.with_mut(|states| {
                    states.insert(name.clone(), state.clone());
                });
                current_file.set(Some(name.clone()));
                active_tab.set(state.active_tab.clone());
                search_input.set(state.search_query.clone());
                jq_input.set(state.jq_filter.clone());
                update_hash(&name, &state.active_tab);
                status_message.set(format!(
                    "Loaded {name} ({} entries)",
                    state.visible_entries.len()
                ));
            },
            Err(err) => {
                error_message.set(Some(err.to_string()));
                status_message.set("Error loading file".to_string());
            },
        }

        is_loading.set(false);
    });
}

fn spawn_refresh_all_task(
    backend: HttpLogViewerBackend,
    mut log_files: Signal<Vec<LogFileInfo>>,
    mut is_loading: Signal<bool>,
    mut error_message: Signal<Option<String>>,
    mut status_message: Signal<String>,
) {
    spawn(async move {
        is_loading.set(true);
        error_message.set(None);
        match backend.list_logs().await {
            Ok(files) => {
                let count = files.len();
                log_files.set(files);
                status_message.set(format!("Found {count} log files"));
            },
            Err(err) => {
                error_message.set(Some(err.to_string()));
                status_message.set("Error loading files".to_string());
            },
        }
        is_loading.set(false);
    });
}

#[component]
pub fn App() -> Element {
    rsx! { AppInner {} }
}

#[component]
fn AppInner() -> Element {
    let backend = use_signal(HttpLogViewerBackend::default);
    let mut initialized = use_signal(|| false);

    let log_files = use_signal(Vec::<LogFileInfo>::new);
    let mut file_states = use_signal(HashMap::<String, FileViewState>::new);
    let mut active_category = use_signal(|| Option::<String>::None);

    let current_file = use_signal(|| Option::<String>::None);
    let mut active_tab = use_signal(|| "logs".to_string());
    let is_loading = use_signal(|| false);
    let mut status_message = use_signal(|| "Ready".to_string());
    let error_message = use_signal(|| Option::<String>::None);

    let mut search_input = use_signal(String::new);
    let mut jq_input = use_signal(String::new);
    let mut show_filters = use_signal(|| false);
    let mut show_theme_settings = use_signal(|| false);
    let mut fx_enabled = use_signal(|| true);
    let mut sidebar_collapsed = use_signal(|| false);
    let mut mobile_sidebar_open = use_signal(|| false);
    let mut selected_hypergraph_node = use_signal(|| Option::<String>::None);

    use_effect(move || {
        set_gpu_overlay_enabled(*fx_enabled.read());
    });

    let load_file = {
        move |name: String, route_tab: Option<String>| {
            if restore_existing_file_state(
                file_states,
                current_file,
                active_tab,
                search_input,
                jq_input,
                status_message,
                &name,
                route_tab.clone(),
            ) {
                return;
            }
            let backend = backend.read().clone();
            spawn_load_file_task(
                backend,
                name,
                route_tab,
                file_states,
                current_file,
                active_tab,
                search_input,
                jq_input,
                is_loading,
                status_message,
                error_message,
            );
        }
    };

    let refresh_all = {
        move || {
            let backend = backend.read().clone();
            spawn_refresh_all_task(
                backend,
                log_files,
                is_loading,
                error_message,
                status_message,
            );
        }
    };

    if !*initialized.read() {
        initialized.set(true);
        refresh_all();
        if let Some(hash) = current_hash() {
            if let Some((file, tab)) = parse_route(&hash) {
                load_file(file, Some(tab));
            }
        }
    }

    let current_state = current_file
        .read()
        .as_ref()
        .and_then(|name| file_states.read().get(name).cloned());
    let current_entries = current_state
        .as_ref()
        .map(|state| state.visible_entries.clone())
        .unwrap_or_default();
    let hypergraph_layout = current_state
        .as_ref()
        .and_then(|state| build_hypergraph_layout(&state.all_entries));
    let hypergraph_initial_camera = hypergraph_layout.as_ref().map(|layout| {
        let mut initial_camera = Camera::default();
        let (center, radius) = layout.bounds();
        initial_camera.frame(center, radius);
        // Front-facing view: world-Y maps directly to screen-Y so the
        // width-tier layout (larger width = higher Y) appears top-to-bottom.
        initial_camera.pitch = 0.0;
        initial_camera.yaw = 0.0;
        initial_camera
    });

    let selected_filter = active_category.read().clone();
    let mut tree_nodes = Vec::new();
    for file in log_files
        .read()
        .iter()
        .filter(|file| file_matches_category(file, selected_filter.as_deref()))
    {
        tree_nodes.push(TreeNode::leaf(
            format!("file:{}", file.name),
            file.name.clone(),
        ));
    }

    tree_nodes.sort_by(|a, b| a.label.cmp(&b.label));

    let mut filter_defs = Vec::new();
    for category in CATEGORIES {
        let count = log_files
            .read()
            .iter()
            .filter(|file| file_matches_category(file, Some(category.key)))
            .count();
        filter_defs.push(FilterDef {
            key: category.key.to_string(),
            label: category.label.to_string(),
            count,
            color: None,
        });
    }

    let tabs = vec![
        TabItem::new("logs", "Logs"),
        TabItem {
            id: "stats".to_string(),
            label: "Stats".to_string(),
            icon: Some(rsx! { StatsIcon { size: 12 } }),
            modified: false,
            closeable: false,
        },
        TabItem::new("hypergraph", "Hypergraph"),
    ];

    rsx! {
        style { "html, body, #main {{ overflow: hidden; margin: 0; padding: 0; width: 100%; height: 100%; }}" }
        ThemeProvider {
            ViewerShell {
                WgpuOverlay {}
                Layout {
                    header: rsx! {
                        Header {
                            left: rsx! {
                                button {
                                    class: if *mobile_sidebar_open.read() || !*sidebar_collapsed.read() { "btn btn-icon btn-active" } else { "btn btn-icon" },
                                    aria_label: "Toggle sidebar",
                                    title: "Toggle sidebar",
                                    onclick: move |_| {
                                        if is_mobile_sidebar_viewport() {
                                            let next = !*mobile_sidebar_open.read();
                                            mobile_sidebar_open.set(next);
                                        } else {
                                            sidebar_collapsed.toggle();
                                        }
                                    },
                                    HamburgerIcon {}
                                }
                                div {
                                    class: "header-left",
                                    LogIcon { size: 14, color: "#8b9dc3" }
                                    h1 { class: "header-title", "Log Viewer" }
                                }
                            },
                            middle: rsx! {
                                div {
                                    class: "search-form",
                                    input {
                                        class: "search-input",
                                        r#type: "text",
                                        placeholder: "Search (regex supported)...",
                                        value: "{search_input}",
                                        oninput: move |evt| search_input.set(evt.value()),
                                    }
                                    button {
                                        class: "btn btn-primary",
                                        onclick: move |_| {
                                            let file = current_file.read().clone();
                                            let Some(file) = file else { return; };
                                            let query = search_input.read().trim().to_string();
                                            if query.is_empty() {
                                                file_states.with_mut(|states| {
                                                    if let Some(state) = states.get_mut(&file) {
                                                        state.visible_entries = state.all_entries.clone();
                                                        state.search_query.clear();
                                                        state.jq_filter.clear();
                                                    }
                                                });
                                                return;
                                            }

                                            let backend = backend.read().clone();
                                            let mut file_states = file_states;
                                            let mut is_loading = is_loading;
                                            let mut status_message = status_message;
                                            let mut error_message = error_message;
                                            let mut jq_input = jq_input;

                                            spawn(async move {
                                                is_loading.set(true);
                                                status_message.set(format!("Searching for '{query}'..."));
                                                match backend.search_log(&file, &query, None, None).await {
                                                    Ok(result) => {
                                                        file_states.with_mut(|states| {
                                                            if let Some(state) = states.get_mut(&file) {
                                                                state.visible_entries = result.matches;
                                                                state.search_query = query.clone();
                                                                state.jq_filter.clear();
                                                            }
                                                        });
                                                        jq_input.set(String::new());
                                                        status_message.set(format!(
                                                            "Search matched {} entries",
                                                            result.total_matches
                                                        ));
                                                    }
                                                    Err(err) => {
                                                        error_message.set(Some(err.to_string()));
                                                        status_message.set("Search error".to_string());
                                                    }
                                                }
                                                is_loading.set(false);
                                            });
                                        },
                                        SearchIcon { size: 12 }
                                        " Search"
                                    }
                                    button {
                                        class: "btn",
                                        onclick: move |_| {
                                            let next = !*show_filters.read();
                                            show_filters.set(next);
                                        },
                                        "Filters"
                                    }
                                    button {
                                        class: "btn",
                                        onclick: move |_| {
                                            let file = current_file.read().clone();
                                            let Some(file) = file else { return; };
                                            file_states.with_mut(|states| {
                                                if let Some(state) = states.get_mut(&file) {
                                                    state.visible_entries = state.all_entries.clone();
                                                    state.search_query.clear();
                                                    state.jq_filter.clear();
                                                }
                                            });
                                            search_input.set(String::new());
                                            jq_input.set(String::new());
                                            status_message.set("Cleared filters".to_string());
                                        },
                                        "Clear"
                                    }
                                }
                            },
                            right: rsx! {
                                div {
                                    class: "header-right",
                                    span { class: "status-text", "{status_message}" }
                                    button {
                                        class: "btn",
                                        onclick: move |_| {
                                            let enabled = !*fx_enabled.read();
                                            fx_enabled.set(enabled);
                                        },
                                        if *fx_enabled.read() { "✦ FX" } else { "✧ FX" }
                                    }
                                    HeaderActions {
                                        on_refresh: Some(EventHandler::new(move |_| {
                                            refresh_all();
                                            if let Some(file) = current_file.read().clone() {
                                                file_states.with_mut(|states| {
                                                    states.remove(&file);
                                                });
                                                load_file(file, None);
                                            }
                                        })),
                                        on_filter_toggle: Some(EventHandler::new(move |_| {
                                            let next = !*show_filters.read();
                                            show_filters.set(next);
                                        })),
                                        on_clear: Some(EventHandler::new(move |_| {
                                            if let Some(file) = current_file.read().clone() {
                                                file_states.with_mut(|states| {
                                                    if let Some(state) = states.get_mut(&file) {
                                                        state.visible_entries = state.all_entries.clone();
                                                        state.search_query.clear();
                                                        state.jq_filter.clear();
                                                    }
                                                });
                                            }
                                            search_input.set(String::new());
                                            jq_input.set(String::new());
                                            status_message.set("Cleared filters".to_string());
                                        })),
                                        on_theme_toggle: Some(EventHandler::new(move |_| {
                                            let next = !*show_theme_settings.read();
                                            show_theme_settings.set(next);
                                        })),
                                        filter_active: *show_filters.read(),
                                        has_active_filters: !search_input.read().trim().is_empty()
                                            || !jq_input.read().trim().is_empty(),
                                    }
                                }
                            },
                        }
                    },

                    Sidebar {
                        title: "Log Files".to_string(),
                        badge: log_files.read().len().to_string(),
                        collapsed: *sidebar_collapsed.read(),
                        on_toggle: move |_| {
                            if is_mobile_sidebar_viewport() {
                                mobile_sidebar_open.set(false);
                            } else {
                                sidebar_collapsed.toggle();
                            }
                        },
                        mobile_open: Some(*mobile_sidebar_open.read()),
                        on_mobile_open_change: move |open| mobile_sidebar_open.set(open),

                        FileTree {
                            nodes: tree_nodes,
                            filters: filter_defs,
                            active_filters: active_category.read().as_ref().map(|v| vec![v.clone()]).unwrap_or_default(),
                            selected_id: current_file.read().as_ref().map(|name| format!("file:{name}")),
                            loading: *is_loading.read() && log_files.read().is_empty(),
                            on_filter: move |key: String| {
                                if active_category.read().as_deref() == Some(key.as_str()) {
                                    active_category.set(None);
                                } else {
                                    active_category.set(Some(key));
                                }
                            },
                            on_select: move |id: String| {
                                if let Some(name) = id.strip_prefix("file:") {
                                    load_file(name.to_string(), None);
                                    mobile_sidebar_open.set(false);
                                }
                            },
                        }
                    }

                    main {
                        class: "content",
                        div {
                            class: "center-pane",
                            if *show_filters.read() {
                                div {
                                    class: "filter-panel",
                                    div {
                                        class: "filter-panel-content",
                                        input {
                                            class: "search-input",
                                            r#type: "text",
                                            placeholder: "JQ query...",
                                            value: "{jq_input}",
                                            oninput: move |evt| jq_input.set(evt.value()),
                                        }
                                        button {
                                            class: "btn",
                                            onclick: move |_| {
                                                let file = current_file.read().clone();
                                                let Some(file) = file else { return; };
                                                let jq = jq_input.read().trim().to_string();
                                                if jq.is_empty() {
                                                    return;
                                                }

                                                let backend = backend.read().clone();
                                                let mut file_states = file_states;
                                                let mut is_loading = is_loading;
                                                let mut status_message = status_message;
                                                let mut error_message = error_message;
                                                let mut search_input = search_input;

                                                spawn(async move {
                                                    is_loading.set(true);
                                                    status_message.set("Applying JQ filter...".to_string());
                                                    match backend.query_log(&file, &jq, None).await {
                                                        Ok(result) => {
                                                            file_states.with_mut(|states| {
                                                                if let Some(state) = states.get_mut(&file) {
                                                                    state.visible_entries = result.matches;
                                                                    state.jq_filter = jq.clone();
                                                                    state.search_query.clear();
                                                                }
                                                            });
                                                            search_input.set(String::new());
                                                            status_message.set(format!(
                                                                "JQ matched {} entries",
                                                                result.total_matches
                                                            ));
                                                        }
                                                        Err(err) => {
                                                            error_message.set(Some(err.to_string()));
                                                            status_message.set("JQ query failed".to_string());
                                                        }
                                                    }
                                                    is_loading.set(false);
                                                });
                                            },
                                            "Apply"
                                        }
                                        button {
                                            class: "btn",
                                            onclick: move |_| show_filters.set(false),
                                            "Close"
                                        }
                                    }
                                }
                            }

                            TabBar {
                                tabs,
                                active_id: active_tab.read().clone(),
                                on_select: move |tab_id: String| {
                                    active_tab.set(tab_id.clone());
                                    if let Some(file) = current_file.read().clone() {
                                        file_states.with_mut(|states| {
                                            if let Some(state) = states.get_mut(&file) {
                                                state.active_tab = tab_id.clone();
                                            }
                                        });
                                        update_hash(&file, &tab_id);
                                    }
                                },
                            }

                            div {
                                class: "view-container",
                                if let Some(error) = error_message.read().clone() {
                                    div { class: "alert alert-error", "{error}" }
                                }

                                if *active_tab.read() == "logs" {
                                    GlassPanel {
                                        title: "Log Entries",
                                        if current_entries.is_empty() {
                                            div { class: "empty-state", "Select a log file to view entries." }
                                        } else {
                                            ul {
                                                class: "log-list",
                                                for entry in current_entries.iter() {
                                                    {
                                                        let entry = entry.clone();
                                                        let level = entry.level.to_uppercase();
                                                        let message = entry.message.clone();
                                                        rsx! {
                                                            li {
                                                                key: "entry-{entry.line_number}",
                                                                class: "log-row",
                                                                onclick: move |_| {
                                                                    let Some(path) = entry.file.clone() else { return; };
                                                                    let backend = backend.read().clone();
                                                                    let file = current_file.read().clone();
                                                                    let mut file_states = file_states;
                                                                    let mut error_message = error_message;
                                                                    spawn(async move {
                                                                        match backend.get_source_file(&path).await {
                                                                            Ok(src) => {
                                                                                if let Some(file) = file {
                                                                                    file_states.with_mut(|states| {
                                                                                        if let Some(state) = states.get_mut(&file) {
                                                                                            state.code_file = Some(path.clone());
                                                                                            state.code_content = src.content;
                                                                                            state.code_language = Some(src.language);
                                                                                            state.selected_line = entry.source_line.map(|n| n as usize);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                            Err(err) => error_message.set(Some(err.to_string())),
                                                                        }
                                                                    });
                                                                },
                                                                span { class: "log-row-level", "{level}" }
                                                                span { class: "log-row-line", "#{entry.line_number}" }
                                                                span { class: "log-row-message", "{message}" }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else if *active_tab.read() == "stats" {
                                    GlassPanel {
                                        h3 { "Stats" }
                                        p { "Entries in current view: {current_entries.len()}" }
                                        if let Some(state) = current_state.clone() {
                                            p { "Total entries in file: {state.all_entries.len()}" }
                                            p { "Loaded signatures: {state.signatures.len()}" }
                                        }
                                    }
                                } else if *active_tab.read() == "hypergraph" {
                                    if let Some(layout) = hypergraph_layout.clone() {
                                        div {
                                            class: "hypergraph-tab",
                                            Graph3D {
                                                layout: layout.clone(),
                                                initial_camera: hypergraph_initial_camera.clone(),
                                                container_id: "log-hypergraph3d".to_string(),
                                                container_style: "position: absolute; inset: 0; overflow: hidden; user-select: none; cursor: grab;".to_string(),
                                                selected_node_id: selected_hypergraph_node.read().clone(),
                                                div {
                                                    id: "graph3d-nodes",
                                                    style: "position: absolute; inset: 0; pointer-events: none;",
                                                    for (idx, node) in layout.nodes.iter().enumerate() {
                                                        {
                                                            let node_id = node.id.clone();
                                                            let title = node.label.clone().unwrap_or_else(|| format!("#{}", node.id));
                                                            let node_state = node.state.clone().unwrap_or_else(|| "node".to_string());
                                                            let is_selected = selected_hypergraph_node.read().as_deref() == Some(node.id.as_str());
                                                            rsx! {
                                                                div {
                                                                    key: "hyper-node-{node.id}",
                                                                    class: if is_selected { "graph-node-card content node-card-selected" } else { "graph-node-card content" },
                                                                    "data-node-idx": "{idx}",
                                                                    style: "position: absolute; top: 0; left: 0; pointer-events: auto; transform-origin: center center; display: none; width: 220px; height: 52px; box-sizing: border-box; border: 1px solid var(--graph-node-border, rgba(200,200,200,0.35)); border-left: 3px solid var(--accent-blue); border-radius: 7px; background: var(--graph-node-surface, rgba(30,30,40,0.92)); backdrop-filter: blur(2px); padding: 8px 10px; cursor: pointer; overflow: hidden; color: var(--graph-node-text, #e8e8f0); box-shadow: var(--graph-node-shadow, 0 3px 12px rgba(0,0,0,0.6));",
                                                                    onclick: move |evt: Event<MouseData>| {
                                                                        evt.stop_propagation();
                                                                        selected_hypergraph_node.set(Some(node_id.clone()));
                                                                    },
                                                                    div {
                                                                        style: "font-size: 13px; font-weight: 600; color: var(--graph-node-text, #e8e8f0); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",
                                                                        "{title}"
                                                                    }
                                                                    div {
                                                                        style: "display: flex; align-items: center; gap: 6px; margin-top: 4px;",
                                                                        span {
                                                                            style: "font-size: 11px; color: var(--accent-blue); font-weight: 500;",
                                                                            "{node_state}"
                                                                        }
                                                                        span {
                                                                            style: "font-size: 10px; color: var(--text-muted);",
                                                                            "#{node.id}"
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                div {
                                                    class: "graph-controls-hint",
                                                    "Left-drag: orbit • Right-drag: pan • Scroll: zoom • Click card: focus"
                                                }
                                                div {
                                                    class: "graph-count-badge",
                                                    "{layout.nodes.len()} nodes • {layout.edges.len()} edges"
                                                }
                                            }
                                        }
                                    } else {
                                        GlassPanel {
                                            h3 { "Hypergraph" }
                                            p { "No graph snapshot found in this log. Capture one with graph.emit_graph_snapshot() in the traced test." }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    {render_source_panel(current_state.clone())}
                }

                Overlay {
                    open: *show_theme_settings.read(),
                    on_close: move |_| show_theme_settings.set(false),
                    ThemeSettings {
                        on_close: move |_| show_theme_settings.set(false),
                    }
                }
            }
        }
    }
}
