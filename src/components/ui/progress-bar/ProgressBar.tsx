"use client";
import {
    Card,
    CardContent,
    Grid2 as Grid,
    LinearProgress,
    Typography,
} from "@mui/material";
import type React from "react";

export const ProgressBar: React.FC<ProgressBarProps> = ({
    message,
    completed,
    total,
}) => {
    return (
        <Grid container size={12}>
            <Grid size={12}>
                <Card
                    sx={{
                        bgcolor: "grey.900",
                        border: "2px solid transparent",
                        borderRadius: 4,
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">{message}</Typography>
                        <LinearProgress
                            color="primary"
                            variant="determinate"
                            value={(completed / total) * 100}
                            sx={{
                                height: 8,
                                marginTop: "0.2%",
                                backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export type ProgressBarProps = Readonly<{
    message: string;
    completed: number;
    total: number;
}>;
