"use client";
import { PlaylistManager as PM, type Playlist, type UUID } from "@/actions";
import { CenteredLayout } from "@/components";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {
	OperationProgress,
	type OperationProgressData,
} from "./OperationProgress";
import { PlaylistController } from "./PlaylistController";
import { PlaylistDisplay } from "./PlaylistDisplay";

export const PlaylistManager = () => {
	const { data } = useSession();
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
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
		} else {
			signOut();
		}
	}, [data]);

	useEffect(() => {
		refreshPlaylists();
	}, [refreshPlaylists]);

	return (
		<CenteredLayout
			mainGridProps={{ mt: "0.5%" }}
			centerGridProps={{ spacing: 2 }}
			centerGridSize={8}
		>
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
		</CenteredLayout>
	);
};

export type SetTaskFunc = (
	taskId: UUID,
	callback: (
		prev: OperationProgressData | undefined,
	) => OperationProgressData | null,
) => void;
