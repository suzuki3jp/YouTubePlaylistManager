"use client";
import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    typography: {
        fontFamily: ["Roboto", "Arial", "sans-serif", "Segoe UI"].join(","),
    },
    palette: {
        mode: "dark",
    },
});
