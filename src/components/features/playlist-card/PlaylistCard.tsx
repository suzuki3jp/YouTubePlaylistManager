"use client";
import type { Playlist } from "@/actions";
import type { PlaylistState } from "@/components";
import { CheckCircle as CheckIcon } from "@mui/icons-material";
import { ButtonBase, Card, CardHeader, CardMedia } from "@mui/material";

export const PlaylistCard = ({
    playlist,
    toggleSelected,
}: Readonly<PlaylistCardProps>) => {
    return (
        <ButtonBase
            sx={{
                width: "100%",
                display: "block",
            }}
            onClick={() => toggleSelected(playlist.data)}
        >
            <Card
                sx={{
                    bgcolor: playlist.selected
                        ? "rgba(45, 128, 255, 0.15)"
                        : "grey.900",
                    border: playlist.selected
                        ? "2px solid #2d80ff"
                        : "2px solid transparent",
                    borderRadius: 4,
                    p: 2,
                    "& .MuiCardHeader-root": {
                        p: 0,
                    },
                    "& .MuiCardActions-root": {
                        p: 0,
                    },
                    "&:hover": {
                        bgcolor: playlist.selected
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
                    {playlist.selected && (
                        <CheckIcon sx={{ marginRight: "2%" }} />
                    )}
                    <CardHeader
                        title={playlist.data.title}
                        titleTypographyProps={{
                            fontWeight: 600,
                        }}
                    />
                </div>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <CardMedia
                        image={playlist.data.thumbnail}
                        component={"img"}
                        draggable={false}
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

export interface PlaylistCardProps {
    playlist: PlaylistState;
    toggleSelected: (playlist: Playlist) => void;
}
