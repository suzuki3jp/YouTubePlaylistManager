import type { PlaylistItemData } from "@playlistmanager/base-adapter";
import type { YoutubeAdapterErrorCodes } from "@playlistmanager/youtube-adapter";

export type MergePlaylistResult =
	| MergePlaylistSuccessResult
	| MergePlaylistFailureResult;

export interface MergePlaylistSuccessResult {
	status: 200;
	data: PlaylistItemData[];
}

export interface MergePlaylistFailureResult {
	status: (typeof YoutubeAdapterErrorCodes)[keyof typeof YoutubeAdapterErrorCodes]["code"];
}
