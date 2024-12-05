import { Button, type ButtonProps } from "@mui/material";
import type React from "react";

/**
 * テキストを大文字に変換しないボタンコンポーネント
 */
export const NonUpperButton: React.FC<NonUpperButtonProps> = ({
	children,
	...props
}) => {
	return (
		<Button {...props} sx={{ textTransform: "none", fontWeight: "bold" }}>
			{children}
		</Button>
	);
};

export type NonUpperButtonProps = Readonly<ButtonProps>;
