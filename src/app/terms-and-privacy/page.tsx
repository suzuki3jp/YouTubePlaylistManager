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
					subtitle={
						t("terms-and-privacy.effective-date") +
						t("terms-and-privacy.effective-date-value")
					}
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
									{t("terms-and-privacy.definition")}
								</Typography>
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.acceptance-of-terms.title")}
									</Typography>
									<Typography gutterBottom>
										<TransWithoutContext
											i18nKey={"terms-and-privacy.acceptance-of-terms.content"}
											components={{
												1: <Link href={YOUTUBE_TOS} />,
												2: <Link href={GOOGLE_PRIVACY_POLICY} />,
											}}
										/>
									</Typography>
								</Grid>
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.limitation-of-liability.title")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.limitation-of-liability.content")}
									</Typography>
								</Grid>
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.youtube-data-api.title")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.youtube-data-api.content")}
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
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.security-of-data.title")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.security-of-data.content")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.security-of-data.second-content")}
									</Typography>
								</Grid>
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.disclosures-of-data.title")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.disclosures-of-data.content")}
									</Typography>
								</Grid>
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.google-analytics.title")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.google-analytics.content")}
									</Typography>
								</Grid>
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.update-and-changes.title")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.update-and-changes.content")}
									</Typography>
								</Grid>
								<Grid>
									<Typography fontWeight={"bold"} fontSize={20} gutterBottom>
										{t("terms-and-privacy.governing-law.title")}
									</Typography>
									<Typography gutterBottom>
										{t("terms-and-privacy.governing-law.content")}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</CenteredLayout>
				</SectionWithTitle>
			</CenteredLayout>
		</Layout>
	);
}
