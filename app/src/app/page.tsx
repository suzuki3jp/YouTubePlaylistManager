"use client";
import { LayoutProvider, PlaylistManager } from "@/components";

export default function Home() {
	return (
		<LayoutProvider>
			<PlaylistManager />
		</LayoutProvider>
	);
}
