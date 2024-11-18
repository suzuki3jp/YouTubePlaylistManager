"use client";
import { useT } from "@/hooks";
import { AVAILABLE_LANGUAGES, QUERY_NAME } from "@/locales/settings";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LanguageSwitcher = () => {
	const { t, lang } = useT();
	const langs: Record<string, string> = {};
	for (const l of AVAILABLE_LANGUAGES) {
		langs[l] = t(`appbar.${l}`);
	}

	const router = useRouter();
	const [currentLang, setCurrentLang] = useState(lang);
	const handleChange = (event: SelectChangeEvent<string>) => {
		const newLang = Object.entries(langs).find(
			([_, name]) => name === event.target.value,
		)?.[0];
		if (!newLang) return;
		setCurrentLang(newLang);

		const params = new URLSearchParams();
		params.set(QUERY_NAME, newLang);
		router.push(`?${params.toString()}`);
	};

	return (
		<FormControl size="small">
			<InputLabel id="language-select-label">{t("language")}</InputLabel>
			<Select
				labelId="language-select-label"
				id="language-select"
				value={langs[currentLang]}
				label={t("language")}
				onChange={handleChange}
			>
				{Object.entries(langs).map(([code, name]) => (
					<MenuItem key={code} value={name}>
						{name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
