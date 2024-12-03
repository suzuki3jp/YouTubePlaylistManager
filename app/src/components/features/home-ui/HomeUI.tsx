"use client";
import {
	ClientProvidersProvider,
	PlaylistItemBrowser,
	PlaylistManager,
} from "@/components";
import { useSearchParams } from "next/navigation";

export const HomeUI = () => {
	const query = useSearchParams();
	const id = query.get("id");

	return (
		<ClientProvidersProvider>
			{id ? <PlaylistItemBrowser ids={id.split(",")} /> : <PlaylistManager />}
		</ClientProvidersProvider>
	);
};
