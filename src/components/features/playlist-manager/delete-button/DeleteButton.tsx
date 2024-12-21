"use client";
import { PlaylistManager } from "@/actions";
import {
	NonUpperButton,
	type PlaylistState,
	WarningDialog,
} from "@/components";
import { useT } from "@/hooks";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import type React from "react";
import { useState } from "react";
import { showSnackbar } from "../PlaylistController";

/**
 * The delete button component in PlaylistController.
 * @param param0
 * @returns
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
	playlists,
	refreshPlaylists,
}) => {
	const { t } = useT();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const { data } = useSession();
	if (!data?.accessToken) return <></>;
	const manager = new PlaylistManager(data.accessToken);

	const handleOnClickOpenDialog = () => setIsDeleteOpen(true);

	const handleOnClickConfirm = async () => {
		setIsDeleteOpen(false);
		const deleteTasks = playlists
			.filter((ps) => ps.selected)
			.map(async (ps) => {
				const playlist = ps.data;
				const result = await manager.delete(playlist.id);
				const message = result.isSuccess()
					? t("task-progress.succeed-to-delete-playlist", {
							title: playlist.title,
						})
					: t("task-progress.failed-to-delete-playlist", {
							title: playlist.title,
							code: result.data.status,
						});
				showSnackbar(message);
			});

		await Promise.all(deleteTasks);
		refreshPlaylists();
	};

	return (
		<>
			<NonUpperButton
				variant="contained"
				startIcon={<DeleteIcon />}
				onClick={handleOnClickOpenDialog}
			>
				{t("button.delete")}
			</NonUpperButton>
			<WarningDialog
				open={isDeleteOpen}
				onClose={() => setIsDeleteOpen(false)}
				onConfirm={handleOnClickConfirm}
				title={t("dialog.delete-title")}
				content={playlists
					.filter((ps) => ps.selected)
					.map((ps) => ps.data.title)
					.join("\n")}
			/>
		</>
	);
};

export type DeleteButtonProps = Readonly<{
	playlists: PlaylistState[];
	refreshPlaylists: () => void;
}>;
