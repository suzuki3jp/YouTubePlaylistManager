"use client";
import type { Playlist } from "@/actions";
import { PlaylistCard, type PlaylistState } from "@/components";
import { Grid2 as Grid } from "@mui/material";
import type React from "react";

export const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({
	playlists,
	toggleSelected,
}) => {
	return (
		<Grid container spacing={2} size={12}>
			{playlists.map((ps) => (
				<Grid key={ps.data.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
					<PlaylistCard
						key={ps.data.id}
						playlist={ps}
						toggleSelected={toggleSelected}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export type PlaylistDisplayProps = Readonly<{
	playlists: PlaylistState[];
	toggleSelected: (playlist: Playlist) => void;
}>;
