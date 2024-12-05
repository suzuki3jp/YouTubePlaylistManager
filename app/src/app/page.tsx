import {
	CenteredLayout,
	ClientProvidersProvider,
	Layout,
	PlaylistItemBrowser,
	PlaylistManager,
	SectionWithTitle,
} from "@/components";
import type { PageProps } from "@/types";
import { Box, Typography } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function Home({ searchParams }: PageProps) {
	const session = await getServerSession();
	const id = (await searchParams).id;
	const ids = typeof id === "string" ? id.split(",") : id;

	return (
		<Layout searchParams={searchParams}>
			<CenteredLayout
				mainGridProps={{ mt: "0.5%" }}
				centerGridProps={{ spacing: 2 }}
				centerGridSize={8}
			>
				<ClientProvidersProvider>
					{session ? (
						<SectionWithTitle
							title={ids ? "Playlist item browser" : "PlaylistManager"}
							sx={{
								my: "1%",
							}}
						>
							<Box mt={"1%"}>
								{ids ? <PlaylistItemBrowser ids={ids} /> : <PlaylistManager />}
							</Box>
						</SectionWithTitle>
					) : null}
				</ClientProvidersProvider>
			</CenteredLayout>
		</Layout>
	);
}
