import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Playlist Manager For YouTube",
	description:
		"You can copy, shuffle, merge, manage, and delete Youtube (music) playlists",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
