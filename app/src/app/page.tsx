import {
	CenteredLayout,
	ClientProvidersProvider,
	Layout,
	PlaylistItemBrowser,
	PlaylistManager,
	SectionWithTitle,
} from "@/components";
import { useServerT } from "@/hooks";
import type { PageProps } from "@/types";
import { Box, Typography } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function Home({ searchParams }: PageProps) {
	const session = await getServerSession();
	const id = (await searchParams).id;
	const ids = typeof id === "string" ? id.split(",") : id;
	const { t } = await useServerT(searchParams);

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
							title={
								ids
									? t("playlist-item-browser.title")
									: t("playlist-manager.title")
							}
							subtitle={
								ids
									? t("playlist-item-browser.description")
									: t("playlist-manager.description")
							}
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
				<SectionWithTitle title="About">
					<Box ml={"10%"}>
						<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
							What is YouTubePlaylistManager
						</Typography>
						<Typography gutterBottom>
							YouTubePlaylistManager is a web application that allows you to
							manage your YouTube playlists and videos in a more efficient way.
						</Typography>
					</Box>
				</SectionWithTitle>
			</CenteredLayout>
		</Layout>
	);
}
