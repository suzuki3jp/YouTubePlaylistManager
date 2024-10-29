import {
	BaseAdapter,
	FullPlaylist,
	Playlist,
	PlaylistItem,
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
				if (!res.items) throw this.makeError("UNKNOWN_ERROR");
				const items = this.convertToPlaylist(res.items);
				playlists = playlists.concat(items);
				nextPageToken = res.nextPageToken;
			} while (nextPageToken);

			return new Success(playlists);
		} catch (error) {
			return new Failure(this.handleError(error));
		}
	}

	async getFullPlaylist(
		playlistId: string,
		accessToken: string,
	): Promise<Result<FullPlaylist, YoutubeAdapterError>> {
		const items: PlaylistItem[] = [];
		let nextPageToken: string | undefined = undefined;

		try {
			const result = await this.getPlaylist(playlistId, accessToken);
			if (result.isFailure()) throw result.data;
			const playlist = result.data;

			do {
				const res = await this.client.getPlaylistItemsByPlaylistId(
					playlistId,
					accessToken,
					nextPageToken,
				);

				if (!res.items) throw this.makeError("UNKNOWN_ERROR");

				const gotItems = this.convertToPlaylistItem(res.items);
				items.push(...gotItems);

				nextPageToken = res.nextPageToken ?? undefined;
			} while (nextPageToken);

			const obj = new FullPlaylist({
				id: playlist.getId,
				title: playlist.getTitle,
				thumbnailUrl: playlist.getThumbnailUrl,
				items,
			});
			return new Success(obj);
		} catch (error) {
			return new Failure(this.handleError(error));
		}
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

			if (!res.items) throw this.makeError("UNKNOWN_ERROR");
			const items = this.convertToPlaylist(res.items);

			return new Success(items[0]);
		} catch (error) {
			return new Failure(this.handleError(error));
		}
	}

	async addPlaylist(
		title: string,
		status: "public" | "private" | "unlisted",
		accessToken: string,
	): Promise<Result<Playlist, YoutubeAdapterError>> {
		try {
			const res = await this.client.addPlaylist(title, status, accessToken);
			const playlist = this.convertToPlaylist([res])[0];
			return new Success(playlist);
		} catch (error) {
			return new Failure(this.handleError(error));
		}
	}

	async addPlaylistItem(
		playlistId: string,
		resourceId: string,
		accessToken: string,
	): Promise<Result<PlaylistItem, YoutubeAdapterError>> {
		try {
			const res = await this.client.addPlaylistItem(
				playlistId,
				resourceId,
				accessToken,
			);
			const item = this.convertToPlaylistItem([res]);
			return new Success(item[0]);
		} catch (error) {
			return new Failure(this.handleError(error));
		}
	}

	private convertToPlaylist(res: youtube_v3.Schema$Playlist[]): Playlist[] {
		const convertedItems: Playlist[] = [];

		for (const i of res) {
			if (!i.id || !i.snippet || !i.snippet.title || !i.snippet.thumbnails)
				throw this.makeError("UNKNOWN_ERROR");

			const thumbnailUrl = this.getThumbnailUrlFromAPIData(
				i.snippet.thumbnails,
			);
			if (!thumbnailUrl) throw this.makeError("UNKNOWN_ERROR");

			const obj = new Playlist({
				id: i.id,
				title: i.snippet.title,
				thumbnailUrl,
			});
			convertedItems.push(obj);
		}
		return convertedItems;
	}

	private convertToPlaylistItem(
		items: youtube_v3.Schema$PlaylistItem[],
	): PlaylistItem[] {
		const convertedItems: PlaylistItem[] = [];

		for (const i of items) {
			if (
				!i.id ||
				!i.snippet ||
				!i.snippet.title ||
				typeof i.snippet.position !== "number" ||
				!i.snippet.videoOwnerChannelTitle ||
				!i.snippet.thumbnails
			)
				throw this.makeError("UNKNOWN_ERROR");

			const thumbnailUrl = this.getThumbnailUrlFromAPIData(
				i.snippet.thumbnails,
			);
			if (!thumbnailUrl) throw this.makeError("UNKNOWN_ERROR");

			const obj = new PlaylistItem({
				id: i.id,
				title: i.snippet.title,
				thumbnailUrl,
				position: i.snippet.position,
				// Youtube Music の曲などのアイテムでは "OwnerName - Topic" という形式で返されるため " - Topic" をトリミングする
				author: i.snippet.videoOwnerChannelTitle
					.replace(/\s*-\s*Topic$/, "")
					.trim(),
			});
			convertedItems.push(obj);
		}
		return convertedItems;
	}

	private getThumbnailUrlFromAPIData(
		data: youtube_v3.Schema$ThumbnailDetails,
	): string | undefined {
		let url = data.default?.url;

		if (data.medium?.url) {
			url = data.medium?.url;
		}
		if (data.high?.url) {
			url = data.high?.url;
		}
		if (data.standard?.url) {
			url = data.standard?.url;
		}
		if (data.maxres?.url) {
			url = data.maxres?.url;
		}

		return url ?? undefined;
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
