import React from 'react';
import './GameSummary.scss';

function GameSummary(props) {
	const { score, results } = props;
	const baseCls = 'GameSummary';

	const getScore = (score) => {
		return [
			score.reduce((acc, cur) => (cur.isCorrect ? acc + 1 : acc), 0),
			score.length
		];
	};

	const scoreCount = getScore(score);

	return (
		<div className={baseCls}>
			<p>
				You scored {scoreCount[0]} out of {scoreCount[1]}!
			</p>
			<table className={`${baseCls}__table`}>
				{score.map((q) => (
					<tr>
						<td>{q.q}</td>
						<td>
							<img {...results.find((item) => item.id === q.itemID).image} />
						</td>
						<td>{q.isCorrect ? 'Correct' : 'Incorrect'}</td>
					</tr>
				))}
			</table>
		</div>
	);
}

export default GameSummary;
