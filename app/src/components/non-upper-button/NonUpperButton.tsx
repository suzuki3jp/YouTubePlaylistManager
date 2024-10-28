import { Button, type ButtonProps } from "@mui/material";

/**
 * テキストを大文字に変換しないボタンコンポーネント
 */
export const NonUpperButton = ({ children, ...props }: ButtonProps) => {
	return (
		<Button {...props} sx={{ textTransform: "none" }}>
			{children}
		</Button>
	);
};
