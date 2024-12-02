import { AppBar } from "@/components";
import { QUERY_NAME, getSafeLang } from "@/locales/settings";
import { darkTheme } from "@/themes";
import type { PageProps } from "@/types";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-approuter";

export const Layout = async ({
	children,
	searchParams,
}: Readonly<
	{
		children: React.ReactNode;
	} & PageProps
>) => {
	const lang = (await searchParams)[QUERY_NAME];
	const resolvedLang = getSafeLang(lang);

	return (
		<html lang={resolvedLang}>
			<body style={{ margin: "0 0 0 0", backgroundColor: "black" }}>
				<AppRouterCacheProvider>
					<ThemeProvider theme={darkTheme}>
						<AppBar />
						{children}
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};
