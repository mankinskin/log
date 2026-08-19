use std::fmt;

use gloo_net::http::{
    Request,
    RequestBuilder,
};
use percent_encoding::{
    utf8_percent_encode,
    NON_ALPHANUMERIC,
};
use serde::{
    de::DeserializeOwned,
    Serialize,
};
use viewer_api_dioxus::with_session;

use crate::types::{
    JqQueryResponse,
    LogContentResponse,
    LogFileInfo,
    SearchResponse,
    SessionConfig,
    SessionConfigUpdate,
    Signatures,
    SourceFileResponse,
};

pub type ApiResult<T> = Result<T, ApiError>;

#[derive(Debug)]
pub enum ApiError {
    Network(gloo_net::Error),
    HttpStatus(u16),
    Serialize(serde_json::Error),
}

impl fmt::Display for ApiError {
    fn fmt(
        &self,
        f: &mut fmt::Formatter<'_>,
    ) -> fmt::Result {
        match self {
            Self::Network(err) => write!(f, "network error: {err}"),
            Self::HttpStatus(status) =>
                write!(f, "request failed with status {status}"),
            Self::Serialize(err) => write!(f, "serialization error: {err}"),
        }
    }
}

impl std::error::Error for ApiError {}

impl From<gloo_net::Error> for ApiError {
    fn from(value: gloo_net::Error) -> Self {
        Self::Network(value)
    }
}

impl From<serde_json::Error> for ApiError {
    fn from(value: serde_json::Error) -> Self {
        Self::Serialize(value)
    }
}

#[allow(async_fn_in_trait)]
// Keep these endpoints in the shared frontend backend contract even when
// some viewers do not use every operation yet.
#[allow(dead_code)]
pub trait LogViewerBackend {
    async fn list_logs(&self) -> ApiResult<Vec<LogFileInfo>>;
    async fn get_log(
        &self,
        name: &str,
    ) -> ApiResult<LogContentResponse>;
    async fn get_signatures(
        &self,
        name: &str,
    ) -> ApiResult<Signatures>;
    async fn search_log(
        &self,
        name: &str,
        query: &str,
        level: Option<&str>,
        limit: Option<usize>,
    ) -> ApiResult<SearchResponse>;
    async fn query_log(
        &self,
        name: &str,
        jq: &str,
        limit: Option<usize>,
    ) -> ApiResult<JqQueryResponse>;
    async fn get_source_file(
        &self,
        path: &str,
    ) -> ApiResult<SourceFileResponse>;
    async fn get_session_config(&self) -> ApiResult<SessionConfig>;
    async fn update_session_config(
        &self,
        update: &SessionConfigUpdate,
    ) -> ApiResult<SessionConfig>;
}

#[derive(Clone, Debug)]
pub struct HttpLogViewerBackend {
    base_url: String,
}

impl Default for HttpLogViewerBackend {
    fn default() -> Self {
        Self::new("/api")
    }
}

impl HttpLogViewerBackend {
    pub fn new(base_url: impl Into<String>) -> Self {
        Self {
            base_url: base_url.into(),
        }
    }

    fn api_url(
        &self,
        path: &str,
    ) -> String {
        format!("{}{}", self.base_url.trim_end_matches('/'), path)
    }

    fn encode(value: &str) -> String {
        utf8_percent_encode(value, NON_ALPHANUMERIC).to_string()
    }

    async fn send_builder_json<T>(
        &self,
        request: RequestBuilder,
    ) -> ApiResult<T>
    where
        T: DeserializeOwned,
    {
        let response = request.send().await?;
        if !response.ok() {
            return Err(ApiError::HttpStatus(response.status()));
        }
        response.json().await.map_err(ApiError::Network)
    }

    // Retained for upcoming JSON write flows (session/config updates).
    #[allow(dead_code)]
    async fn send_request_json<T>(
        &self,
        request: Request,
    ) -> ApiResult<T>
    where
        T: DeserializeOwned,
    {
        let response = request.send().await?;
        if !response.ok() {
            return Err(ApiError::HttpStatus(response.status()));
        }
        response.json().await.map_err(ApiError::Network)
    }

    fn attach_session(mut request: RequestBuilder) -> RequestBuilder {
        for (name, value) in with_session(Vec::new()) {
            request = request.header(&name, &value);
        }
        request
    }

    // Retained for upcoming JSON write flows (session/config updates).
    #[allow(dead_code)]
    fn attach_headers(
        mut request: RequestBuilder,
        headers: Vec<(String, String)>,
    ) -> RequestBuilder {
        for (name, value) in headers {
            request = request.header(&name, &value);
        }
        request
    }

    // Retained for upcoming JSON write flows (session/config updates).
    #[allow(dead_code)]
    async fn post_json<B, T>(
        &self,
        path: &str,
        body: &B,
    ) -> ApiResult<T>
    where
        B: Serialize,
        T: DeserializeOwned,
    {
        let body = serde_json::to_string(body)?;
        let request = Self::attach_headers(
            Request::post(&self.api_url(path)),
            with_session(vec![(
                "Content-Type".to_owned(),
                "application/json".to_owned(),
            )]),
        )
        .body(body)
        .map_err(ApiError::Network)?;
        self.send_request_json(request).await
    }
}

impl LogViewerBackend for HttpLogViewerBackend {
    async fn list_logs(&self) -> ApiResult<Vec<LogFileInfo>> {
        let request =
            Self::attach_session(Request::get(&self.api_url("/logs")));
        self.send_builder_json(request).await
    }

    async fn get_log(
        &self,
        name: &str,
    ) -> ApiResult<LogContentResponse> {
        let path = format!("/logs/{}", Self::encode(name));
        let request = Self::attach_session(Request::get(&self.api_url(&path)));
        self.send_builder_json(request).await
    }

    async fn get_signatures(
        &self,
        name: &str,
    ) -> ApiResult<Signatures> {
        let path = format!("/signatures/{}", Self::encode(name));
        let request = Self::attach_session(Request::get(&self.api_url(&path)));
        self.send_builder_json(request).await
    }

    async fn search_log(
        &self,
        name: &str,
        query: &str,
        level: Option<&str>,
        limit: Option<usize>,
    ) -> ApiResult<SearchResponse> {
        let mut path =
            format!("/search/{}?q={}", Self::encode(name), Self::encode(query));
        if let Some(level) = level {
            path.push_str("&level=");
            path.push_str(&Self::encode(level));
        }
        if let Some(limit) = limit {
            path.push_str("&limit=");
            path.push_str(&limit.to_string());
        }

        let request = Self::attach_session(Request::get(&self.api_url(&path)));
        self.send_builder_json(request).await
    }

    async fn query_log(
        &self,
        name: &str,
        jq: &str,
        limit: Option<usize>,
    ) -> ApiResult<JqQueryResponse> {
        let mut path =
            format!("/query/{}?jq={}", Self::encode(name), Self::encode(jq));
        if let Some(limit) = limit {
            path.push_str("&limit=");
            path.push_str(&limit.to_string());
        }

        let request = Self::attach_session(Request::get(&self.api_url(&path)));
        self.send_builder_json(request).await
    }

    async fn get_source_file(
        &self,
        path: &str,
    ) -> ApiResult<SourceFileResponse> {
        let path = format!("/source/{}", Self::encode(path));
        let request = Self::attach_session(Request::get(&self.api_url(&path)));
        self.send_builder_json(request).await
    }

    async fn get_session_config(&self) -> ApiResult<SessionConfig> {
        let request =
            Self::attach_session(Request::get(&self.api_url("/session")));
        self.send_builder_json(request).await
    }

    async fn update_session_config(
        &self,
        update: &SessionConfigUpdate,
    ) -> ApiResult<SessionConfig> {
        self.post_json("/session", update).await
    }
}
