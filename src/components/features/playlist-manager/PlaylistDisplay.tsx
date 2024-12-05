"use client";
import type { Playlist } from "@/actions";
import { PlaylistCard } from "@/components";
import { Grid2 as Grid } from "@mui/material";
import type React from "react";

export const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({
	playlists,
	selectedPlaylist,
	toggleSelected,
}) => {
	return (
		<Grid container spacing={2} size={12}>
			{playlists.map((v) => (
				<Grid key={v.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
					<PlaylistCard
						key={v.id}
						playlist={v}
						isSelected={selectedPlaylist.some((p) => p.id === v.id)}
						toggleSelected={toggleSelected}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export type PlaylistDisplayProps = Readonly<{
	playlists: Playlist[];
	selectedPlaylist: Playlist[];
	toggleSelected: (playlist: Playlist) => void;
}>;
