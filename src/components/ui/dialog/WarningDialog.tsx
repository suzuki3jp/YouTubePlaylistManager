"use client";
import { useT } from "@/hooks";
import { Warning as WarningIcon } from "@mui/icons-material";
import {
	Box,
	Button,
	type ButtonProps,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	type DialogProps,
	DialogTitle,
	Typography,
} from "@mui/material";
import type React from "react";

/**
 * Wrapped dialog component with warning icon and styling.
 * @param param0
 * @returns
 */
export const WarningDialog: React.FC<WarningDialogProps> = ({
	open,
	onClose,
	onConfirm,
	title,
	content,
	cancelText,
	confirmText,
}) => {
	const { t } = useT();

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<WarningIcon color="warning" />
				<Typography component="div" variant="h6">
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box sx={{ mb: 2 }}>
					<DialogContentText>{t("dialog.deleting-items")}</DialogContentText>
					<Typography
						variant="subtitle1"
						color="error"
						sx={{ mt: 1, whiteSpace: "pre-line", fontWeight: "bold" }}
					>
						{content}
					</Typography>
				</Box>
				<DialogContentText color="warning.main" sx={{ fontWeight: "bold" }}>
					{t("dialog.warning-cannot-undo")}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>{cancelText ?? t("button.cancel")}</Button>
				<Button
					onClick={onConfirm}
					color="error"
					startIcon={<WarningIcon />}
					variant="contained"
				>
					{confirmText ?? t("button.confirm")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export type WarningDialogProps = Readonly<{
	open: DialogProps["open"];
	onClose: () => void;
	onConfirm: ButtonProps["onClick"];
	title: React.ReactNode;
	content: React.ReactNode;
	cancelText?: string;
	confirmText?: string;
}>;
