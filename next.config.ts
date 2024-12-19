import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		RELEASE: process.env.npm_package_version,
	},
};

export default nextConfig;
