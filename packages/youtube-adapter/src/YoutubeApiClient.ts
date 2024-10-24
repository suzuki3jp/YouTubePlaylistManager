import { google, type youtube_v3 } from "googleapis";

export class YoutubeApiClient {
	async getPlaylistByPlaylistId(playlistId: string, accessToken: string) {
		const client = this.getClient(accessToken);
		const res = await client.playlists.list({
			part: [
				"id",
				"contentDetails",
				"localizations",
				"player",
				"snippet",
				"status",
			],
			id: [playlistId],
			maxResults: 1,
		});

		return res.data;
	}

	async getPlaylists(accessToken: string, pageToken?: string) {
		const client = this.getClient(accessToken);
		const res = await client.playlists.list({
			part: [
				"id",
				"contentDetails",
				"localizations",
				"player",
				"snippet",
				"status",
			],
			mine: true,
			maxResults: 50,
			pageToken,
		});

		return res.data;
	}

	private getClient(accessToken: string): youtube_v3.Youtube {
		const oauth = new google.auth.OAuth2();
		oauth.setCredentials({
			access_token: accessToken,
		});

		return google.youtube({ version: "v3", auth: oauth });
	}
}
