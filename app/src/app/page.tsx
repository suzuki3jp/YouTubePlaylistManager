import { HomeUI, Layout } from "@/components";
import type { PageProps } from "@/types";

export default async function Home({ searchParams }: PageProps) {
	return (
		<Layout searchParams={searchParams}>
			<HomeUI />
		</Layout>
	);
}
