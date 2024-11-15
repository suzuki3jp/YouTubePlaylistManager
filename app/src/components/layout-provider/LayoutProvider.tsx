"use client";
import { useT } from "@/hooks";
import { AppBar } from "../app-bar";
import { SnackbarProvider } from "../snackbar-provider";
import { ThemeProvider } from "../theme-provider";

export const LayoutProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { lang } = useT();

	return (
		<html lang={lang}>
			<body>
				<SnackbarProvider>
					<ThemeProvider>
						<AppBar />
						{children}
					</ThemeProvider>
				</SnackbarProvider>
			</body>
		</html>
	);
};
