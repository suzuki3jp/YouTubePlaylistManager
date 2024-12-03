"use server";
import { type Result, fail, ok } from "@/actions/result";
import { type Playlist, convertToPlaylistFromClass } from "@/actions/typings";
import type { PlaylistPrivacy } from "@ytpm/base-adapter";
import { YoutubeAdapter } from "@ytpm/youtube-adapter";

/**
 * 新しいプレイリストを追加
 * @param param0
 * @returns
 */
export const addPlaylist = async ({
	title,
	privacy = "unlisted",
	token,
}: AddPlaylistOptions): Promise<Result<Playlist>> => {
	const adapter = new YoutubeAdapter();
	const playlist = await adapter.addPlaylist(title, privacy, token);
	if (playlist.isFailure()) return fail(playlist.data.code);

	const playlistData = convertToPlaylistFromClass(playlist.data);
	return ok(playlistData);
};

export interface AddPlaylistOptions {
	title: string;
	privacy?: PlaylistPrivacy;
	token: string;
}
