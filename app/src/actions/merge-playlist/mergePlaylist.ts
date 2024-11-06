"use server";
import type {
	FullPlaylist,
	PlaylistItemData,
} from "@playlistmanager/base-adapter";
import { YoutubeAdapter } from "@playlistmanager/youtube-adapter";
import type { MergePlaylistResult } from "./typings";

export const mergePlaylist = async (
	playlistIds: string[],
	accessToken: string,
): Promise<MergePlaylistResult> => {
	const adapter = new YoutubeAdapter();

	// 入力されたId を元にターゲットのプレイリストを取得する
	const targetPlaylists: FullPlaylist[] = [];
	for (let i = 0; i < playlistIds.length; i++) {
		const id = playlistIds[i];
		const playlist = await adapter.getFullPlaylist(id, accessToken);
		if (playlist.isFailure())
			return {
				status: playlist.data.code,
			};

		targetPlaylists.push(playlist.data);
	}

	// 入力されたプレイリストのタイトルを新しいプレイリストのタイトルに変換し、新しいプレイリストを作成する
	// 新しいプレイリストのタイトルフォーマット: "playlist1 & playlist2 & playlist3 ... & playlistN"
	const title = targetPlaylists.map((p) => p.getTitle).join(" & ");
	const newPlaylistResult = await adapter.addPlaylist(
		title,
		"unlisted",
		accessToken,
	);
	if (newPlaylistResult.isFailure())
		return {
			status: newPlaylistResult.data.code,
		};
	const newPlaylist = newPlaylistResult.data;

	const addedItems: PlaylistItemData[] = [];
	for (const fullPlaylist of targetPlaylists) {
		for (const i of fullPlaylist.getItems) {
			const addItemResult = await adapter.addPlaylistItem(
				newPlaylist.getId,
				i.getVideoId,
				accessToken,
			);
			if (addItemResult.isFailure()) {
				if (addItemResult.data.code !== 409)
					return {
						status: addItemResult.data.code,
					};
			} else {
				addedItems.push({
					id: addItemResult.data.getId,
					title: addItemResult.data.getTitle,
					thumbnailUrl: addItemResult.data.getTitle,
					position: addItemResult.data.getPosition,
					author: addItemResult.data.getAuthor,
					videoId: addItemResult.data.getVideoId,
				});
			}
			await sleep(100);
		}
	}

	return { status: 200, data: addedItems };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
