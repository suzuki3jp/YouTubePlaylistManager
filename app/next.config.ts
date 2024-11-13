import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ja"]
    },
    localePath: "./src/locales"
};

export default nextConfig;
