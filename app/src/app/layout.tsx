import { AppBar, SnackbarProvider, ThemeProvider } from "@/components";
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
		<html lang="ja">
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
