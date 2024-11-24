"use client";
import { type FullPlaylist, PlaylistManager as PM } from "@/actions";
import { Grid2 as Grid } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FullPlaylistCard } from "../full-playlist-card";

export const PlaylistItemBrowser = ({ ids }: { ids: string[] }) => {
	console.log(ids);
	const { data } = useSession();
	const [playlistIds, setPlaylistIds] = useState<string[]>(ids);
	const [playlists, setPlaylists] = useState<FullPlaylist[]>([]);

	const refreshPlaylists = useCallback(async () => {
		if (!data?.accessToken) return;

		const manager = new PM(data.accessToken);
		const playlistPromises = playlistIds.map((id) =>
			manager.getFullPlaylist(id),
		);
		const newPlaylistsResult = await Promise.all(playlistPromises);

		const isAllFaliure = newPlaylistsResult.every((r) => r.isFailure());
		if (isAllFaliure) return signOut();
		console.log(newPlaylistsResult);
		const newPlaylists = newPlaylistsResult
			.filter((r) => r.isSuccess())
			.map((s) => s.data);
		setPlaylists(newPlaylists);
	}, [data, playlistIds]);

	useEffect(() => {
		refreshPlaylists();
	}, [refreshPlaylists]);

	return (
		<Grid container marginTop="1%">
			<Grid size={2} />
			<Grid size={8} container spacing={2}>
				{playlists.map((fp) => (
					<FullPlaylistCard
						key={fp.id}
						playlist={fp}
						size={{ xs: 12, lg: 12 / playlists.length }}
					/>
				))}
			</Grid>
			<Grid size={2} />
		</Grid>
	);
};

export interface PlaylistItemBrowserProps {
	ids: string[];
}
