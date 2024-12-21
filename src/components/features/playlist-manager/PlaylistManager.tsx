"use client";
import { PlaylistManager as PM, type Playlist, type UUID } from "@/actions";
import { useT } from "@/hooks";
import { Grid2 as Grid, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {
	OperationProgress,
	type OperationProgressData,
} from "./OperationProgress";
import { PlaylistController } from "./PlaylistController";
import { PlaylistDisplay } from "./PlaylistDisplay";

export const PlaylistManager = () => {
	const { t } = useT();
	const { data } = useSession();
	const [playlists, setPlaylists] = useState<PlaylistState[]>([]);
	const [isPlaylistsNotFound, setIsPlaylistNotFound] = useState(false);
	const [progressTasks, setProgressTasks] = useState<
		Map<UUID, OperationProgressData>
	>(new Map());

	const setTask: SetTaskFunc = (
		taskId: UUID,
		callback: (
			prev: OperationProgressData | undefined,
		) => OperationProgressData | null,
	) => {
		setProgressTasks((prev) => {
			const prevData = prev.get(taskId);
			const callbackResult = callback(prevData);
			const newMap = new Map(prev);
			callbackResult
				? newMap.set(taskId, callbackResult)
				: newMap.delete(taskId);
			return newMap;
		});
	};

	const toggleSelected = (playlist: Playlist) => {
		setPlaylists((prev) =>
			prev.map((p) =>
				p.data.id === playlist.id ? { data: p.data, selected: !p.selected } : p,
			),
		);
	};

	const refreshPlaylists = useCallback(async () => {
		if (!data || !data.accessToken) return;
		const p = await new PM(data.accessToken).getPlaylists();
		if (p.isSuccess()) {
			setPlaylists(
				p.data.map((playlist) => ({ data: playlist, selected: false })),
			);
			setIsPlaylistNotFound(false);
		} else if (p.data.status === 404) {
			setPlaylists([]);
			setIsPlaylistNotFound(true);
		} else {
			signOut();
		}
	}, [data]);

	useEffect(() => {
		refreshPlaylists();
	}, [refreshPlaylists]);

	return (
		<Grid container spacing={2}>
			{isPlaylistsNotFound ? (
				<Typography variant="h4">{t("playlist-manager.not-found")}</Typography> // TODO: More styling
			) : (
				<>
					<OperationProgress tasks={progressTasks} />
					<PlaylistController
						playlists={playlists}
						setTask={setTask}
						refreshPlaylists={refreshPlaylists}
					/>
					<PlaylistDisplay
						playlists={playlists}
						toggleSelected={toggleSelected}
					/>
				</>
			)}
		</Grid>
	);
};

export type SetTaskFunc = (
	taskId: UUID,
	callback: (
		prev: OperationProgressData | undefined,
	) => OperationProgressData | null,
) => void;

export type UpdateTaskFunc = (options: {
	taskId: UUID;
	message?: string;
	completed?: number;
	total?: number;
}) => void;

export interface PlaylistState {
	data: Playlist;
	selected: boolean;
}
