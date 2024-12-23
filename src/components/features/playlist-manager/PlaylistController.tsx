"use client";
import { Grid2 as Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import type React from "react";
import type {
    PlaylistState,
    SetTaskFunc,
    UpdateTaskFunc,
} from "./PlaylistManager";
import { BrowseButton } from "./browse-button";
import { CopyButton } from "./copy-button";
import { DeleteButton } from "./delete-button";
import { MergeButton } from "./merge-button";
import { ShuffleButton } from "./shuffle-button";

export const PlaylistController: React.FC<PlaylistControllerProps> = ({
    playlists,
    setTask,
    refreshPlaylists,
}) => {
    const { data } = useSession();
    if (!data?.accessToken) return <></>;

    const updateTask: UpdateTaskFunc = ({
        taskId,
        message,
        completed,
        total,
    }) => {
        if (message || completed || total) {
            setTask(taskId, (prev) => {
                if (prev) {
                    return {
                        message: message ?? prev.message,
                        completed: completed ?? prev.completed,
                        total: total ?? prev.total,
                    };
                }

                return {
                    message: message ?? "DEFAULT MESSAGE",
                    completed: completed ?? 0,
                    total: total ?? 0,
                };
            });
        } else {
            setTask(taskId, () => null);
        }
    };

    return playlists.filter((ps) => ps.selected).length === 0 ? (
        <></>
    ) : (
        <Grid container spacing={1} size={12}>
            <Grid>
                <CopyButton
                    playlists={playlists}
                    updateTask={updateTask}
                    refreshPlaylists={refreshPlaylists}
                />
            </Grid>
            <Grid>
                <ShuffleButton
                    playlists={playlists}
                    updateTask={updateTask}
                    refreshPlaylists={refreshPlaylists}
                />
            </Grid>
            <Grid>
                <MergeButton
                    playlists={playlists}
                    updateTask={updateTask}
                    refreshPlaylists={refreshPlaylists}
                />
            </Grid>
            <Grid>
                <DeleteButton
                    playlists={playlists}
                    refreshPlaylists={refreshPlaylists}
                />
            </Grid>
            <Grid>
                <BrowseButton playlists={playlists} />
            </Grid>
        </Grid>
    );
};

export type PlaylistControllerProps = Readonly<{
    playlists: PlaylistState[];
    setTask: SetTaskFunc;
    refreshPlaylists: () => void;
}>;

export const showSnackbar = (message: string, isSuccess = true) => {
    enqueueSnackbar(message, { variant: isSuccess ? "success" : "error" });
};
