use reqwest::{Client, Method, StatusCode, Url};
use serde::Deserialize;
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
pub struct YoutubeApiRequestOptions<'a> {
    pub method: Method,
    pub path: &'a str,
    pub params: Vec<(&'a str, &'a str)>,
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
        } = options;

        let mut url = self.base_url.join(path).expect("path must be a valid URL.");

        url = Url::parse_with_params(url.as_ref(), params)
            .map_err(|e| YoutubeApiError::InvalidUrl(e.to_string()))?;

        let res = self
            .client
            .request(method, url)
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
            let mut params: Vec<(&str, &str)> = vec![
                ("key", &self.key),
                ("part", "id,snippet,contentDetails,status"),
                ("playlistId", playlist_id),
                ("maxResults", "50"),
            ];

            if let Some(token) = &next_page_token {
                params.push(("pageToken", token));
            }

            let options = YoutubeApiRequestOptions {
                method: Method::GET,
                path: "playlistItems",
                params,
            };

            let res = self.request::<GetPlaylistItemsResponse>(options).await?;

            items.extend(res.items);

            if let Some(token) = res.next_page_token {
                next_page_token = Some(token)
            } else {
                break;
            }
        }
        Ok(items)
    }
}
