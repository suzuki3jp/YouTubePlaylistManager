"use client";
import { SnackbarProvider as NotistackProvider } from "notistack";
import type { PropsWithChildren } from "react";
import type React from "react";

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
	children,
}) => {
	return <NotistackProvider>{children}</NotistackProvider>;
};

export type SnackbarProviderProps = Readonly<PropsWithChildren>;
