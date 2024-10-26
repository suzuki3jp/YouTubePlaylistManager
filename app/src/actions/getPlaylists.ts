"use server";
import type { PlaylistData } from "@/components";
import {
	YoutubeAdapter,
	type YoutubeAdapterErrorCodes,
} from "@playlistmanager/youtube-adapter";

export const getPlaylists = async (
	token: string,
): Promise<PlaylistResponse> => {
	const playlists = await new YoutubeAdapter().getPlaylists(token);
	if (playlists.isFailure()) return { status: playlists.data.code };

	const playlistData: PlaylistData[] = playlists.data.map((p) => ({
		id: p.getId,
		thumbnailUrl: p.getThumbnailUrl,
		title: p.getTitle,
	}));

	return {
		status: 200,
		data: playlistData,
	};
};

export type PlaylistResponse =
	| PlaylistSuccessResponse
	| PlaylistFailureResponse;

export interface PlaylistSuccessResponse {
	status: 200;
	data: PlaylistData[];
}

export interface PlaylistFailureResponse {
	status: (typeof YoutubeAdapterErrorCodes)[keyof typeof YoutubeAdapterErrorCodes]["code"];
}
