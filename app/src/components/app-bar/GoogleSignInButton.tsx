"use client";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export const GoogleSignInButton = () => {
	const handleClick = async () => {
		await signIn("google");
	};

	return (
		<Button
			variant="contained"
			startIcon={<GoogleIcon />}
			onClick={handleClick}
		>
			Sign in with Google
		</Button>
	);
};
