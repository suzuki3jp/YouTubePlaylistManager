import { Link } from "@/components";
import { AUTHOR_GITHUB, AUTHOR_NAME } from "@/constants";
import { useServerT } from "@/hooks";
import type { PageProps } from "@/types";
import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";
import type React from "react";

export const Footer: React.FC<FooterProps> = async ({ searchParams }) => {
	const { t } = await useServerT(searchParams);

	return (
		<Box
			component="footer"
			sx={{
				marginTop: "auto",
				width: "100%",
				bgcolor: "#353535",
				py: "1%",
			}}
		>
			<Container maxWidth="sm">
				<Grid container spacing={2} justifyContent="center">
					<Grid size={12}>
						<Grid
							container
							spacing={1}
							sx={{ display: "flex", justifyContent: "center" }}
						>
							<Link href="/">{t("footer.home")}</Link>
							<Link href="/">{t("footer.terms-and-privacy")}</Link>
						</Grid>
					</Grid>
					<Grid
						container
						size={12}
						sx={{
							justifyContent: "center",
						}}
					>
						<Typography variant="body2" color="text.secondary" align="center">
							© {new Date().getFullYear()}
							<Link
								href={AUTHOR_GITHUB}
								sx={{ ml: "5px", top: "-1px", position: "relative" }} // TODO: Hardcoded top value Because <p> and <a> have different line base height
							>
								{AUTHOR_NAME}
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export type FooterProps = Readonly<PageProps>;
