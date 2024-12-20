"use client";
import type { Playlist } from "@/actions";
import { Grid2 as Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import type React from "react";
import type { SetTaskFunc, UpdateTaskFunc } from "./PlaylistManager";
import { BrowseButton } from "./browse-button";
import { CopyButton } from "./copy-button";
import { DeleteButton } from "./delete-button";
import { MergeButton } from "./merge-button";
import { ShuffleButton } from "./shuffle-button";

export const PlaylistController: React.FC<PlaylistControllerProps> = ({
	selectedItems,
	setTask,
	refreshPlaylists,
}) => {
	const { data } = useSession();
	if (!data?.accessToken) return <></>;

	const updateTask: UpdateTaskFunc = ({
		taskId,
		message,
		completed,
		total,
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

	return selectedItems.length === 0 ? (
		<></>
	) : (
		<Grid container spacing={1} size={12}>
			<Grid>
				<CopyButton
					selectedItems={selectedItems}
					updateTask={updateTask}
					refreshPlaylists={refreshPlaylists}
				/>
			</Grid>
			<Grid>
				<ShuffleButton
					selectedItems={selectedItems}
					updateTask={updateTask}
					refreshPlaylists={refreshPlaylists}
				/>
			</Grid>
			<Grid>
				<MergeButton
					selectedItems={selectedItems}
					updateTask={updateTask}
					refreshPlaylists={refreshPlaylists}
				/>
			</Grid>
			<Grid>
				<DeleteButton
					selectedItems={selectedItems}
					refreshPlaylists={refreshPlaylists}
				/>
			</Grid>
			<Grid>
				<BrowseButton selectedItems={selectedItems} />
			</Grid>
		</Grid>
	);
};

export type PlaylistControllerProps = Readonly<{
	selectedItems: Playlist[];
	setTask: SetTaskFunc;
	refreshPlaylists: () => void;
}>;

export const showSnackbar = (message: string, isSuccess = true) => {
	enqueueSnackbar(message, { variant: isSuccess ? "success" : "error" });
};
