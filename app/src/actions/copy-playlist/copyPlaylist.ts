"use server";

import type { PlaylistItem } from "@playlistmanager/base-adapter";
import {
	YoutubeAdapter,
	type YoutubeAdapterError,
} from "@playlistmanager/youtube-adapter";
import type {
	AddPlaylistItemData,
	CopyPlaylistFailureResult,
	CopyPlaylistOptions,
	CopyPlaylistResult,
} from "./typings";

// TODO: SSE (Server Sent Events) を使用して Progress Events を配信する
// ハンドラーを渡す形式をクライアントコンポーネントから呼ぼうとすると、クライアントで定義した関数（ハンドラー）をサーバー側で呼べないため、エラーになる。
/**
 * NOTE: この関数のハンドラーは機能しない
 * @param options
 * @returns
 */
export const copyPlaylist = async (
	options: CopyPlaylistOptions,
): Promise<CopyPlaylistResult> => {
	const { id, token } = options;
	const adapter = new YoutubeAdapter();
	const oldPlaylistResult = await adapter.getFullPlaylist(id, token);

	if (oldPlaylistResult.isFailure()) return makeFailure(oldPlaylistResult.data);
	const oldPlaylist = oldPlaylistResult.data;

	const newTitle = `${oldPlaylist.getTitle} - Copied`;
	const addPlaylistResult = await adapter.addPlaylist(
		newTitle,
		options.privacy ?? "unlisted",
		token,
	);

	if (addPlaylistResult.isFailure()) return makeFailure(addPlaylistResult.data);
	options.onCopiedPlaylist?.({
		id: addPlaylistResult.data.getId,
		title: addPlaylistResult.data.getTitle,
	});

	const targetPlaylist = addPlaylistResult.data;

	const addedItems: PlaylistItem[] = [];
	for (const i of oldPlaylist.getItems) {
		options.onAddingPlaylistItem?.(toAddPlaylistItem(i));
		const addItemResult = await adapter.addPlaylistItem(
			targetPlaylist.getId,
			i.getVideoId,
			token,
		);
		if (addItemResult.isFailure()) return makeFailure(addItemResult.data);
		options.onAddedPlaylistItem?.(toAddPlaylistItem(i));
		addedItems.push(addItemResult.data);
	}

	return {
		status: 200,
		data: addedItems.map((i) => toAddPlaylistItem(i)),
	};
};

const toAddPlaylistItem = (item: PlaylistItem): AddPlaylistItemData => {
	return {
		title: item.getTitle,
		thumbnailUrl: item.getThumbnailUrl,
		author: item.getAuthor,
		videoId: item.getVideoId,
	};
};

const makeFailure = (err: YoutubeAdapterError): CopyPlaylistFailureResult => ({
	status: err.code,
});
