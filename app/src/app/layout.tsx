import { AppBar } from "@/components";
import { DEFAULT_LANGUAGE } from "@/locales/settings";
import { darkTheme } from "@/themes";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-approuter";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "PlaylistManager",
	description: "Managing playlists",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang={DEFAULT_LANGUAGE}>
			<body style={{ margin: "0 0 0 0", backgroundColor: "black" }}>
				<AppRouterCacheProvider>
					<ThemeProvider theme={darkTheme}>
						<AppBar />
						{children}
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
