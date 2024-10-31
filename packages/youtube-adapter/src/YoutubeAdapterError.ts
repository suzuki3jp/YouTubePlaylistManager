import { BaseAdapterError } from "@playlistmanager/base-adapter";

export class YoutubeAdapterError extends BaseAdapterError {
	constructor(
		message: ErrorMessage,
		public readonly code: ErrorCode,
		public readonly status: ErrorStatus,
	) {
		super(message, code, status);
		this.name = "YoutubeAdapterError";
	}

	static fromUnkwonError() {}
}

export const YoutubeAdapterErrorCodes = {
	UNAUTHORIZED: {
		code: 401,
		message: "Unauthorized: invalid access_token",
	},
	/**
	 * クォータ制限の時はこのコードが返されるかも
	 */
	FORBIDDEN: {
		code: 403,
		message: "Forbidden: permission denied",
	},
	NOT_FOUND: {
		code: 404,
		message: "NotFound: could not find the resource",
	},
	TOO_MANY_REQUESTS: {
		code: 429,
		message: "TooManyRequests: Youtube API daily quota exceeded",
	},
	UNKNOWN_ERROR: {
		code: 0,
		message: "UnknownError: An unknown error occurred during the request",
	},
} as const;

type ErrorCode =
	(typeof YoutubeAdapterErrorCodes)[keyof typeof YoutubeAdapterErrorCodes]["code"];

type ErrorMessage =
	(typeof YoutubeAdapterErrorCodes)[keyof typeof YoutubeAdapterErrorCodes]["message"];

type ErrorStatus = keyof typeof YoutubeAdapterErrorCodes;
