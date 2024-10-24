import type { FullPlaylist, Playlist } from "./entities";

export abstract class BaseAdapter {
	abstract getPlaylists(userId: string, accessToken: string): Playlist[];

	abstract getPlaylist(playlistId: string, accessToken: string): Playlist;

	abstract getFullPlaylist(
		playlistId: string,
		accessToken: string,
	): FullPlaylist;
}
