import { CenteredLayout, Layout, Link, SectionWithTitle } from "@/components";
import {
	GOOGLE_CONNECTIONS,
	GOOGLE_PRIVACY_POLICY,
	YOUTUBE_TOS,
} from "@/constants";
import { useServerT } from "@/hooks";
import type { PageProps } from "@/types";
import { Grid2 as Grid, Typography } from "@mui/material";
import { Trans as TransWithoutContext } from "react-i18next/TransWithoutContext";

export default async function TermsAndPrivacy({ searchParams }: PageProps) {
	const { t, i18n } = await useServerT(searchParams);

	return (
		<Layout searchParams={searchParams}>
			<CenteredLayout
				mainGridProps={{ my: "1%" }}
				centerGridProps={{ spacing: 2 }}
				centerGridSize={8}
			>
				<SectionWithTitle
					title={t("terms-and-privacy.title")}
					titleSx={{ mb: "2%" }}
				>
					<CenteredLayout
						centerGridSize={10}
						centerGridProps={{
							direction: "column",
						}}
					>
						<Grid container spacing={3}>
							<Grid container spacing={3}>
								<Typography gutterBottom sx={{ mb: "1%" }}>
									<TransWithoutContext
										i18nKey={"terms-and-privacy.content.first"}
										components={{
											1: <Link href={YOUTUBE_TOS} />,
											2: <Link href={GOOGLE_PRIVACY_POLICY} />,
										}}
									/>
								</Typography>
								<Typography gutterBottom sx={{ mb: "1%" }}>
									{t("terms-and-privacy.content.second")}
								</Typography>
								<Typography gutterBottom sx={{ mb: "1%" }}>
									{t("terms-and-privacy.content.third")}
								</Typography>
								<Typography gutterBottom sx={{ mb: "1%" }}>
									{t("terms-and-privacy.content.forth")}
								</Typography>
							</Grid>
							<Grid>
								<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
									{t("terms-and-privacy.how-to-revoke.title")}
								</Typography>
								<Typography gutterBottom>
									<TransWithoutContext
										i18nKey={"terms-and-privacy.how-to-revoke.content"}
										components={{ 1: <Link href={GOOGLE_CONNECTIONS} /> }}
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
