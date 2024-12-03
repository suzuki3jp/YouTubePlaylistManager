import { AppBar } from "@/components";
import { Footer } from "@/components/features/footer";
import { QUERY_NAME, getSafeLang } from "@/locales/settings";
import { darkTheme } from "@/themes";
import type { PageProps } from "@/types";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-approuter";
import type React from "react";
import type { PropsWithChildren } from "react";

export const Layout: React.FC<LayoutProps> = async ({
	children,
	searchParams,
}) => {
	const lang = (await searchParams)[QUERY_NAME];
	const resolvedLang = getSafeLang(lang);

	return (
		<html lang={resolvedLang} style={{ height: "100%" }}>
			<body
				style={{
					margin: "0 0 0 0",
					backgroundColor: "black",
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<AppRouterCacheProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<AppBar />
						{children}
						<Footer searchParams={searchParams} />
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};

export type LayoutProps = Readonly<PropsWithChildren<PageProps>>;
