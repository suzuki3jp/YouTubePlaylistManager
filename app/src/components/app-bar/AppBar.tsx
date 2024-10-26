"use client";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { GoogleSignOutButton } from "./GoogleSignOutButton";

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
				{data ? <GoogleSignOutButton /> : <GoogleSignInButton />}
			</Toolbar>
		</MuiAppBar>
	);
};
