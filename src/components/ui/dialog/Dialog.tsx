"use client";
import { useT } from "@/hooks";
import {
	Button,
	type ButtonProps,
	DialogActions,
	DialogContent,
	DialogTitle,
	Dialog as MuiDialog,
	type DialogProps as MuiDialogProps,
	Typography,
} from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import type React from "react";

/**
 * Wrapped dialog component.
 * @param param0
 * @returns
 */
export const Dialog: React.FC<DialogProps> = ({
	children,
	open,
	onClose,
	onConfirm,
	title,
	cancelText,
	confirmText,
}) => {
	const { t } = useT();

	return (
		<MuiDialog open={open} onClose={onClose}>
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<Typography component="div" variant="h6">
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>{cancelText ?? t("button.cancel")}</Button>
				<Button onClick={onConfirm} variant="contained">
					{confirmText ?? t("button.confirm")}
				</Button>
			</DialogActions>
		</MuiDialog>
	);
};

export type DialogProps = Readonly<
	PropsWithChildren<{
		open: MuiDialogProps["open"];
		onClose: () => void;
		onConfirm: ButtonProps["onClick"];
		title: ReactNode;
		cancelText?: string;
		confirmText?: string;
	}>
>;
