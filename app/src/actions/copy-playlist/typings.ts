import type {
	PlaylistItemData,
	PlaylistPrivacy,
} from "@playlistmanager/base-adapter";
import type { YoutubeAdapterErrorCodes } from "@playlistmanager/youtube-adapter";

export type CopyPlaylistResult =
	| CopyPlaylistSuccessResult
	| CopyPlaylistFailureResult;

export interface CopyPlaylistSuccessResult {
	status: 200;
	data: AddPlaylistItemData[];
}

export interface CopyPlaylistFailureResult {
	status: (typeof YoutubeAdapterErrorCodes)[keyof typeof YoutubeAdapterErrorCodes]["code"];
}

export interface CopyPlaylistOptions {
	id: string;
	token: string;
	privacy?: PlaylistPrivacy;
	onCopiedPlaylist?: OnCopiedPlaylistHandler;
	onAddingPlaylistItem?: OnAddingPlaylistItemHandler;
	onAddedPlaylistItem?: OnAddedPlaylistItemHandler;
}

/**
 * 新しいプレイリストが作成されたときに発火
 */
export type OnCopiedPlaylistHandler = (playlist: {
	id: string;
	title: string;
}) => void;

export type AddPlaylistItemData = Omit<PlaylistItemData, "id" | "position">;

/**
 * プレイリストのアイテムを追加し始める時に発火
 */
export type OnAddingPlaylistItemHandler = (
	playlistItem: AddPlaylistItemData,
) => void;

/**
 * プレイリストのアイテム追加に成功したときに発火
 */
export type OnAddedPlaylistItemHandler = (
	playlistItem: AddPlaylistItemData,
) => void;
