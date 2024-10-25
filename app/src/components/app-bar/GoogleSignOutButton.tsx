"use client";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export const GoogleSignOutButton = () => {
	const handleClick = async () => {
		await signOut();
	};

	return (
		<Button variant="contained" onClick={handleClick}>
			Sign out
		</Button>
	);
};
