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
import { useState } from "react";

export const PlaylistController = ({
	selectedItems,
}: Readonly<PlaylistControllerProps>) => {
	const { data } = useSession();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	// TODO: 結果の出力、確認画面を整備する
	const onCopyButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		for (const playlist of selectedItems) {
			const result = await copyPlaylist({
				id: playlist.id,
				token: data.accessToken,
				privacy: "unlisted",
			});
			if (result.status !== 200) alert(result.status);
		}

		alert(200);
	};

	// TODO: 結果の出力、確認画面を整備する
	const onShuffleButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		for (const playlist of selectedItems) {
			const result = await shufflePlaylist({
				playlistId: playlist.id,
				accessToken: data.accessToken,
				ratio: 0.4,
			});
			if (result.status !== 200) alert(result.status);
		}
		alert(200);
	};

	// TODO: 結果の出力、確認画面を整備する
	const onMergeButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		const result = await mergePlaylist(
			selectedItems.map((p) => p.id),
			data.accessToken,
		);
		alert(result.status);
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
						if (result.status !== 200) alert(result.status);
					}
					alert(200);
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
