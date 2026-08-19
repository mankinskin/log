mod api;
mod app;
mod types;

use app::App;

fn main() {
    #[cfg(target_arch = "wasm32")]
    viewer_api_dioxus::tracing_setup::install();
    dioxus::launch(App);
}
