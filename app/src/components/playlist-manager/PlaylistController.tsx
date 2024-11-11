"use client";
import {
	type FullPlaylist,
	type Playlist,
	PlaylistManager,
	type UUID,
	generateUUID,
} from "@/actions";
import type { Failure } from "@/actions/result";
import { NonUpperButton, WrappedDialog } from "@/components";
import {
	ContentCopy as CopyIcon,
	Delete as DeleteIcon,
	CallMerge as MergeIcon,
	Shuffle as ShuffleIcon,
} from "@mui/icons-material";
import { Grid2 as Grid } from "@mui/material";
import type { Result } from "@playlistmanager/result";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import type { SetTaskFunc } from "./PlaylistManager";

export const PlaylistController = ({
	selectedItems,
	setTask,
	refreshPlaylists,
}: Readonly<PlaylistControllerProps>) => {
	const { data } = useSession();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	if (!data?.accessToken) return <></>;
	const manager = new PlaylistManager(data.accessToken);

	const updateTask = ({
		taskId,
		message,
		completed,
		total,
	}: {
		taskId: UUID;
		message?: string;
		completed?: number;
		total?: number;
	}) => {
		if (message || completed || total) {
			setTask(taskId, (prev) => {
				if (prev) {
					return {
						message: message ?? prev.message,
						completed: completed ?? prev.completed,
						total: total ?? prev.total,
					};
				}

				return {
					message: message ?? "DEFAULT MESSAGE",
					completed: completed ?? 0,
					total: total ?? 0,
				};
			});
		} else {
			setTask(taskId, () => null);
		}
	};

	const onCopyButtonClick = async () => {
		for (const playlist of selectedItems) {
			const taskId = await generateUUID();
			updateTask({
				taskId,
				message: `${playlist.title} をコピーしています...`,
			});

			const result = await manager.copy({
				id: playlist.id,
				privacy: "unlisted",
				onAddedPlaylist: (p) => {
					updateTask({ taskId, message: `${p.title} を作成しました` });
				},
				onAddingPlaylistItem: (i) => {
					updateTask({
						taskId,
						message: `${i.title} をコピー中...`,
					});
				},
				onAddedPlaylistItem: (i, c, t) => {
					updateTask({
						taskId,
						message: `${i.title} をコピーしました`,
						completed: c,
						total: t,
					});
				},
			});
			updateTask({ taskId });
			resultSnackbar.copy(result, playlist.title);
		}
		refreshPlaylists();
	};

	// TODO: 結果の出力を整備する
	const onShuffleButtonClick = async () => {
		for (const playlist of selectedItems) {
			const taskId = await generateUUID();
			updateTask({ taskId, message: `${playlist.title} をシャッフル中...` });

			const result = await manager.shuffle({
				playlistId: playlist.id,
				ratio: 0.4,
				onUpdatingPlaylistItemPosition: (i, oldI, newI) => {
					updateTask({
						taskId,
						message: `${i.title} を ${oldI} から ${newI} に移動中...`,
					});
				},
				onUpdatedPlaylistItemPosition: (i, oldI, newI, c, t) => {
					updateTask({
						taskId,
						message: `${i.title} を ${oldI} から ${newI} に移動しました`,
						completed: c,
						total: t,
					});
				},
			});
			updateTask({ taskId });
			resultSnackbar.shuffle(result, playlist.title);
		}
		refreshPlaylists();
	};

	// TODO: 結果の出力を整備する
	const onMergeButtonClick = async () => {
		const taskId = await generateUUID();
		updateTask({
			taskId,
			message: "新しいプレイリストを作成中...",
		});

		const result = await manager.merge({
			ids: selectedItems.map((p) => p.id),
			onAddedPlaylist: (p) => {
				updateTask({ taskId, message: `${p.title} を作成しました` });
			},
			onAddingPlaylistItem: (i) => {
				updateTask({
					taskId,
					message: `${i.title} をコピー中...`,
				});
			},
			onAddedPlaylistItem: (i, c, t) => {
				updateTask({
					taskId,
					message: `${i.title} をコピーしました`,
					completed: c,
					total: t,
				});
			},
		});
		updateTask({ taskId });
		resultSnackbar.merge(
			result,
			selectedItems.map((p) => p.title),
		);
		refreshPlaylists();
	};

	// TODO: 結果の出力を整備する
	const onDeleteButtonClick = async () => setIsDeleteOpen(true);

	return selectedItems.length === 0 ? (
		<></>
	) : (
		<Grid container spacing={1}>
			<Grid>
				<NonUpperButton
					variant="contained"
					startIcon={<CopyIcon />}
					onClick={onCopyButtonClick}
				>
					Copy
				</NonUpperButton>
			</Grid>
			<Grid>
				<NonUpperButton
					variant="contained"
					startIcon={<ShuffleIcon />}
					onClick={onShuffleButtonClick}
				>
					Shuffle
				</NonUpperButton>
			</Grid>
			<Grid>
				<NonUpperButton
					variant="contained"
					startIcon={<MergeIcon />}
					onClick={onMergeButtonClick}
				>
					Merge
				</NonUpperButton>
			</Grid>
			<Grid>
				<NonUpperButton
					variant="contained"
					startIcon={<DeleteIcon />}
					onClick={onDeleteButtonClick}
				>
					Delete
				</NonUpperButton>
			</Grid>

			{/**
			 * DeleteDialog
			 */}
			<WrappedDialog
				open={isDeleteOpen}
				onClose={() => setIsDeleteOpen(false)}
				onConfirm={async () => {
					setIsDeleteOpen(false);
					for (const playlist of selectedItems) {
						const result = await manager.delete(playlist.id);
						resultSnackbar.delete(result, playlist.title);
					}
					refreshPlaylists();
				}}
				title="削除の確認"
				content={selectedItems.map((p) => p.title).join("\n")}
				isWarning
			/>
		</Grid>
	);
};

export interface PlaylistControllerProps {
	selectedItems: Playlist[];
	setTask: SetTaskFunc;
	refreshPlaylists: () => void;
}

const resultSnackbar = {
	copy: (result: Result<FullPlaylist, Failure>, title: string) => {
		result.isSuccess()
			? resultSnackbar.showSnackbar(`${title} のコピーに成功しました。`)
			: resultSnackbar.showSnackbar(
					`${title} のコピーに失敗しました。エラーコード: ${result.data.status}`,
					false,
				);
	},

	shuffle: (result: Result<Playlist, Failure>, title: string) => {
		result.isSuccess()
			? resultSnackbar.showSnackbar(`${title} のシャッフルに成功しました。`)
			: resultSnackbar.showSnackbar(
					`${title} のシャッフルに失敗しました。エラーコード: ${result.data.status}`,
					false,
				);
	},

	merge: (result: Result<FullPlaylist, Failure>, titles: string[]) => {
		result.isSuccess()
			? resultSnackbar.showSnackbar(
					`${titles.join(", ")} の結合に成功しました。`,
				)
			: resultSnackbar.showSnackbar(
					`${titles.join(", ")} の結合に失敗しました。エラーコード: ${result.data.status}`,
					false,
				);
	},

	delete: (result: Result<Playlist, Failure>, title: string) => {
		result.isSuccess()
			? resultSnackbar.showSnackbar(`${title} を削除しました。`)
			: resultSnackbar.showSnackbar(
					`${title} の削除に失敗しました。エラーコード: ${result.data.status}`,
					false,
				);
	},

	showSnackbar: (message: string, isSuccess = true) => {
		enqueueSnackbar(message, { variant: isSuccess ? "success" : "error" });
	},
};

interface ResultSnackbarOptions<isMerge extends boolean> {
	title: isMerge extends true ? string[] : string;
	status: number;
}
