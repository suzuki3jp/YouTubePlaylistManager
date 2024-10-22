#![allow(dead_code)]

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// GET /playlistitems [docs](https://developers.google.com/youtube/v3/docs/playlistItems/list)
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GetPlaylistItemsResponse {
    pub kind: String,

    pub etag: String,

    #[serde(rename = "nextPageToken")]
    pub next_page_token: Option<String>,

    #[serde(rename = "prevPageToken")]
    pub prev_page_token: Option<String>,

    pub items: Vec<PlaylistItem>,

    #[serde(rename = "pageInfo")]
    pub page_info: PlaylistItemsPageInfo,
}

/// Playlist item resource [docs](https://developers.google.com/youtube/v3/docs/playlistItems#resource)
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlaylistItem {
    pub kind: String,

    pub etag: String,

    pub id: String,

    pub snippet: PlaylistItemSnippet,

    #[serde(rename = "contentDetails")]
    pub content_details: PlaylistItemContentDetails,

    pub status: PlaylistItemStatus,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlaylistItemsPageInfo {
    #[serde(rename = "totalResults")]
    pub total_results: u32,

    #[serde(rename = "resultsPerPage")]
    pub results_per_page: u32,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlaylistItemSnippet {
    #[serde(rename = "publishedAt")]
    pub published_at: String,

    #[serde(rename = "channelId")]
    pub channel_id: String,

    pub title: String,

    pub description: String,

    pub thumbnails: HashMap<String, PlaylistItemThumbnail>,

    #[serde(rename = "channelTitle")]
    pub channel_title: String,

    #[serde(rename = "videoOwnerChannelTitle")]
    pub video_owner_channel_title: String,

    #[serde(rename = "videoOwnerChannelId")]
    pub video_owner_channel_id: String,

    #[serde(rename = "playlistId")]
    pub playlist_id: String,

    pub position: u32,

    #[serde(rename = "resourceId")]
    pub resource_id: PlaylistItemResourceId,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlaylistItemThumbnail {
    pub url: String,

    pub width: u32,

    pub height: u32,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlaylistItemResourceId {
    kind: String,

    #[serde(rename = "videoId")]
    video_id: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlaylistItemContentDetails {
    #[serde(rename = "videoId")]
    pub video_id: String,

    #[serde(rename = "videoPublishedAt")]
    pub video_published_at: String,

    pub note: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlaylistItemStatus {
    #[serde(rename = "privacyStatus")]
    pub privacy_status: String,
}
