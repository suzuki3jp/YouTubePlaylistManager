"use client";
import { PlaylistManager, generateUUID } from "@/actions";
import {
    Dialog,
    NonUpperButton,
    type PlaylistState,
    SelectMenu,
    type SelectMenuItem,
    Switch,
    type UpdateTaskFunc,
} from "@/components";
import { DEFAULT } from "@/constants";
import { useT } from "@/hooks";
import { CallMerge as MergeIcon } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import type React from "react";
import { useState } from "react";
import { showSnackbar } from "../PlaylistController";

/**
 * The merge button component in PlaylistController.
 * @param param0
 * @returns
 */
export const MergeButton: React.FC<MergeButtonProps> = ({
    playlists,
    updateTask,
    refreshPlaylists,
}) => {
    const { t } = useT();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAllowDuplicate, setIsAllowDuplicate] = useState(false);
    const [targetPlaylistId, setTargetPlaylistId] = useState(DEFAULT);

    const { data } = useSession();
    if (!data?.accessToken) return <></>;
    const manager = new PlaylistManager(data.accessToken);

    const handleOnClick = () => setIsDialogOpen(true);

    const handleOnClickConfirm = async () => {
        setIsDialogOpen(false);
        const isTargeted = targetPlaylistId !== DEFAULT;

        const taskId = await generateUUID();
        updateTask({
            taskId,
            message: t("task-progress.creating-new-playlist"),
        });

        const result = await manager.merge({
            targetId: isTargeted ? targetPlaylistId : undefined,
            sourceIds: playlists
                .filter((ps) => ps.selected)
                .map((ps) => ps.data.id),
            allowDuplicates: isAllowDuplicate,
            onAddedPlaylist: (p) => {
                updateTask({
                    taskId,
                    message: t("task-progress.created-playlist", {
                        title: p.title,
                    }),
                });
            },
            onAddingPlaylistItem: (i) => {
                updateTask({
                    taskId,
                    message: t("task-progress.copying-playlist-item", {
                        title: i.title,
                    }),
                });
            },
            onAddedPlaylistItem: (i, c, total) => {
                updateTask({
                    taskId,
                    message: t("task-progress.copied-playlist-item", {
                        title: i.title,
                    }),
                    completed: c,
                    total,
                });
            },
        });

        updateTask({ taskId });
        const message = result.isSuccess()
            ? t("task-progress.succeed-to-merge-playlist", {
                  title: playlists
                      .filter((ps) => ps.selected)
                      .map((ps) => ps.data.title)
                      .join(", "),
              })
            : t("task-progress.failed-to-merge-playlist", {
                  title: playlists
                      .filter((ps) => ps.selected)
                      .map((ps) => ps.data.title)
                      .join(", "),
                  code: result.data.status,
              });
        showSnackbar(message, result.isSuccess());
        refreshPlaylists();
    };

    return (
        <>
            <NonUpperButton
                variant="contained"
                startIcon={<MergeIcon />}
                onClick={handleOnClick}
            >
                {t("button.merge")}
            </NonUpperButton>
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleOnClickConfirm}
                title={t("dialog.merge-title")}
            >
                <Tooltip
                    title={t("dialog.merge-target-tooltip", {
                        op: "merge",
                        opPastTense: "merged",
                    })}
                >
                    <Typography style={{ display: "inline-block" }}>
                        {t("dialog.merge-target")}
                    </Typography>
                </Tooltip>
                <SelectMenu
                    value={targetPlaylistId}
                    items={[
                        { value: DEFAULT, label: t("dialog.create-new") },
                        ...playlists.map<SelectMenuItem>((ps) => ({
                            value: ps.data.id,
                            label: ps.data.title,
                        })),
                    ]}
                    onChange={(item) => setTargetPlaylistId(item.value)}
                />
                <Switch
                    checked={isAllowDuplicate}
                    label={t("dialog.allow-duplicate")}
                    onChange={(_, checked) => setIsAllowDuplicate(checked)}
                />
            </Dialog>
        </>
    );
};

export type MergeButtonProps = Readonly<{
    playlists: PlaylistState[];
    updateTask: UpdateTaskFunc;
    refreshPlaylists: () => void;
}>;
