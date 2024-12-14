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
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [isPlaylistsNotFound, setIsPlaylistNotFound] = useState(false);
	const [selectedPlaylists, setSelectedPlaylists] = useState<Playlist[]>([]);
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
		const exists = selectedPlaylists.some((p) => p.id === playlist.id);
		if (exists)
			return setSelectedPlaylists(
				selectedPlaylists.filter((p) => p.id !== playlist.id),
			);
		return setSelectedPlaylists([...selectedPlaylists, playlist]);
	};

	const refreshPlaylists = useCallback(async () => {
		if (!data || !data.accessToken) return;
		const p = await new PM(data.accessToken).getPlaylists();
		if (p.isSuccess()) {
			setPlaylists(p.data);
			setSelectedPlaylists([]);
			setIsPlaylistNotFound(false);
		} else if (p.data.status === 404) {
			setPlaylists([]);
			setSelectedPlaylists([]);
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
						selectedItems={selectedPlaylists}
						setTask={setTask}
						refreshPlaylists={refreshPlaylists}
					/>
					<PlaylistDisplay
						playlists={playlists}
						selectedPlaylist={selectedPlaylists}
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
