import { hoge } from "@playlistmanager/youtube-adapter";

import { GoogleLoginButton, SignoutButton } from "@/components";

export default async function Home() {
	hoge();
	return (
		<>
			<GoogleLoginButton />
			<SignoutButton />
		</>
	);
}
