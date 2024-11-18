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
				paddingRight: { xs: 0, md: "20%" },
				paddingLeft: { xs: 0, md: "20%" },
			}}
		>
			<Toolbar
				sx={{
					flexDirection: { xs: "column", sm: "row" },
					gap: { xs: 2, sm: 0 },
					padding: {
						xs: 2,
						sm: "0 24px",
					},
					minHeight: {
						xs: "auto",
						sm: "64px",
					},
				}}
			>
				<Typography
					variant="h6"
					component="div"
					sx={{
						flexGrow: { sm: 1 },
						textAlign: { xs: "center", sm: "left" },
						width: { xs: "100%", sm: "auto" },
					}}
				>
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
