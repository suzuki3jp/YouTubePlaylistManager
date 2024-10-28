"use client";
import { NonUpperButton } from "@/components";
import { Google as GoogleIcon } from "@mui/icons-material";
import { signIn } from "next-auth/react";

export const GoogleSignInButton = () => {
	const handleClick = async () => {
		await signIn("google");
	};

	return (
		<NonUpperButton
			variant="contained"
			startIcon={<GoogleIcon />}
			onClick={handleClick}
		>
			Sign in with Google
		</NonUpperButton>
	);
};
