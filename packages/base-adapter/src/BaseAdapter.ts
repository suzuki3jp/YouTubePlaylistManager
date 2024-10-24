import type { FullPlaylist, Playlist } from "./entities";

export abstract class BaseAdapter {
	abstract getPlaylists(userId: string): Playlist[];

	abstract getPlaylist(playlistId: string): Playlist;

	abstract getFullPlaylist(playlistId: string): FullPlaylist;
}
