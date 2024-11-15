"use client";
import { PlaylistManager, SnackbarProvider } from "@/components";
import { useT } from "@/hooks";
import { darkTheme } from "@/themes";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
	// TODO: 現状 layout.tsx でクエリを取得する方法がないっぽかったから回避策でこれ
	const { lang } = useT();
	useEffect(() => {
		document.documentElement.setAttribute("lang", lang);
	}, [lang]);

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
