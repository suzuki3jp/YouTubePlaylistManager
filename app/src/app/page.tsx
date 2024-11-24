"use client";
import {
	PlaylistItemBrowser,
	PlaylistManager,
	SnackbarProvider,
} from "@/components";
import { useT } from "@/hooks";
import { darkTheme } from "@/themes";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const query = useSearchParams();
	const id = query.get("id");

	// TODO: 現状 layout.tsx でクエリを取得する方法がないっぽかったから回避策でこれ
	const { lang } = useT();
	useEffect(() => {
		document.documentElement.setAttribute("lang", lang);
	}, [lang]);

	return (
		<ThemeProvider theme={darkTheme}>
			<SessionProvider>
				<SnackbarProvider>
					{id ? (
						<PlaylistItemBrowser ids={id.split(",")} />
					) : (
						<PlaylistManager />
					)}
				</SnackbarProvider>
			</SessionProvider>
		</ThemeProvider>
	);
}
