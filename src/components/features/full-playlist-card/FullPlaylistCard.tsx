"use client";
import type { FullPlaylist } from "@/actions";
import { useT } from "@/hooks";
import { Search as SearchIcon } from "@mui/icons-material";
import {
    Card,
    CardContent,
    CardHeader,
    Grid2 as Grid,
    type Grid2Props as GridProps,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import { PlaylistItemCard } from "../playlist-item-card";

export const FullPlaylistCard: React.FC<FullPlaylistCardProps> = ({
    playlist,
    size,
}) => {
    const [searchText, setSearchText] = useState("");
    const { t } = useT();

    return (
        <Grid size={size}>
            <Card
                sx={{
                    bgcolor: "grey.900",
                    borderRadius: 4,
                }}
            >
                <CardHeader
                    title={
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "24px",
                                    paddingLeft: "1%",
                                }}
                            >
                                {playlist.title}
                            </Typography>
                            <TextField
                                placeholder={t("search-placeholder")}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                size="small"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Grid>
                    }
                    sx={{
                        paddingBottom: 0,
                    }}
                />
                <CardContent>
                    {playlist.items
                        .map((item) => {
                            const lowerTitle = item.title.toLowerCase();
                            const lowerAuthor = item.author.toLowerCase();
                            const lowerSearchText = searchText.toLowerCase();

                            const isTarget =
                                lowerTitle.includes(lowerSearchText) ||
                                lowerAuthor.includes(lowerSearchText);
                            if (isTarget)
                                return (
                                    <PlaylistItemCard
                                        key={item.id}
                                        item={item}
                                    />
                                );
                            return null;
                        })
                        .filter((v) => v !== null)}
                </CardContent>
            </Card>
        </Grid>
    );
};

export type FullPlaylistCardProps = Readonly<{
    playlist: FullPlaylist;
    size: GridProps["size"];
}>;
