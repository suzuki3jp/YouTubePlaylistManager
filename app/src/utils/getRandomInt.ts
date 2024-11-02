/**
 * min <= x <= max の整数を返す
 * @param min
 * @param max
 */
export const getRandomInt = (min: number, max: number) => {
	const minInt = Math.ceil(min);
	const maxInt = Math.floor(max);

	return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};
