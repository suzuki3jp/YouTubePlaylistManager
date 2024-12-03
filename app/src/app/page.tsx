import {
	ClientProvidersProvider,
	Layout,
	PlaylistItemBrowser,
	PlaylistManager,
	SectionWithTitle,
} from "@/components";
import type { PageProps } from "@/types";
import { getServerSession } from "next-auth";

export default async function Home({ searchParams }: PageProps) {
	const session = await getServerSession();
	const id = (await searchParams).id;
	const ids = typeof id === "string" ? id.split(",") : id;

	return (
		<Layout searchParams={searchParams}>
			<ClientProvidersProvider>
				{session ? (
					<SectionWithTitle
						title={ids ? "Playlist item browser" : "PlaylistManager"}
						sx={{
							my: "1%",
						}}
					>
						{ids ? <PlaylistItemBrowser ids={ids} /> : <PlaylistManager />}
					</SectionWithTitle>
				) : null}
			</ClientProvidersProvider>
		</Layout>
	);
}
