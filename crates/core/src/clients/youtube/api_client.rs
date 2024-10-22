use std::collections::HashMap;

use reqwest::{Client, Method, StatusCode, Url};
use serde::{Deserialize, Serialize};
use thiserror::Error;

use super::typings::playlist_items::{GetPlaylistItemsResponse, PlaylistItem};

#[derive(Error, Debug)]
pub enum YoutubeApiError {
    #[error("HTTP request failed: {0}")]
    RequestFailed(String),
    #[error("Failed to parse JSON: {0}")]
    JsonParseError(String),
    #[error("API error: {status}, message: {message}")]
    ApiError { status: StatusCode, message: String },
    #[error("Invalid url: {0}")]
    InvalidUrl(String),
}

#[derive(Debug)]
pub struct YoutubeApiRequestOptions<'a, T: Serialize = ()> {
    pub method: Method,
    pub path: &'a str,
    pub params: Vec<(&'a str, &'a str)>,
    pub body: Option<T>,
}

pub struct YoutubeApiClient {
    client: Client,
    key: String,
    base_url: Url,
}

impl YoutubeApiClient {
    /// Create a new YoutubeApiClient instance
    pub fn new(key: String) -> Self {
        const BASE_URL: &str = "https://www.googleapis.com/youtube/v3/";

        Self {
            client: Client::new(),
            key,
            base_url: Url::parse(BASE_URL).expect("BASE_URL parse error"),
        }
    }

    /// Send a request to Youtube Data API v3
    async fn request<'a, T: for<'de> Deserialize<'de>>(
        &self,
        options: YoutubeApiRequestOptions<'a>,
    ) -> Result<T, YoutubeApiError> {
        let YoutubeApiRequestOptions {
            method,
            path,
            params,
            body,
        } = options;

        let mut url = self.base_url.join(path).expect("path must be a valid URL.");

        url = Url::parse_with_params(url.as_ref(), params)
            .map_err(|e| YoutubeApiError::InvalidUrl(e.to_string()))?;

        let mut req = self.client.request(method, url);

        if let Some(b) = body {
            let json_body = serde_json::to_string(&b)
                .map_err(|e| YoutubeApiError::JsonParseError(e.to_string()))?;
            req = req.body(json_body);
        }

        let res = req
            .send()
            .await
            .map_err(|e| YoutubeApiError::RequestFailed(e.to_string()))?;

        match res.status() {
            StatusCode::OK => {
                let json = res
                    .json::<T>()
                    .await
                    .map_err(|e| YoutubeApiError::JsonParseError(e.to_string()))?;
                Ok(json)
            }
            status => {
                let message = res
                    .text()
                    .await
                    .unwrap_or_else(|_| "Unknown error".to_string());
                Err(YoutubeApiError::ApiError { status, message })
            }
        }
    }

    /// GET /playlistitems [docs](https://developers.google.com/youtube/v3/docs/playlistItems/list)
    pub async fn get_playlist_items(
        &self,
        playlist_id: &str,
    ) -> Result<Vec<PlaylistItem>, YoutubeApiError> {
        let mut next_page_token: Option<String> = None;
        let mut items: Vec<PlaylistItem> = vec![];

        loop {
            let mut builder = YoutubeApiRequestBuilder::new(Method::GET, "playlistItems")
                .set_param("key", &self.key)
                .set_param("part", "id,snippet,contentDetails,status")
                .set_param("playlistId", playlist_id)
                .set_param("maxResults", "50");

            if let Some(token) = &next_page_token {
                builder = builder.set_param("pageToken", token);
            }

            let res = self
                .request::<GetPlaylistItemsResponse>(builder.to_options())
                .await?;

            items.extend(res.items);

            if let Some(token) = res.next_page_token {
                next_page_token = Some(token)
            } else {
                break;
            }
        }
        Ok(items)
    }

    /// PUT /playlistitems [docs](https://developers.google.com/youtube/v3/docs/playlistItems/update)
    pub async fn update_playlist_item(
        &self,
        mut item: PlaylistItem,
        new_position: Option<&u32>,
        new_note: Option<&str>,
    ) {
        if let Some(p) = new_position {
            item.snippet.position = *p;
        }

        if let Some(n) = new_note {
            item.content_details.note = Some(n.to_owned());
        }

        let builder = YoutubeApiRequestBuilder::new(Method::PUT, "playlistItems")
            .set_param("key", &self.key)
            .set_body(item);

        // TODO: PUT /playlistitems をやろうと思ったけど、API KEY ではできなくて、OAuth2 認証が必要らしく、断念
    }
}

pub struct YoutubeApiRequestBuilder<'a, T: Serialize + Clone = ()> {
    pub method: Method,
    pub path: &'a str,
    pub params: HashMap<&'a str, &'a str>,
    pub body: Option<T>,
}

impl<'a, T: Serialize + Clone> YoutubeApiRequestBuilder<'a, T> {
    pub fn new(method: Method, path: &'a str) -> Self {
        Self {
            method,
            path,
            params: HashMap::new(),
            body: None,
        }
    }

    pub fn set_param(mut self, k: &'a str, v: &'a str) -> Self {
        self.params.insert(k, v);
        self
    }

    pub fn set_body(mut self, body: T) -> Self {
        self.body = Some(body);
        self
    }

    pub fn to_options(&self) -> YoutubeApiRequestOptions<'a, T> {
        let YoutubeApiRequestBuilder {
            method,
            path,
            params,
            body,
        } = self;

        YoutubeApiRequestOptions {
            method: method.clone(),
            path,
            params: params.clone().into_iter().collect(),
            body: body.clone(),
        }
    }
}
