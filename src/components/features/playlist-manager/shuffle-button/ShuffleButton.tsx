"use client";
import { PlaylistManager, generateUUID } from "@/actions";
import {
	NonUpperButton,
	type PlaylistState,
	type UpdateTaskFunc,
} from "@/components";
import { useT } from "@/hooks";
import { Shuffle as ShuffleIcon } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import type React from "react";
import { showSnackbar } from "../PlaylistController";

/**
 * The shuffle button component in PlaylistController.
 * @param param0
 * @returns
 */
export const ShuffleButton: React.FC<ShuffleButtonProps> = ({
	playlists,
	updateTask,
	refreshPlaylists,
}) => {
	const { t } = useT();

	const { data } = useSession();
	if (!data?.accessToken) return <></>;
	const manager = new PlaylistManager(data.accessToken);

	const handleOnClick = async () => {
		const shuffleTasks = playlists
			.filter((ps) => ps.selected)
			.map(async (ps) => {
				const playlist = ps.data;
				const taskId = await generateUUID();
				updateTask({
					taskId,
					message: t("task-progress.shuffling-playlist", {
						title: playlist.title,
					}),
				});

				const result = await manager.shuffle({
					targetId: playlist.id,
					ratio: 0.4,
					onUpdatingPlaylistItemPosition: (i, oldI, newI) => {
						updateTask({
							taskId,
							message: t("task-progress.moving-playlist-item", {
								title: i.title,
								old: oldI,
								new: newI,
							}),
						});
					},
					onUpdatedPlaylistItemPosition: (i, oldI, newI, c, total) => {
						updateTask({
							taskId,
							message: t("task-progress.moved-playlist-item", {
								title: i.title,
								old: oldI,
								new: newI,
							}),
							completed: c,
							total,
						});
					},
				});

				updateTask({ taskId });
				const message = result.isSuccess()
					? t("task-progress.succeed-to-shuffle-playlist", {
							title: playlist.title,
						})
					: t("task-progress.failed-to-shuffle-playlist", {
							title: playlist.title,
							code: result.data.status,
						});
				showSnackbar(message, result.isSuccess());
			});

		await Promise.all(shuffleTasks);
		refreshPlaylists();
	};

	return (
		<NonUpperButton
			variant="contained"
			startIcon={<ShuffleIcon />}
			onClick={handleOnClick}
		>
			{t("button.shuffle")}
		</NonUpperButton>
	);
};

export type ShuffleButtonProps = Readonly<{
	playlists: PlaylistState[];
	updateTask: UpdateTaskFunc;
	refreshPlaylists: () => void;
}>;
