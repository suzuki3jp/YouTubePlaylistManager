import type { PlaylistPrivacy } from "@playlistmanager/base-adapter";
import { Err, Ok, type Result } from "@playlistmanager/result";
import { addPlaylist } from "./add-playlist";
import { addPlaylistItem } from "./add-playlist-item";
import { deletePlaylist } from "./delete-playlist";
import { getFullPlaylist } from "./get-full-playlist";
import { getPlaylists } from "./get-playlists";
import type { Failure as FailureData } from "./result";
import type { FullPlaylist, Playlist, PlaylistItem } from "./typings";
import { updatePlaylistItemPosition } from "./update-playlist-item-position";

// TODO: 409 コンフリクトが起こったときはリクエストを再試行する
// TODO: failure の時操作のどのフェーズで失敗したかを含めることで、どこまでは操作が行われているかUIに表示する
export class PlaylistManager {
	constructor(private token: string) {}

	public async copy({
		id,
		privacy,
		onAddedPlaylist,
		onAddedPlaylistItem,
		onAddingPlaylistItem,
	}: CopyOptions): Promise<Result<FullPlaylist, FailureData>> {
		// コピー対象の完全なプレイリストを取得
		const target = await getFullPlaylist({ id, token: this.token });
		if (target.status !== 200) return Err(target);
		const oldPlaylist = target.data;

		// 新しいプレイリストを作成する
		const newTitle = `${oldPlaylist.title} - Copied`;
		const newTarget = await addPlaylist({
			title: newTitle,
			privacy,
			token: this.token,
		});
		if (newTarget.status !== 200) return Err(newTarget);
		const newPlaylist: FullPlaylist = { ...newTarget.data, items: [] };
		onAddedPlaylist?.(newPlaylist);

		// アイテムを追加する
		for (let index = 0; index < oldPlaylist.items.length; index++) {
			const item = oldPlaylist.items[index];
			onAddingPlaylistItem?.(item);
			const addedItem = await addPlaylistItem({
				playlistId: newPlaylist.id,
				resourceId: item.videoId,
				token: this.token,
			});
			if (addedItem.status !== 200) return Err(addedItem);

			newPlaylist.items.push(addedItem.data);
			onAddedPlaylistItem?.(addedItem.data, index, oldPlaylist.items.length);
		}

		return Ok(newPlaylist);
	}

	public async merge({
		ids,
		privacy,
		onAddedPlaylist,
		onAddedPlaylistItem,
		onAddingPlaylistItem,
	}: MergeOptions): Promise<Result<FullPlaylist, FailureData>> {
		// ターゲットの完全なプレイリストを取得する
		const oldPlaylists: FullPlaylist[] = [];
		for (const id of ids) {
			const playlist = await getFullPlaylist({ id, token: this.token });
			if (playlist.status !== 200) return Err(playlist);
			oldPlaylists.push(playlist.data);
		}

		// 入力されたプレイリストのタイトルを新しいプレイリストのタイトルに変換し、新しいプレイリストを作成する
		// 新しいプレイリストのタイトルフォーマット: "playlist1 & playlist2 & playlist3 ... & playlistN"
		const title = oldPlaylists.map((p) => p.title).join(" & ");
		const newPlaylistResult = await addPlaylist({
			title,
			privacy,
			token: this.token,
		});
		if (newPlaylistResult.status !== 200) return Err(newPlaylistResult);
		const newPlaylist: FullPlaylist = { ...newPlaylistResult.data, items: [] };
		onAddedPlaylist?.(newPlaylist);

		// 新しいプレイリストにアイテムを追加
		const queueItems: PlaylistItem[] = oldPlaylists.flatMap((p) => p.items);
		for (const item of queueItems) {
			onAddingPlaylistItem?.(item);
			const addedItem = await addPlaylistItem({
				playlistId: newPlaylist.id,
				resourceId: item.videoId,
				token: this.token,
			});
			if (addedItem.status !== 200) return Err(addedItem);
			newPlaylist.items.push(addedItem.data);
			onAddedPlaylistItem?.(
				addedItem.data,
				newPlaylist.items.length,
				queueItems.length,
			);
		}

		return Ok(newPlaylist);
	}

	public async shuffle({
		playlistId,
		ratio,
		onUpdatedPlaylistItemPosition,
		onUpdatingPlaylistItemPosition,
	}: ShuffleOptions): Promise<Result<Playlist, FailureData>> {
		if (!this.validateRatio(ratio)) throw new Error("Invalid ratio");

		// 対象の完全なプレイリストを取得
		const getFullPlaylistResult = await getFullPlaylist({
			id: playlistId,
			token: this.token,
		});
		if (getFullPlaylistResult.status !== 200) return Err(getFullPlaylistResult);
		const fullPlaylist = getFullPlaylistResult.data;

		// ratio から何個のプレイリストアイテムを移動するかを算出
		const itemsLength = fullPlaylist.items.length;
		const itemMoveCount = Math.floor(itemsLength * ratio);
		const itemsMaxIndex = itemsLength - 1;

		// アイテムのポジションを変更
		for (let i = 0; i < itemMoveCount; i++) {
			const targetItemIndex = this.getRandomInt(0, itemsMaxIndex);
			const targetItemNewIndex = this.getRandomInt(0, itemsMaxIndex);
			const targetItem = fullPlaylist.items[targetItemIndex];
			if (!targetItem) throw new Error("Internal Error 01");
			onUpdatingPlaylistItemPosition?.(
				targetItem,
				targetItemIndex,
				targetItemNewIndex,
			);

			const updatedItem = await updatePlaylistItemPosition({
				itemId: targetItem.id,
				playlistId: fullPlaylist.id,
				resourceId: targetItem.videoId,
				newIndex: targetItemNewIndex,
				token: this.token,
			});
			if (updatedItem.status !== 200) return Err(updatedItem);
			onUpdatedPlaylistItemPosition?.(
				updatedItem.data,
				targetItemIndex,
				targetItemNewIndex,
				i,
				itemMoveCount,
			);
		}

		return Ok(fullPlaylist);
	}

	public async delete(id: string): Promise<Result<Playlist, FailureData>> {
		const result = await deletePlaylist({ id, token: this.token });
		return result.status === 200 ? Ok(result.data) : Err(result);
	}

	public async getPlaylists(): Promise<Result<Playlist[], FailureData>> {
		const result = await getPlaylists({ token: this.token });
		return result.status === 200 ? Ok(result.data) : Err(result);
	}

	private validateRatio(ratio: number): boolean {
		return !!(0 <= ratio && 1 >= ratio);
	}

	/**
	 * min <= x <= max の整数を返す
	 * @param min
	 * @param max
	 */
	private getRandomInt(min: number, max: number) {
		const minInt = Math.ceil(min);
		const maxInt = Math.floor(max);

		return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
	}
}

export interface CopyOptions {
	id: string;
	privacy?: PlaylistPrivacy;
	onAddedPlaylist?: OnAddedPlaylistHandler;
	onAddingPlaylistItem?: OnAddingPlaylistItemHandler;
	onAddedPlaylistItem?: OnAddedPlaylistItemHandler;
}

export interface MergeOptions {
	ids: string[];
	privacy?: PlaylistPrivacy;
	onAddedPlaylist?: OnAddedPlaylistHandler;
	onAddingPlaylistItem?: OnAddingPlaylistItemHandler;
	onAddedPlaylistItem?: OnAddedPlaylistItemHandler;
}

export interface ShuffleOptions {
	playlistId: string;

	/**
	 * プレイリストのアイテム中どのくらいの数ポジションを入れ替えるかの割合
	 * 0 ~ 1
	 */
	ratio: number;
	onUpdatingPlaylistItemPosition?: OnUpdatingPlaylistItemPositionHandler;
	onUpdatedPlaylistItemPosition?: OnUpdatedPlaylistItemPositionHandler;
}

/**
 * 新しいプレイリストが作成されたときに発火
 */
export type OnAddedPlaylistHandler = (playlist: Playlist) => void;

/**
 * プレイリストのアイテムを追加し始める時に発火
 */
export type OnAddingPlaylistItemHandler = (playlistItem: PlaylistItem) => void;

/**
 * プレイリストのアイテム追加に成功したときに発火
 */
export type OnAddedPlaylistItemHandler = (
	playlistItem: PlaylistItem,
	currentIndex: number,
	totalLength: number,
) => void;

/**
 * プレイリストのアイテムのポジションを変更し始める時に発火
 */
export type OnUpdatingPlaylistItemPositionHandler = (
	playlistItem: PlaylistItem,
	oldIndex: number,
	newIndex: number,
) => void;

/**
 * プレイリストのアイテムのポジションの変更に成功に発火
 */
export type OnUpdatedPlaylistItemPositionHandler = (
	playlistItem: PlaylistItem,
	oldIndex: number,
	newIndex: number,
	completed: number,
	total: number,
) => void;
