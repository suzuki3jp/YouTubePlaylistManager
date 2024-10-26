"use client";
import { Card, CardHeader, CardMedia } from "@mui/material";

export const PlaylistCard = ({
	playlist,
}: Readonly<{
	playlist: PlaylistData;
}>) => {
	return (
		<Card
			sx={{
				bgcolor: "grey.900",
				borderRadius: 4,
				p: 2,
				"& .MuiCardHeader-root": {
					p: 0,
				},
			}}
		>
			<CardHeader
				title={playlist.title}
				sx={{
					marginBottom: "2%",
				}}
			/>
			<CardMedia image={playlist.thumbnailUrl} component={"img"} />
		</Card>
	);
};

export interface PlaylistData {
	id: string;
	title: string;
	thumbnailUrl: string;
}
