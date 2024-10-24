import { GoogleLoginButton, SignoutButton } from "@/components";

export default async function Home() {
	return (
		<>
			<GoogleLoginButton />
			<SignoutButton />
		</>
	);
}
