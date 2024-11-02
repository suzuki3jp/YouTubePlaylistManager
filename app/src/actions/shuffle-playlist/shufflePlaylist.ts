"use server";
import { getRandomInt } from "@/utils";
import { YoutubeAdapter } from "@playlistmanager/youtube-adapter";
import type { ShufflePlaylistOptions, ShufflePlaylistResult } from "./typings";

export const shufflePlaylist = async (
	options: ShufflePlaylistOptions,
): Promise<ShufflePlaylistResult> => {
	const { playlistId, ratio, accessToken } = options;
	if (!validateRatio(ratio)) throw new Error("Invalid ratio");
	const adapter = new YoutubeAdapter();
	const fullPlaylist = await adapter.getFullPlaylist(playlistId, accessToken);
	if (fullPlaylist.isFailure())
		return {
			status: fullPlaylist.data.code,
		};

	const items = fullPlaylist.data.getItems;
	const itemsLength = items.length;
	const itemMoveCount = Math.floor(itemsLength * ratio);

	const itemsMaxIndex = itemsLength - 1;

	for (let i = 0; i < itemMoveCount; i++) {
		const targetItemIndex = getRandomInt(0, itemsMaxIndex);
		const targetItemNewIndex = getRandomInt(0, itemsMaxIndex);
		const targetItem = items[targetItemIndex];

		const newItem = await adapter.updatePlaylistItemPosition(
			targetItem.getId,
			fullPlaylist.data.getId,
			targetItem.getVideoId,
			targetItemNewIndex,
			accessToken,
		);
		if (newItem.isFailure()) return { status: newItem.data.code };
	}

	return {
		status: 200,
		data: {
			id: fullPlaylist.data.getId,
			title: fullPlaylist.data.getTitle,
			thumbnailUrl: fullPlaylist.data.getThumbnailUrl,
		},
	};
};

const validateRatio = (ratio: number): boolean => {
	return !!(0 <= ratio && 1 >= ratio);
};
