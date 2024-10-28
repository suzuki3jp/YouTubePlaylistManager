import type { Result } from "@playlistmanager/result";
import type { BaseAdapterError } from "./BaseAdapterError";
import type { FullPlaylist, Playlist } from "./entities";

export abstract class BaseAdapter {
	abstract getPlaylists(
		userId: string,
		accessToken: string,
	): Promise<Result<Playlist[], BaseAdapterError>>;

	abstract getPlaylist(
		playlistId: string,
		accessToken: string,
	): Promise<Result<Playlist, BaseAdapterError>>;

	abstract getFullPlaylist(
		playlistId: string,
		accessToken: string,
	): Promise<Result<FullPlaylist, BaseAdapterError>>;

	abstract addPlaylist(
		title: string,
		status: "public" | "private" | "unlisted",
		accessToken: string,
	): Promise<Result<Playlist, BaseAdapterError>>;
}
