"use server";

import { copyPlaylist } from "./copyPlaylist";
import type { AddPlaylistItemData, CopyPlaylistOptions } from "./typings";

/**
 * SSE (Server Sent Events) を使用して Progress Events を配信する
 * copyPlaylist の様なハンドラーを渡す形式をクライアントコンポーネントから呼ぼうとすると、クライアントで定義した関数（ハンドラー）をサーバー側で呼べないため、エラーになる。
 */
export const copyPlaylistWithSSE = (
	options: Pick<CopyPlaylistOptions, "id" | "token" | "privacy"> & {
		progressId: string;
	},
) => {
	const { id, token, progressId, privacy } = options;
};

export type CopyPlaylistEvents =
	| {
			type: "copiedPlaylist";
			data: { id: string; title: string };
	  }
	| {
			type: "addingPlaylistItem";
			data: AddPlaylistItemData;
	  }
	| { type: "addedPlaylistItem"; data: AddPlaylistItemData };
