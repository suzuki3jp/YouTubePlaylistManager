import {
	Grid2 as Grid,
	AppBar as MuiAppBar,
	Toolbar,
	Typography,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { GoogleSignOutButton } from "./GoogleSignOutButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const AppBar = async () => {
	const session = await getServerSession();

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
					{session ? <GoogleSignOutButton /> : <GoogleSignInButton />}
				</Grid>
			</Toolbar>
		</MuiAppBar>
	);
};
