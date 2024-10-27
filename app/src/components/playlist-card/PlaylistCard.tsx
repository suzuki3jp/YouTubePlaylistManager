"use client";
import {
	ContentCopy as CopyIcon,
	Delete as DeleteIcon,
	CallMerge as MergeIcon,
	Shuffle as ShuffleIcon,
} from "@mui/icons-material";
import { Card, CardActions, CardHeader, CardMedia } from "@mui/material";

import { ButtonWithDesc } from "../button-with-desc";

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
				"& .MuiCardActions-root": {
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
			<CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
				<ButtonWithDesc title="プレイリストをコピーする">
					<CopyIcon />
				</ButtonWithDesc>
				<ButtonWithDesc title="プレイリストの動画順をシャッフルする">
					<ShuffleIcon />
				</ButtonWithDesc>
				<ButtonWithDesc title="プレイリスト同士を結合する">
					<MergeIcon />
				</ButtonWithDesc>
				<ButtonWithDesc title="プレイリストを削除する">
					<DeleteIcon />
				</ButtonWithDesc>
			</CardActions>
		</Card>
	);
};

export interface PlaylistData {
	id: string;
	title: string;
	thumbnailUrl: string;
}
