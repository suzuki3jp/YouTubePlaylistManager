"use client";
import { NonUpperButton } from "@/components";
import { signOut } from "next-auth/react";

export const GoogleSignOutButton = () => {
	const handleClick = async () => {
		await signOut();
	};

	return (
		<NonUpperButton variant="contained" onClick={handleClick}>
			Sign out
		</NonUpperButton>
	);
};
