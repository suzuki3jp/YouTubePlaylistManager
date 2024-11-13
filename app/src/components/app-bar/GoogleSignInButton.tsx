"use client";
import { NonUpperButton } from "@/components";
import { useT } from "@/hooks";
import { Google as GoogleIcon } from "@mui/icons-material";
import { signIn } from "next-auth/react";

export const GoogleSignInButton = () => {
	const { t } = useT();
	const handleClick = async () => {
		await signIn("google");
	};

	return (
		<NonUpperButton
			variant="contained"
			startIcon={<GoogleIcon />}
			onClick={handleClick}
		>
			{t("appbar.sign-in-with-google")}
		</NonUpperButton>
	);
};
