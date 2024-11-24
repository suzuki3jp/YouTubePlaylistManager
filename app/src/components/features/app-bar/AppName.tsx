"use client";
import { DEFAULT_LANGUAGE, QUERY_NAME } from "@/locales/settings";
import { ButtonBase, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export const AppName = () => {
	const oldParams = useSearchParams();
	const router = useRouter();

	const onClick = () => {
		const newParams = new URLSearchParams();
		const lang = oldParams.get(QUERY_NAME) ?? DEFAULT_LANGUAGE;
		newParams.set(QUERY_NAME, lang);
		router.push(`?${newParams.toString()}`);
	};
	return (
		<ButtonBase
			sx={{ flexShrink: 0, p: "1% 1% 1% 1%", borderRadius: 2 }}
			onClick={onClick}
		>
			<Typography variant="h6" component="div">
				PlaylistManager
			</Typography>
		</ButtonBase>
	);
};
