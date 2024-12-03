"use server";
import { type Result, fail, ok } from "@/actions/result";
import {
	type FullPlaylist,
	convertToFullPlaylistFromClass,
} from "@/actions/typings";
import { YoutubeAdapter } from "@ytpm/youtube-adapter";

/**
 * アイテムを含む完全なプレイリストを取得する
 * @param param0
 * @returns
 */
export const getFullPlaylist = async ({
	id,
	token,
}: GetFullPlaylistOptions): Promise<Result<FullPlaylist>> => {
	const adapter = new YoutubeAdapter();
	const fullPlaylist = await adapter.getFullPlaylist(id, token);
	if (fullPlaylist.isFailure()) return fail(fullPlaylist.data.code);

	const fullPlaylistData = convertToFullPlaylistFromClass(fullPlaylist.data);
	return ok(fullPlaylistData);
};

export interface GetFullPlaylistOptions {
	id: string;
	token: string;
}
