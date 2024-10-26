"use client";
import { getPlaylists } from "@/actions";
import { PlaylistCard, type PlaylistData } from "@/components";
import { Grid2 as Grid } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
	const { data } = useSession();
	const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
	console.log(data);

	useEffect(() => {
		const fetch = async () => {
			if (!data || !data.accessToken) return;
			const p = await getPlaylists(data.accessToken);
			if (p.status === 200) {
				setPlaylists(p.data);
			} else if (p.status === 401) {
				signOut();
			}
		};
		fetch();
	}, [data]);

	return (
		<>
			<Grid container marginTop="1%">
				<Grid size={2} />
				<Grid size={8}>
					<Grid container spacing={2}>
						{playlists.map((v) => (
							<Grid key={v.id} size={3}>
								<PlaylistCard key={v.id} playlist={v} />
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid size={2} />
			</Grid>
		</>
	);
}
