import {
	BaseAdapter,
	type FullPlaylist,
	Playlist,
} from "@playlistmanager/base-adapter";
import { Failure, type Result, Success } from "@playlistmanager/result";
import type { GaxiosError } from "gaxios";
import type { youtube_v3 } from "googleapis";
import {
	YoutubeAdapterErrorCodes as ErrorCodes,
	YoutubeAdapterError,
} from "./YoutubeAdapterError";
import { YoutubeApiClient } from "./YoutubeApiClient";

export class YoutubeAdapter extends BaseAdapter {
	private client: YoutubeApiClient;

	constructor() {
		super();
		this.client = new YoutubeApiClient();
	}

	async getPlaylists(
		accessToken: string,
	): Promise<Result<Playlist[], YoutubeAdapterError>> {
		try {
			let playlists: Playlist[] = [];
			let nextPageToken: string | null | undefined = "";

			do {
				const res = await this.client.getPlaylists(accessToken, nextPageToken);
				const items = this.convertToPlaylist(res);
				playlists = playlists.concat(items);
				nextPageToken = res.nextPageToken;
			} while (nextPageToken);

			return new Success(playlists);
		} catch (error) {
			return new Failure(this.handleError(error));
		}
	}

	getFullPlaylist(
		playlistId: string,
		accessToken: string,
	): Promise<Result<FullPlaylist, YoutubeAdapterError>> {
		throw new Error("Method not implemented.");
	}

	async getPlaylist(
		playlistId: string,
		accessToken: string,
	): Promise<Result<Playlist, YoutubeAdapterError>> {
		try {
			const res = await this.client.getPlaylistByPlaylistId(
				playlistId,
				accessToken,
			);

			const items = this.convertToPlaylist(res);

			return new Success(items[0]);
		} catch (error) {
			return new Failure(this.handleError(error));
		}
	}

	private convertToPlaylist(
		res: youtube_v3.Schema$PlaylistListResponse,
	): Playlist[] {
		const convertedItems: Playlist[] = [];

		if (!res.items) throw this.makeError("UNKNOWN_ERROR");

		const items = res.items;
		for (const i of items) {
			if (
				!i.id ||
				!i.snippet ||
				!i.snippet.title ||
				!i.snippet.thumbnails ||
				!i.snippet.thumbnails.default ||
				!i.snippet.thumbnails.default.url
			)
				throw this.makeError("UNKNOWN_ERROR");

			let thumbnailUrl = i.snippet.thumbnails.default.url;

			if (i.snippet.thumbnails.medium?.url) {
				thumbnailUrl = i.snippet.thumbnails.medium?.url;
			}
			if (i.snippet.thumbnails.high?.url) {
				thumbnailUrl = i.snippet.thumbnails.high?.url;
			}
			if (i.snippet.thumbnails.standard?.url) {
				thumbnailUrl = i.snippet.thumbnails.standard?.url;
			}
			if (i.snippet.thumbnails.maxres?.url) {
				thumbnailUrl = i.snippet.thumbnails.maxres?.url;
			}

			const obj = new Playlist({
				id: i.id,
				title: i.snippet.title,
				thumbnailUrl,
			});
			convertedItems.push(obj);
		}
		return convertedItems;
	}

	private handleError(err: unknown): YoutubeAdapterError {
		if (err instanceof YoutubeAdapterError) return err;

		if ((err as GaxiosError).response) {
			const e = err as GaxiosError;
			const names = Object.keys(ErrorCodes) as (keyof typeof ErrorCodes)[];

			for (const name of names) {
				if (e.status === ErrorCodes[name].code) {
					return this.makeError(name);
				}
			}
		}

		return this.makeError("UNKNOWN_ERROR");
	}

	private makeError(name: keyof typeof ErrorCodes) {
		return new YoutubeAdapterError(
			ErrorCodes[name].message,
			ErrorCodes[name].code,
			name,
		);
	}
}
