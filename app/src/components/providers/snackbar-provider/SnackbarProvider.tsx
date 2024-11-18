"use client";
import { SnackbarProvider as NotistackProvider } from "notistack";
import type { ReactNode } from "react";

export const SnackbarProvider = ({
	children,
}: Readonly<SnackbarProviderProps>) => {
	return <NotistackProvider>{children}</NotistackProvider>;
};

export interface SnackbarProviderProps {
	children: ReactNode;
}
