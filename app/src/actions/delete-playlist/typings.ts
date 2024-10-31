import type { PlaylistData } from "@/components";
import type { YoutubeAdapterErrorCodes } from "@playlistmanager/youtube-adapter";

export type DeletePlaylistResult =
	| DeletePlaylistSuccessResult
	| DeletePlaylistFailureResult;

export interface DeletePlaylistSuccessResult {
	status: 200;
	data: PlaylistData;
}

export interface DeletePlaylistFailureResult {
	status: (typeof YoutubeAdapterErrorCodes)[keyof typeof YoutubeAdapterErrorCodes]["code"];
}
