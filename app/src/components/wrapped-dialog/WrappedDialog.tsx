"use client";
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
							<DialogContentText>以下の項目を削除します: </DialogContentText>
							<Typography
								variant="subtitle1"
								color="error"
								sx={{ mt: 1, whiteSpace: "pre-line" }}
							>
								{content}
							</Typography>
						</Box>
						<DialogContentText color="warning.main">
							この操作は取り消すことができません。本当に続行しますか？
						</DialogContentText>
					</>
				) : (
					<DialogContentText id="confirm-dialog-description">
						{content}
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>キャンセル</Button>
				{isWarning ? (
					<Button
						onClick={onConfirm}
						color="error"
						startIcon={<WarningIcon />}
						variant="contained"
					>
						決定
					</Button>
				) : (
					<Button onClick={onConfirm} variant="contained">
						決定
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
