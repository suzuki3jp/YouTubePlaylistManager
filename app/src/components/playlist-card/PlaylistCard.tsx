"use client";
import { CheckCircle as CheckIcon } from "@mui/icons-material";
import { ButtonBase, Card, CardHeader, CardMedia } from "@mui/material";

export const PlaylistCard = ({
	playlist,
	isSelected,
	toggleSelected,
}: Readonly<PlaylistCardProps>) => {
	return (
		<ButtonBase
			sx={{
				width: "100%",
				display: "block",
			}}
			onClick={() => toggleSelected(playlist)}
		>
			<Card
				sx={{
					bgcolor: isSelected ? "rgba(45, 128, 255, 0.15)" : "grey.900",
					border: isSelected ? "2px solid #2d80ff" : "2px solid transparent",
					borderRadius: 4,
					p: 2,
					"& .MuiCardHeader-root": {
						p: 0,
					},
					"& .MuiCardActions-root": {
						p: 0,
					},
					"&:hover": {
						bgcolor: isSelected
							? "rgba(45, 128, 255, 0.2)"
							: "rgba(45, 45, 45, 0.9)",
					},
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "2%",
					}}
				>
					{isSelected && <CheckIcon sx={{ marginRight: "2%" }} />}
					<CardHeader title={playlist.title} />
				</div>
				<div style={{ position: "relative", paddingTop: "56.25%" }}>
					<CardMedia
						image={playlist.thumbnailUrl}
						component={"img"}
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: 2,
						}}
					/>
				</div>
			</Card>
		</ButtonBase>
	);
};

export interface PlaylistData {
	id: string;
	title: string;
	thumbnailUrl: string;
}

export interface PlaylistCardProps {
	playlist: PlaylistData;
	isSelected: boolean;
	toggleSelected: (playlist: PlaylistData) => void;
}
