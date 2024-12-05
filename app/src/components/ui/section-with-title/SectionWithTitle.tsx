import { Box, type SxProps, Typography } from "@mui/material";
import type React from "react";

/**
 * Displays a section with a title.
 * @returns
 */
export const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
	children,
	title,
	subtitle,
	sx,
}) => {
	return (
		<Box sx={{ width: "100%", ...sx }}>
			<Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
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
			{children}
		</Box>
	);
};

export type SectionWithTitleProps = Readonly<{
	children: React.ReactNode;
	title: string;
	subtitle?: string;
	sx?: SxProps;
}>;
