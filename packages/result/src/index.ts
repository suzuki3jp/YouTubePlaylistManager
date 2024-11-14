export type Result<S, E> = Success<S, unknown> | Failure<unknown, E>;
/**
 * 成功を表すクラス
 */
export class Success<S, E> {
	private readonly type = "success";

	public data: S;
	constructor(data: S) {
		this.data = data;
	}

	/**
	 * データを上書きする
	 * @param data
	 * @returns
	 */
	setData(data: S) {
		this.data = data;
		return this.data;
	}

	isSuccess(): this is Success<S, E> {
		return true;
	}

	isFailure(): this is Failure<S, E> {
		return false;
	}
}

/**
 * 失敗を表すクラス
 */
export class Failure<S, E> {
	private readonly type = "failure";

	public data: E;
	constructor(data: E) {
		this.data = data;
	}

	/**
	 * データを上書きする
	 * @param data
	 * @returns
	 */
	setData(data: E) {
		this.data = data;
		return this.data;
	}

	isSuccess(): this is Success<S, E> {
		return false;
	}

	isFailure(): this is Failure<S, E> {
		return true;
	}
}

export const Ok = <T>(data: T) => new Success(data);
export const Err = <T>(data: T) => new Failure(data);
