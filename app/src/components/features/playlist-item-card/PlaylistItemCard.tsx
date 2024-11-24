"use client";
import type { PlaylistItem } from "@/actions";
import { Card, CardHeader, CardMedia, Typography } from "@mui/material";

export const PlaylistItemCard = ({ item }: PlaylistItemCardPrpps) => {
	return (
		<Card
			sx={{
				display: "flex",
				borderRadius: 4,
				marginBottom: "1%",
			}}
		>
			<CardHeader
				title={
					<Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
				}
				subheader={<Typography sx={{ fontSize: "" }}>{item.author}</Typography>}
				sx={{ flex: "1 1 auto" }}
			/>
			<CardMedia
				component={"img"}
				draggable={false}
				image={item.thumbnail}
				sx={{ width: "15%" }}
			/>
		</Card>
	);
};

export interface PlaylistItemCardPrpps {
	item: PlaylistItem;
}
