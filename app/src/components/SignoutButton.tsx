"use client";

import { signOut } from "next-auth/react";

export const SignoutButton = () => {
	const handleClick = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<button type="button" onClick={handleClick}>
			Sign out
		</button>
	);
};
