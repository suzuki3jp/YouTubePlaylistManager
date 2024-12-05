import { getEnv } from "@/utils";
import type { NextAuthOptions } from "next-auth";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken?: string;
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
	}
}

const r = getEnv(["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"]);

if (r.isFailure()) throw r.data;
const [clientId, clientSecret] = r.data;

export const OPTIONS: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId,
			clientSecret,
			authorization: {
				params: {
					scope: [
						"https://www.googleapis.com/auth/youtube",
						"https://www.googleapis.com/auth/userinfo.profile",
						"https://www.googleapis.com/auth/userinfo.email",
					].join(" "),
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
