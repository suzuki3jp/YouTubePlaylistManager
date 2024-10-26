import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { YoutubeAdapter } from "@playlistmanager/youtube-adapter";
import { getServerSession } from "next-auth/next";

export const Playlists = async () => {
	const session = await getServerSession(OPTIONS);
	if (!session || !session.accessToken) return <></>;

	const adapter = new YoutubeAdapter();
	const res = await adapter.getPlaylists(session.accessToken);

	if (res.isFailure()) {
		console.log("Request failed");
		return <></>;
	}

	return (
		<>
			{res.data.map((v, i) => (
				<>
					{/* biome-ignore lint/correctness/useJsxKeyInIterable: <explanation> */}
					<div>{v.getTitle}</div>
					<img src={v.getThumbnailUrl} alt="hoge" style={{ width: "300px" }} />
				</>
			))}
		</>
	);
};
