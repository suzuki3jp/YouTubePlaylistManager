"use client";
import { NonUpperButton } from "@/components";
import { useT } from "@/hooks";
import { signOut } from "next-auth/react";

export const GoogleSignOutButton = () => {
	const { t } = useT();
	const handleClick = async () => {
		await signOut();
	};

	return (
		<NonUpperButton variant="contained" onClick={handleClick}>
			{t("appbar.sign-out")}
		</NonUpperButton>
	);
};
