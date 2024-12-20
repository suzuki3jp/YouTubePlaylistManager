import {
	CenteredLayout,
	ClientProvidersProvider,
	Layout,
	Link,
	PlaylistItemBrowser,
	PlaylistManager,
	SectionWithTitle,
} from "@/components";
import { AUTHOR_GITHUB, AUTHOR_NAME } from "@/constants";
import { useServerT } from "@/hooks";
import type { PageProps } from "@/types";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { Trans as TransWithoutContext } from "react-i18next/TransWithoutContext";

export default async function Home({ searchParams }: PageProps) {
	const session = await getServerSession();
	const id = (await searchParams).id;
	const ids = typeof id === "string" ? id.split(",") : id;
	const { t } = await useServerT(searchParams);

	return (
		<Layout searchParams={searchParams}>
			<CenteredLayout
				mainGridProps={{ my: "1%" }}
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

				<SectionWithTitle
					title={t("about-section.title")}
					subtitle={t("about-section.description")}
					titleSx={{ mb: "2%" }}
				>
					<CenteredLayout
						centerGridSize={10}
						centerGridProps={{
							direction: "column",
						}}
					>
						<Grid container spacing={3}>
							<Grid>
								<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
									{t("about-section.what-is-youtube-playlist-manager.title")}
								</Typography>
								<Typography gutterBottom>
									{t("about-section.what-is-youtube-playlist-manager.content")}
								</Typography>
							</Grid>

							<Grid>
								<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
									{t("about-section.how-to-use.title")}
								</Typography>
								<Typography gutterBottom>
									{t("about-section.how-to-use.content")}
								</Typography>
							</Grid>

							<Grid>
								<Typography gutterBottom>
									<TransWithoutContext
										i18nKey={"about-section.disclimer.content"}
										values={{ dev: AUTHOR_NAME }}
										components={{
											1: <Link href={AUTHOR_GITHUB} />,
											2: <Link href={"/terms-and-privacy"} />,
										}}
									/>
								</Typography>
							</Grid>
						</Grid>
					</CenteredLayout>
				</SectionWithTitle>
			</CenteredLayout>
		</Layout>
	);
}
