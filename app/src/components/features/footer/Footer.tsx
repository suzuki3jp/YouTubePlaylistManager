import { Link } from "@/components";
import { AUTHOR_NAME } from "@/constants";
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
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Link href="/">{t("footer.home")}</Link>
						</Box>
					</Grid>
					<Grid size={12}>
						<Typography variant="body2" color="text.secondary" align="center">
							© {new Date().getFullYear()} {AUTHOR_NAME}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export type FooterProps = Readonly<PageProps>;
