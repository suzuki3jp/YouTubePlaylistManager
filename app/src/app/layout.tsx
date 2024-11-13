import { AppBar, SnackbarProvider, ThemeProvider } from "@/components";
import { DEFAULT_LANGUAGE } from "@/locales/settings";
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
			<body>
				<SnackbarProvider>
					<ThemeProvider>
						<AppBar />
						{children}
					</ThemeProvider>
				</SnackbarProvider>
			</body>
		</html>
	);
}
