"use client";
import { Link, NonUpperButton, WrappedDialog } from "@/components";
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
			<WrappedDialog
				open={isSigninOpen}
				onClose={() => setIsSigninOpen(false)}
				onConfirm={async () => await signIn("google")}
				title={t("dialog.agreement-title")}
				content={
					<TransWithoutContext
						i18nKey={"dialog.agreement-content"}
						components={{
							1: <Link href={"/terms-and-privacy"} />,
						}}
					/>
				}
				cancelText={t("button.disagree")}
				confirmText={t("button.agree")}
			/>
		</>
	);
};
