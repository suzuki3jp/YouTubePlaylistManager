import {
	IconButton,
	type IconButtonProps,
	Tooltip,
	type TooltipProps,
} from "@mui/material";
import type { ReactNode } from "react";

export const ButtonWithDesc = ({
	children,
	title,
	arrow,
	enterDelay,
	leaveDelay,
	onClick,
}: {
	children: ReactNode;
	title?: TooltipProps["title"];
	arrow?: boolean;
	enterDelay?: TooltipProps["enterDelay"];
	leaveDelay?: TooltipProps["leaveDelay"];
	onClick?: IconButtonProps["onClick"];
}) => {
	return (
		<Tooltip
			title={title}
			arrow={arrow}
			enterDelay={enterDelay}
			leaveDelay={leaveDelay}
		>
			<IconButton onClick={onClick}>{children}</IconButton>
		</Tooltip>
	);
};
