"use client";
import { DEFAULT_LANGUAGE, QUERY_NAME, getOptions } from "@/locales/settings";
import i18next from "i18next";
import resourceToBackend from "i18next-resources-to-backend";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { initReactI18next, useTranslation } from "react-i18next";

i18next
	.use(initReactI18next)
	.use(
		resourceToBackend(
			(lang: string, namespace: string) =>
				import(`@/locales/${lang}/${namespace}.json`),
		),
	)
	.init(getOptions());

export const useT = () => {
	const query = useSearchParams();
	const lang = query.get(QUERY_NAME) || DEFAULT_LANGUAGE;
	const { t, i18n } = useTranslation("common");

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang, i18n]);

	return { t, i18n };
};
