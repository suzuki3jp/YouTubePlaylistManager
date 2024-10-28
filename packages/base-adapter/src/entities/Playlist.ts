import type { PlaylistItem } from "./PlaylistItem";

export class Playlist {
	private id: string;
	private title: string;
	private thumbnailUrl: string;

	constructor(data: Omit<PlaylistData, "items">) {
		const { id, title, thumbnailUrl } = data;
		this.id = id;
		this.title = title;
		this.thumbnailUrl = thumbnailUrl;
	}

	get getId(): string {
		return this.id;
	}

	get getTitle(): string {
		return this.title;
	}

	get getThumbnailUrl(): string {
		return this.thumbnailUrl;
	}
}

export class FullPlaylist extends Playlist {
	private items: PlaylistItem[];
	constructor(data: PlaylistData) {
		super(data);
		this.items = data.items;
	}

	get getItems(): PlaylistItem[] {
		return this.items;
	}
}

export interface PlaylistData {
	id: string;
	title: string;
	thumbnailUrl: string;
	items: PlaylistItem[];
}

export type PlaylistPrivacy = "public" | "private" | "unlisted";
