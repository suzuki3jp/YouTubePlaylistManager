import {
	ClientProvidersProvider,
	Layout,
	PlaylistItemBrowser,
	PlaylistManager,
} from "@/components";
import type { PageProps } from "@/types";

export default async function Home({ searchParams }: PageProps) {
	const id = (await searchParams).id;
	const ids = typeof id === "string" ? id.split(",") : id;

	return (
		<Layout searchParams={searchParams}>
			<ClientProvidersProvider>
				{ids ? <PlaylistItemBrowser ids={ids} /> : <PlaylistManager />}
			</ClientProvidersProvider>
		</Layout>
	);
}
