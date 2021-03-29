export function shuffleArray(array) {
	const copy = array.slice();
	let result = [];
	while (copy.length > 0) {
		const randomIndex = Math.floor(Math.random() * copy.length);
		result.push(copy[randomIndex]);
		copy.splice(randomIndex, 1);
	}
	return result;
}
