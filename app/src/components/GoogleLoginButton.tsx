"use client";

import { signIn } from "next-auth/react";

export const GoogleLoginButton = () => {
	const handleClick = async () => {
		await signIn("google");
	};

	return (
		<button type="button" onClick={handleClick}>
			Sign in with Google
		</button>
	);
};
