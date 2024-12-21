"use client";
import { PlaylistManager, generateUUID } from "@/actions";
import {
	NonUpperButton,
	type PlaylistState,
	type UpdateTaskFunc,
} from "@/components";
import { useT } from "@/hooks";
import { CallMerge as MergeIcon } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import type React from "react";
import { showSnackbar } from "../PlaylistController";

/**
 * The merge button component in PlaylistController.
 * @param param0
 * @returns
 */
export const MergeButton: React.FC<MergeButtonProps> = ({
	playlists,
	updateTask,
	refreshPlaylists,
}) => {
	const { t } = useT();

	const { data } = useSession();
	if (!data?.accessToken) return <></>;
	const manager = new PlaylistManager(data.accessToken);

	const handleOnClick = async () => {
		const taskId = await generateUUID();
		updateTask({
			taskId,
			message: t("task-progress.creating-new-playlist"),
		});

		const result = await manager.merge({
			sourceIds: playlists.filter((ps) => ps.selected).map((ps) => ps.data.id),
			onAddedPlaylist: (p) => {
				updateTask({
					taskId,
					message: t("task-progress.created-playlist", { title: p.title }),
				});
			},
			onAddingPlaylistItem: (i) => {
				updateTask({
					taskId,
					message: t("task-progress.copying-playlist-item", { title: i.title }),
				});
			},
			onAddedPlaylistItem: (i, c, total) => {
				updateTask({
					taskId,
					message: t("task-progress.copied-playlist-item", { title: i.title }),
					completed: c,
					total,
				});
			},
		});

		updateTask({ taskId });
		const message = result.isSuccess()
			? t("task-progress.succeed-to-merge-playlist", {
					title: playlists
						.filter((ps) => ps.selected)
						.map((ps) => ps.data.title)
						.join(", "),
				})
			: t("task-progress.failed-to-merge-playlist", {
					title: playlists
						.filter((ps) => ps.selected)
						.map((ps) => ps.data.title)
						.join(", "),
					code: result.data.status,
				});
		showSnackbar(message, result.isSuccess());
		refreshPlaylists();
	};

	return (
		<NonUpperButton
			variant="contained"
			startIcon={<MergeIcon />}
			onClick={handleOnClick}
		>
			{t("button.merge")}
		</NonUpperButton>
	);
};

export type MergeButtonProps = Readonly<{
	playlists: PlaylistState[];
	updateTask: UpdateTaskFunc;
	refreshPlaylists: () => void;
}>;
