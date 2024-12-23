import { Box, type SxProps, Typography } from "@mui/material";
import type React from "react";

/**
 * Displays a section with a title.
 * @returns
 */
export const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
    id,
    children,
    title,
    titleSx,
    subtitle,
    sx,
}) => {
    return (
        <Box sx={{ width: "100%", ...sx }} id={id}>
            <Box sx={titleSx}>
                <Typography
                    variant="h4"
                    fontWeight={"bold"}
                    textAlign={"center"}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        textAlign="center"
                        gutterBottom
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
            {children}
        </Box>
    );
};

export type SectionWithTitleProps = Readonly<{
    id?: string;
    children: React.ReactNode;
    title: string;
    titleSx?: SxProps;
    subtitle?: string;
    sx?: SxProps;
}>;
