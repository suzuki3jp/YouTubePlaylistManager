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
import type { ReactNode } from "react";

export const WrappedDialog = ({
	open,
	onClose,
	onConfirm,
	title,
	content,
	isWarning = false,
}: Readonly<WrappedDialogProps>) => {
	const { t } = useT();

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				{isWarning ? <WarningIcon color="warning" /> : <></>}
				<Typography component="div" variant="h6">
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>
				{isWarning ? (
					<>
						<Box sx={{ mb: 2 }}>
							<DialogContentText>
								{t("dialog.deleting-items")}
							</DialogContentText>
							<Typography
								variant="subtitle1"
								color="error"
								sx={{ mt: 1, whiteSpace: "pre-line" }}
							>
								{content}
							</Typography>
						</Box>
						<DialogContentText color="warning.main">
							{t("dialog.warning-cannot-undo")}
						</DialogContentText>
					</>
				) : (
					<DialogContentText id="confirm-dialog-description">
						{content}
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>{t("button.cancel")}</Button>
				{isWarning ? (
					<Button
						onClick={onConfirm}
						color="error"
						startIcon={<WarningIcon />}
						variant="contained"
					>
						{t("button.submit")}
					</Button>
				) : (
					<Button onClick={onConfirm} variant="contained">
						{t("button.submit")}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export interface WrappedDialogProps {
	open: DialogProps["open"];
	onClose: () => void;
	onConfirm: ButtonProps["onClick"];
	title: ReactNode;
	content: ReactNode;
	isWarning?: boolean;
}
