import { Grid2 as Grid, type Grid2Props as GridProps } from "@mui/material";
import type React from "react";
import type { PropsWithChildren } from "react";

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
	children,
	centerGridSize,
	mainGridProps,
	centerGridProps,
}) => {
	const GRID_MAX_SIZE = 12;
	const sideGridSize = (GRID_MAX_SIZE - centerGridSize) / 2;

	return (
		<Grid container {...mainGridProps}>
			<Grid size={sideGridSize} />
			<Grid size={centerGridSize} container {...centerGridProps}>
				{children}
			</Grid>
			<Grid size={sideGridSize} />
		</Grid>
	);
};

export type CenteredLayoutProps = Readonly<
	{
		centerGridSize: number;
		mainGridProps?: Omit<GridProps, "container" | "size">;
		centerGridProps?: Omit<GridProps, "container" | "size">;
	} & PropsWithChildren
>;
