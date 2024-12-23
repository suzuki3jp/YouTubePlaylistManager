"use client";
import { SnackbarProvider } from "@/components";
import { darkTheme } from "@/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import type React from "react";

export const ClientProvidersProvider: React.FC<
    ClientProvidersProviderProps
> = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <SessionProvider>
                <SnackbarProvider>
                    <CssBaseline />
                    {children}
                </SnackbarProvider>
            </SessionProvider>
        </ThemeProvider>
    );
};

export type ClientProvidersProviderProps = Readonly<PropsWithChildren>;
