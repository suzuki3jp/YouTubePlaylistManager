import { AppBar, ServerProvidersProvider } from "@/components";
import { Footer } from "@/components/features/footer";
import { QUERY_NAME, getSafeLang } from "@/locales/settings";
import type { PageProps } from "@/types";
import { getEnv } from "@/utils";
import Script from "next/script";
import type React from "react";
import type { PropsWithChildren } from "react";

export const Layout: React.FC<LayoutProps> = async ({
    children,
    searchParams,
}) => {
    const lang = (await searchParams)[QUERY_NAME];
    const resolvedLang = getSafeLang(lang);
    const gaIdResult = getEnv(["GOOGLE_ANALYTICS_ID"]);
    const gaId = gaIdResult.isFailure() ? "" : gaIdResult.data[0];

    return (
        <html lang={resolvedLang} style={{ height: "100%" }}>
            <head>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                    strategy="afterInteractive"
                    async
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
                </Script>
            </head>
            <body
                style={{
                    margin: "0 0 0 0",
                    backgroundColor: "black",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <ServerProvidersProvider>
                    <AppBar />
                    {children}
                    <Footer searchParams={searchParams} />
                </ServerProvidersProvider>
            </body>
        </html>
    );
};

export type LayoutProps = Readonly<PropsWithChildren<PageProps>>;
