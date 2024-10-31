"use server";
import { YoutubeAdapter } from "@playlistmanager/youtube-adapter";
import type { DeletePlaylistResult } from "./typings";

export const deletePlaylist = async (
	playlistId: string,
	accessToken: string,
): Promise<DeletePlaylistResult> => {
	const adapter = new YoutubeAdapter();
	const result = await adapter.deletePlaylist(playlistId, accessToken);
	if (result.isFailure()) return { status: result.data.code };
	return {
		status: 200,
		data: {
			id: result.data.getId,
			title: result.data.getTitle,
			thumbnailUrl: result.data.getThumbnailUrl,
		},
	};
};
