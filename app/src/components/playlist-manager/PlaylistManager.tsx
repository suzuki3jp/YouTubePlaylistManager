"use client";
import { getPlaylists } from "@/actions";
import type { PlaylistData } from "@/components";
import { Grid2 as Grid } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { PlaylistController } from "./PlaylistController";
import { PlaylistDisplay } from "./PlaylistDisplay";

export const PlaylistManager = () => {
	const { data } = useSession();
	const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
	const [selectedPlaylists, setSelectedPlaylists] = useState<PlaylistData[]>(
		[],
	);

	const toggleSelected = (playlist: PlaylistData) => {
		const exists = selectedPlaylists.some((p) => p.id === playlist.id);
		if (exists)
			return setSelectedPlaylists(
				selectedPlaylists.filter((p) => p.id !== playlist.id),
			);
		return setSelectedPlaylists([...selectedPlaylists, playlist]);
	};

	const refreshPlaylists = useCallback(async () => {
		if (!data || !data.accessToken) return;
		const p = await getPlaylists(data.accessToken);
		if (p.status === 200) {
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
		<>
			<Grid container marginTop="1%">
				<Grid size={2} />
				<Grid size={8}>
					<PlaylistController
						selectedItems={selectedPlaylists}
						refreshPlaylists={refreshPlaylists}
					/>
					<PlaylistDisplay
						playlists={playlists}
						selectedPlaylist={selectedPlaylists}
						toggleSelected={toggleSelected}
					/>
				</Grid>
				<Grid size={2} />
			</Grid>
		</>
	);
};
