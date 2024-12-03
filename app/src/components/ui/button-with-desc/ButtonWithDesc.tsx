import {
	IconButton,
	type IconButtonProps,
	Tooltip,
	type TooltipProps,
} from "@mui/material";
import type { PropsWithChildren } from "react";
import type React from "react";

export const ButtonWithDesc: React.FC<ButtonWithDescProps> = ({
	children,
	title,
	arrow,
	enterDelay,
	leaveDelay,
	onClick,
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

export type ButtonWithDescProps = Readonly<
	PropsWithChildren<{
		title?: TooltipProps["title"];
		arrow?: boolean;
		enterDelay?: TooltipProps["enterDelay"];
		leaveDelay?: TooltipProps["leaveDelay"];
		onClick?: IconButtonProps["onClick"];
	}>
>;
