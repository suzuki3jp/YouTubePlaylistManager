import { useServerT } from "@/hooks";
import type { PageProps } from "@/types";
import { Box, Container, Grid2 as Grid, Link, Typography } from "@mui/material";
import React from "react";

export const Footer = async ({ searchParams }: PageProps) => {
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
							<Link
								href="/"
								color="text.secondary"
								sx={{
									mx: 1,
									"&:hover": {
										color: "primary.main",
									},
								}}
							>
								{t("footer.home")}
							</Link>
						</Box>
					</Grid>
					<Grid size={12}>
						<Typography variant="body2" color="text.secondary" align="center">
							© {new Date().getFullYear()} {t("metadata.author")}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
