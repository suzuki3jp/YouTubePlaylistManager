import { darkTheme } from "@/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type React from "react";
import type { PropsWithChildren } from "react";

export const ServerProvidersProvider: React.FC<
    ServerProvidersProviderProps
> = ({ children }) => {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};

export type ServerProvidersProviderProps = Readonly<PropsWithChildren>;
