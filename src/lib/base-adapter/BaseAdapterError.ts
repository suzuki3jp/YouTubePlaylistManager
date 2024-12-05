export abstract class BaseAdapterError extends Error {
	constructor(
		message: string,
		public readonly code: number,
		public readonly status: string,
	) {
		super(message);
		this.name = "BaseAdapterError";
	}
}
