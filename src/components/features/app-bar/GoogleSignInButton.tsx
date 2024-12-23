"use client";
import { Dialog, Link, NonUpperButton } from "@/components";
import { useT } from "@/hooks";
import { Google as GoogleIcon } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Trans as TransWithoutContext } from "react-i18next/TransWithoutContext";

export const GoogleSignInButton = () => {
    const { t } = useT();
    const [isSigninOpen, setIsSigninOpen] = useState(false);

    return (
        <>
            <NonUpperButton
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={() => setIsSigninOpen(true)}
            >
                {t("appbar.sign-in-with-google")}
            </NonUpperButton>
            <Dialog
                open={isSigninOpen}
                onClose={() => setIsSigninOpen(false)}
                onConfirm={async () => await signIn("google")}
                title={t("dialog.agreement-title")}
                cancelText={t("button.disagree")}
                confirmText={t("button.agree")}
            >
                <TransWithoutContext
                    i18nKey={"dialog.agreement-content"}
                    components={{
                        1: <Link href={"/terms-and-privacy"} />,
                    }}
                />
            </Dialog>
        </>
    );
};
