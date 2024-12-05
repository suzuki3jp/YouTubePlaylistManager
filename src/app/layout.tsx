import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "YouTube Playlist Manager",
	description: "Managing playlists",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
