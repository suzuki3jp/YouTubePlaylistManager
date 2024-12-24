import { Playlist, PlaylistItem } from "@/lib/base-adapter";
import type { youtube_v3 } from "googleapis";
import { makeError } from "./YoutubeAdapterError";

/**
 * Convert the given API response to a Playlist instance.
 * @param res
 * @returns
 */
export function convertToPlaylist(
    res: youtube_v3.Schema$Playlist[],
): Playlist[] {
    const convertedItems: Playlist[] = [];

    for (const i of res) {
        if (!i.id || !i.snippet || !i.snippet.title || !i.snippet.thumbnails)
            throw makeError("UNKNOWN_ERROR");

        const thumbnailUrl = getThumbnailUrlFromAPIData(i.snippet.thumbnails);
        if (!thumbnailUrl) throw makeError("UNKNOWN_ERROR");

        const obj = new Playlist({
            id: i.id,
            title: i.snippet.title,
            thumbnailUrl,
        });
        convertedItems.push(obj);
    }
    return convertedItems;
}

/**
 * Convert the given API response to a PlaylistItem instance.
 * If the owner of the video is a topic channel, it will be trimmed.
 * @param items
 * @returns
 */
export function convertToPlaylistItem(
    items: youtube_v3.Schema$PlaylistItem[],
): PlaylistItem[] {
    const convertedItems: PlaylistItem[] = [];

    for (const i of items) {
        if (
            !i.id ||
            !i.snippet ||
            !i.snippet.title ||
            !i.snippet.resourceId ||
            !i.snippet.resourceId.videoId ||
            typeof i.snippet.position !== "number" ||
            !i.snippet.videoOwnerChannelTitle ||
            !i.snippet.thumbnails
        )
            throw makeError("UNKNOWN_ERROR");

        const thumbnailUrl = getThumbnailUrlFromAPIData(i.snippet.thumbnails);
        if (!thumbnailUrl) throw makeError("UNKNOWN_ERROR");

        const obj = new PlaylistItem({
            id: i.id,
            title: i.snippet.title,
            thumbnailUrl,
            position: i.snippet.position,
            // Youtube Music の曲などのアイテムでは "OwnerName - Topic" という形式で返されるため " - Topic" をトリミングする
            author: i.snippet.videoOwnerChannelTitle
                .replace(/\s*-\s*Topic$/, "")
                .trim(),
            videoId: i.snippet.resourceId.videoId,
        });
        convertedItems.push(obj);
    }
    return convertedItems;
}

/**
 * Get the thumbnail URL from the given API response data.
 * It will return the URL of the highest resolution thumbnail.
 * @param data
 * @returns
 */
export function getThumbnailUrlFromAPIData(
    data: youtube_v3.Schema$ThumbnailDetails,
): string | undefined {
    let url = data.default?.url;

    if (data.medium?.url) {
        url = data.medium?.url;
    }
    if (data.high?.url) {
        url = data.high?.url;
    }
    if (data.standard?.url) {
        url = data.standard?.url;
    }
    if (data.maxres?.url) {
        url = data.maxres?.url;
    }

    return url ?? undefined;
}
