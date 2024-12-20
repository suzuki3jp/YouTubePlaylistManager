"use client";
import { type Playlist, PlaylistManager, generateUUID } from "@/actions";
import { NonUpperButton, type UpdateTaskFunc } from "@/components";
import { useT } from "@/hooks";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import type React from "react";
import { showSnackbar } from "../PlaylistController";

/**
 * The copy button component in PlaylistController.
 * @param param0
 * @returns
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
	selectedItems,
	updateTask,
	refreshPlaylists,
}) => {
	const { t } = useT();

	const { data } = useSession();
	if (!data?.accessToken) return <></>;
	const manager = new PlaylistManager(data.accessToken);

	const handleOnClick = async () => {
		const copyTasks = selectedItems.map(async (playlist) => {
			const taskId = await generateUUID();
			updateTask({
				taskId,
				message: t("task-progress.copying-playlist", { title: playlist.title }),
			});

			const result = await manager.copy({
				sourceId: playlist.id,
				privacy: "unlisted",
				onAddedPlaylist: (p) => {
					updateTask({
						taskId,
						message: t("task-progress.created-playlist", {
							title: p.title,
						}),
					});
				},
				onAddingPlaylistItem: (i) => {
					updateTask({
						taskId,
						message: t("task-progress.copying-playlist-item", {
							title: i.title,
						}),
					});
				},
				onAddedPlaylistItem: (i, c, total) => {
					updateTask({
						taskId,
						message: t("task-progress.copied-playlist-item", {
							title: i.title,
						}),
						completed: c,
						total,
					});
				},
			});

			updateTask({ taskId });
			const message = result.isSuccess()
				? t("task-progress.succeed-to-copy-playlist", { title: playlist.title })
				: t("task-progress.failed-to-copy-playlist", {
						title: playlist.title,
						code: result.data.status,
					});
			showSnackbar(message, result.isSuccess());
		});

		await Promise.all(copyTasks);
		refreshPlaylists();
	};

	return (
		<NonUpperButton
			variant="contained"
			startIcon={<CopyIcon />}
			onClick={handleOnClick}
		>
			{t("button.copy")}
		</NonUpperButton>
	);
};

export type CopyButtonProps = Readonly<{
	selectedItems: Playlist[];
	updateTask: UpdateTaskFunc;
	refreshPlaylists: () => void;
}>;
