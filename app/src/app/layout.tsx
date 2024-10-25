import type { Metadata } from "next";

import { AppBar, ThemeProvider } from "@/components";

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
				<ThemeProvider>
					<AppBar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
