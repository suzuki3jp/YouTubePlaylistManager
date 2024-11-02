import type { PlaylistData } from "@/components";
import type { YoutubeAdapterErrorCodes } from "@playlistmanager/youtube-adapter";

export type ShufflePlaylistResult =
	| ShufflePlaylistSuccessResult
	| ShufflePlaylistFailureResult;

export interface ShufflePlaylistSuccessResult {
	status: 200;
	data: PlaylistData;
}

export interface ShufflePlaylistFailureResult {
	status: (typeof YoutubeAdapterErrorCodes)[keyof typeof YoutubeAdapterErrorCodes]["code"];
}

export interface ShufflePlaylistOptions {
	playlistId: string;

	/**
	 * プレイリストのアイテム中どのくらいの数ポジションを入れ替えるかの割合
	 * 0 ~ 1
	 */
	ratio: number;

	accessToken: string;
}
