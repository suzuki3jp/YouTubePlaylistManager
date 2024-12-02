"use client";
import {
	PlaylistItemBrowser,
	PlaylistManager,
	SnackbarProvider,
} from "@/components";
import { darkTheme } from "@/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const HomeUI = () => {
	const query = useSearchParams();
	const id = query.get("id");

	return (
		<ThemeProvider theme={darkTheme}>
			<SessionProvider>
				<SnackbarProvider>
					<CssBaseline />
					{id ? (
						<PlaylistItemBrowser ids={id.split(",")} />
					) : (
						<PlaylistManager />
					)}
				</SnackbarProvider>
			</SessionProvider>
		</ThemeProvider>
	);
};
