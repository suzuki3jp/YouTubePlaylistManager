"use client";
import {
	copyPlaylist,
	deletePlaylist,
	mergePlaylist,
	shufflePlaylist,
} from "@/actions";
import { NonUpperButton, type PlaylistData, WrappedDialog } from "@/components";
import {
	ContentCopy as CopyIcon,
	Delete as DeleteIcon,
	CallMerge as MergeIcon,
	Shuffle as ShuffleIcon,
} from "@mui/icons-material";
import { Grid2 as Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export const PlaylistController = ({
	selectedItems,
	refreshPlaylists,
}: Readonly<PlaylistControllerProps>) => {
	const { data } = useSession();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	// TODO: 結果の出力を整備する
	const onCopyButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		for (const playlist of selectedItems) {
			const result = await copyPlaylist({
				id: playlist.id,
				token: data.accessToken,
				privacy: "unlisted",
			});
			resultSnackbar.copy({
				title: playlist.title,
				status: result.status,
			});
		}
		refreshPlaylists();
	};

	// TODO: 結果の出力を整備する
	const onShuffleButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		for (const playlist of selectedItems) {
			const result = await shufflePlaylist({
				playlistId: playlist.id,
				accessToken: data.accessToken,
				ratio: 0.4,
			});
			resultSnackbar.shuffle({
				title: playlist.title,
				status: result.status,
			});
		}
		refreshPlaylists();
	};

	// TODO: 結果の出力を整備する
	const onMergeButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		const result = await mergePlaylist(
			selectedItems.map((p) => p.id),
			data.accessToken,
		);
		resultSnackbar.merge({
			title: selectedItems.map((p) => p.title),
			status: result.status,
		});
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
					if (!data?.accessToken) return alert("TOKEN が無効です");
					for (const playlist of selectedItems) {
						const result = await deletePlaylist(playlist.id, data.accessToken);
						resultSnackbar.delete({
							title: playlist.title,
							status: result.status,
						});
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
	selectedItems: PlaylistData[];
	refreshPlaylists: () => void;
}

const resultSnackbar = {
	copy: ({ title, status }: ResultSnackbarOptions<false>) => {
		status === 200
			? resultSnackbar.showSnackbar(`${title} のコピーに成功しました。`)
			: resultSnackbar.showSnackbar(
					`${title} のコピーに失敗しました。エラーコード: ${status}`,
					false,
				);
	},

	shuffle: ({ title, status }: ResultSnackbarOptions<false>) => {
		status === 200
			? resultSnackbar.showSnackbar(`${title} のシャッフルに成功しました。`)
			: resultSnackbar.showSnackbar(
					`${title} のシャッフルに失敗しました。エラーコード: ${status}`,
					false,
				);
	},

	merge: ({ title, status }: ResultSnackbarOptions<true>) => {
		status === 200
			? resultSnackbar.showSnackbar(
					`${title.join(", ")} の結合に成功しました。`,
				)
			: resultSnackbar.showSnackbar(
					`${title.join(", ")} の結合に失敗しました。エラーコード: ${status}`,
					false,
				);
	},

	delete: ({ title, status }: ResultSnackbarOptions<false>) => {
		status === 200
			? resultSnackbar.showSnackbar(`${title} を削除しました。`)
			: resultSnackbar.showSnackbar(
					`${title} の削除に失敗しました。エラーコード: ${status}`,
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
