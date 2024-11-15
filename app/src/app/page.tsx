"use client";
import { PlaylistManager, SnackbarProvider } from "@/components";
import { darkTheme } from "@/themes";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";

export default function Home() {
	return (
		<ThemeProvider theme={darkTheme}>
			<SessionProvider>
				<SnackbarProvider>
					<PlaylistManager />
				</SnackbarProvider>
			</SessionProvider>
		</ThemeProvider>
	);
}
