"use client";
import {
	Grid2 as Grid,
	AppBar as MuiAppBar,
	Toolbar,
	Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { GoogleSignOutButton } from "./GoogleSignOutButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const AppBar = () => {
	const { data } = useSession();

	return (
		<MuiAppBar
			position="static"
			sx={{
				bgcolor: "grey.900",
			}}
		>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					PlaylistManager
				</Typography>
				<Grid container spacing={2}>
					<LanguageSwitcher />
					{data ? <GoogleSignOutButton /> : <GoogleSignInButton />}
				</Grid>
			</Toolbar>
		</MuiAppBar>
	);
};
