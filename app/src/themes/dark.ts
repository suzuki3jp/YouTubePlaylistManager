"use client";
import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Hiragino Sans"',
			'"Hiragino Kaku Gothic ProN"',
			'"Noto Sans JP"',
			'"Yu Gothic"',
			"YuGothic",
			"Meiryo",
			"sans-serif",
		].join(","),
	},
	palette: {
		mode: "dark",
	},
});
