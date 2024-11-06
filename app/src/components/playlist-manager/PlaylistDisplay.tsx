"use client";
import { PlaylistCard, type PlaylistData } from "@/components";
import { Grid2 as Grid } from "@mui/material";

export const PlaylistDisplay = ({
	playlists,
	selectedPlaylist,
	toggleSelected,
}: {
	playlists: PlaylistData[];
	selectedPlaylist: PlaylistData[];
	toggleSelected: (playlist: PlaylistData) => void;
}) => {
	return (
		<Grid container spacing={2} marginTop={"1%"}>
			{playlists.map((v) => (
				<Grid key={v.id} size={3}>
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
