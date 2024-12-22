"use client";
import { PlaylistManager, generateUUID } from "@/actions";
import {
	Dialog,
	NonUpperButton,
	type PlaylistState,
	SelectMenu,
	type SelectMenuItem,
	Switch,
	type UpdateTaskFunc,
} from "@/components";
import { DEFAULT } from "@/constants";
import { useT } from "@/hooks";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import type React from "react";
import { useState } from "react";
import { showSnackbar } from "../PlaylistController";

/**
 * The copy button component in PlaylistController.
 * @param param0
 * @returns
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
	playlists,
	updateTask,
	refreshPlaylists,
}) => {
	const { t } = useT();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isAllowDuplicate, setIsAllowDuplicate] = useState(false);
	const [targetPlaylistId, setTargetPlaylistId] = useState(DEFAULT);

	const { data } = useSession();
	if (!data?.accessToken) return <></>;
	const manager = new PlaylistManager(data.accessToken);

	const handleOnClickDialogOpen = () => setIsDialogOpen(true);

	const handleOnClickConfirm = async () => {
		setIsDialogOpen(false);
		const isTargeted = targetPlaylistId !== DEFAULT;

		// If the target playlist is selected, copy the selected playlists to the target playlists.
		// Otherwise, copy the selected playlists to the new playlists.
		const copyTasks = playlists
			.filter((ps) => ps.selected)
			.map(async (ps) => {
				const playlist = ps.data;
				const taskId = await generateUUID();
				updateTask({
					taskId,
					message: t("task-progress.copying-playlist", {
						title: playlist.title,
					}),
				});
				const result = await manager.copy({
					targetId: isTargeted ? targetPlaylistId : undefined,
					sourceId: playlist.id,
					privacy: "unlisted",
					allowDuplicates: isAllowDuplicate,
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
					? t("task-progress.succeed-to-copy-playlist", {
							title: playlist.title,
						})
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
		<>
			<NonUpperButton
				variant="contained"
				startIcon={<CopyIcon />}
				onClick={handleOnClickDialogOpen}
			>
				{t("button.copy")}
			</NonUpperButton>
			<Dialog
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onConfirm={handleOnClickConfirm}
				title={t("dialog.copy-title")}
			>
				<Tooltip title={t("dialog.copy-target-tooltip")}>
					<Typography style={{ display: "inline-block" }}>
						{t("dialog.copy-target")}
					</Typography>
				</Tooltip>
				<SelectMenu
					value={targetPlaylistId}
					items={[
						{ value: DEFAULT, label: t("dialog.create-new") },
						...playlists.map<SelectMenuItem>((ps) => ({
							value: ps.data.id,
							label: ps.data.title,
						})),
					]}
					onChange={(item) => setTargetPlaylistId(item.value)}
				/>
				<Switch
					checked={isAllowDuplicate}
					label={t("dialog.allow-duplicate")}
					onChange={(_, checked) => setIsAllowDuplicate(checked)}
				/>
			</Dialog>
		</>
	);
};

export type CopyButtonProps = Readonly<{
	playlists: PlaylistState[];
	updateTask: UpdateTaskFunc;
	refreshPlaylists: () => void;
}>;
