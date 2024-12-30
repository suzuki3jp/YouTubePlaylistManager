import { describe, expect, test } from "vitest";

import { Playlist, PlaylistItem } from "@/lib/base-adapter";
import type { youtube_v3 } from "googleapis";
import {
    convertToPlaylist,
    convertToPlaylistItem,
    getThumbnailUrlFromAPIData,
} from "./EntityConverter";

// The test does not verify the logic for selecting the thumbnail URL from the API response.
// The logic is tested in the `getThumbnailUrlFromAPIData` function test.
describe("convertToPlaylist", () => {
    test("should convert the given API response to a Playlist instance", () => {
        const data: [youtube_v3.Schema$Playlist, Playlist][] = [
            [
                {
                    id: "foo-id",
                    snippet: {
                        title: "foo-title",
                        thumbnails: { default: { url: "foo-default-url" } },
                    },
                },
                new Playlist({
                    id: "foo-id",
                    title: "foo-title",
                    thumbnailUrl: "foo-default-url",
                }),
            ],
            [
                {
                    id: "foo-id",
                    snippet: {
                        title: "foo-title",
                        thumbnails: {
                            default: { url: "foo-default-url" },
                            high: {
                                url: "foo-high-url",
                            },
                        },
                    },
                },
                new Playlist({
                    id: "foo-id",
                    title: "foo-title",
                    thumbnailUrl: "foo-high-url",
                }),
            ],
            [
                {
                    id: "foo-id",
                    snippet: {
                        title: "foo-title",
                        thumbnails: {
                            maxres: { url: "foo-maxres-url" },
                        },
                    },
                },
                new Playlist({
                    id: "foo-id",
                    title: "foo-title",
                    thumbnailUrl: "foo-maxres-url",
                }),
            ],
        ];

        for (const [apiData, expected] of data) {
            expect(convertToPlaylist(apiData)).toStrictEqual(expected);
        }
    });
});

describe("convertToPlaylistItem", () => {
    test("should convert the given API response to a PlaylistItem instance", () => {
        const data: [youtube_v3.Schema$PlaylistItem, PlaylistItem][] = [
            [
                {
                    id: "foo-id",
                    snippet: {
                        title: "foo-title",
                        position: 1,
                        videoOwnerChannelTitle: "foo-channel-title",
                        resourceId: { videoId: "foo-video-id" },
                        thumbnails: { default: { url: "foo-default-url" } },
                    },
                },
                new PlaylistItem({
                    id: "foo-id",
                    title: "foo-title",
                    thumbnailUrl: "foo-default-url",
                    position: 1,
                    videoId: "foo-video-id",
                    author: "foo-channel-title",
                }),
            ],
            [
                {
                    id: "foo-id",
                    snippet: {
                        title: "foo-title",
                        position: 1,
                        videoOwnerChannelTitle: "foo-channel-title",
                        resourceId: { videoId: "foo-video-id" },
                        thumbnails: {
                            default: { url: "foo-default-url" },
                            high: { url: "foo-high-url" },
                        },
                    },
                },
                new PlaylistItem({
                    id: "foo-id",
                    title: "foo-title",
                    thumbnailUrl: "foo-high-url",
                    position: 1,
                    videoId: "foo-video-id",
                    author: "foo-channel-title",
                }),
            ],
            [
                {
                    id: "foo-id",
                    snippet: {
                        title: "foo-title",
                        position: 1,
                        videoOwnerChannelTitle: "foo-channel-title",
                        resourceId: { videoId: "foo-video-id" },
                        thumbnails: {
                            maxres: { url: "foo-maxres-url" },
                        },
                    },
                },
                new PlaylistItem({
                    id: "foo-id",
                    title: "foo-title",
                    thumbnailUrl: "foo-maxres-url",
                    position: 1,
                    videoId: "foo-video-id",
                    author: "foo-channel-title",
                }),
            ],
            [
                {
                    id: "foo-id",
                    snippet: {
                        title: "foo-title",
                        position: 1,
                        videoOwnerChannelTitle: "foo-channel-title - Topic",
                        resourceId: { videoId: "foo-video-id" },
                        thumbnails: {
                            default: { url: "foo-default-url" },
                        },
                    },
                },
                new PlaylistItem({
                    id: "foo-id",
                    title: "foo-title",
                    thumbnailUrl: "foo-default-url",
                    position: 1,
                    videoId: "foo-video-id",
                    author: "foo-channel-title",
                }),
            ],
        ];

        for (const [apiData, expected] of data) {
            expect(convertToPlaylistItem(apiData)).toStrictEqual(expected);
        }
    });
});

describe("getThumbnailUrlFromAPIData", () => {
    test("should return the URL of the highest resolution thumbnail", () => {
        const data: [youtube_v3.Schema$ThumbnailDetails, string | undefined][] =
            [
                [{}, undefined],
                [{ default: { url: "foo-default-url" } }, "foo-default-url"],
                [
                    {
                        default: { url: "foo-default-url" },
                        medium: { url: "foo-medium-url" },
                    },
                    "foo-medium-url",
                ],
                [
                    {
                        default: { url: "foo-default-url" },
                        high: { url: "foo-high-url" },
                    },
                    "foo-high-url",
                ],
                [
                    {
                        default: { url: "foo-default-url" },
                        standard: { url: "foo-standard-url" },
                    },
                    "foo-standard-url",
                ],
                [
                    {
                        default: { url: "foo-default-url" },
                        maxres: { url: "foo-maxres-url" },
                    },
                    "foo-maxres-url",
                ],
            ];

        for (const [apiData, expected] of data) {
            expect(getThumbnailUrlFromAPIData(apiData)).toBe(expected);
        }
    });
});
