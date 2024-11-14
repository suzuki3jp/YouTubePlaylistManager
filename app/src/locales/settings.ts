export const QUERY_NAME = "lang";

export const DEFAULT_LANGUAGE = "en";

export const AVAILABLE_LANGUAGES = [DEFAULT_LANGUAGE, "ja"];

export const getOptions = (lang: string = DEFAULT_LANGUAGE) => {
	return {
		lng: lang,
		fallbackLng: DEFAULT_LANGUAGE,
		supportedLngs: AVAILABLE_LANGUAGES,
	};
};
