"use client";
import {
	copyPlaylist,
	deletePlaylist,
	mergePlaylist,
	shufflePlaylist,
} from "@/actions";
import { NonUpperButton, type PlaylistData } from "@/components";
import {
	ContentCopy as CopyIcon,
	Delete as DeleteIcon,
	CallMerge as MergeIcon,
	Shuffle as ShuffleIcon,
} from "@mui/icons-material";
import { Grid2 as Grid } from "@mui/material";
import { useSession } from "next-auth/react";

export const PlaylistController = ({
	selectedItems,
}: PlaylistControllerProps) => {
	const { data } = useSession();
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

	// TODO: 結果の出力、確認画面を整備する
	const onDeleteButtonClick = async () => {
		if (!data?.accessToken) return alert("TOKEN が無効です");
		for (const playlist of selectedItems) {
			const result = await deletePlaylist(playlist.id, data.accessToken);
			if (result.status !== 200) alert(result.status);
		}
		alert(200);
	};

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
		</Grid>
	);
};

export interface PlaylistControllerProps {
	selectedItems: PlaylistData[];
}
