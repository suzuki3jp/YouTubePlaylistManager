"use client";
import {
	CssBaseline,
	ThemeProvider as MuiThemeProvider,
	createTheme,
} from "@mui/material";
import { SessionProvider } from "next-auth/react";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export const ThemeProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<MuiThemeProvider theme={darkTheme}>
			<CssBaseline />
			<SessionProvider>{children}</SessionProvider>
		</MuiThemeProvider>
	);
};
