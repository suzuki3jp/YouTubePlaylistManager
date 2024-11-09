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
				isSuccess: result.status === 200,
				title: playlist.title,
				status: result.status,
			});
		}
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
				isSuccess: result.status === 200,
				title: playlist.title,
				status: result.status,
			});
		}
	};

	// TODO: 結果の出力を整備する
	const onMergeButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		const result = await mergePlaylist(
			selectedItems.map((p) => p.id),
			data.accessToken,
		);
		resultSnackbar.merge({
			isSuccess: result.status === 200,
			title: selectedItems.map((p) => p.title),
			status: result.status,
		});
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
							isSuccess: result.status === 200,
							title: playlist.title,
							status: result.status,
						});
					}
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
}

const resultSnackbar = {
	copy: ({
		isSuccess = false,
		title,
		status,
	}: ResultSnackbarOptions<false>) => {
		if (isSuccess) {
			enqueueSnackbar(`${title} のコピーに成功しました。`, {
				variant: "success",
			});
		} else {
			enqueueSnackbar(
				`${title} のコピーに失敗しました。エラーコード: ${status}`,
			);
		}
	},

	shuffle: ({ isSuccess, title, status }: ResultSnackbarOptions<false>) => {
		if (isSuccess) {
			enqueueSnackbar(`${title} のシャッフルに成功しました。`, {
				variant: "success",
			});
		} else {
			enqueueSnackbar(
				`${title} のシャッフルに失敗しました。エラーコード: ${status}`,
			);
		}
	},

	merge: ({ isSuccess, title, status }: ResultSnackbarOptions<true>) => {
		if (isSuccess) {
			enqueueSnackbar(`${title.join(", ")} の結合に成功しました。`, {
				variant: "success",
			});
		} else {
			enqueueSnackbar(
				`${title.join(", ")} の結合に失敗しました。エラーコード: ${status}`,
			);
		}
	},

	delete: ({
		isSuccess = false,
		title,
		status,
	}: ResultSnackbarOptions<false>) => {
		if (isSuccess) {
			enqueueSnackbar(`${title} を削除しました。`, { variant: "success" });
		} else {
			enqueueSnackbar(`${title} の削除に失敗しました。エラーコード: ${status}`);
		}
	},
};

interface ResultSnackbarOptions<isMerge extends boolean> {
	isSuccess?: boolean;
	title: isMerge extends true ? string[] : string;
	status: number;
}
