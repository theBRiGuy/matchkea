import React from 'react';
import './GameSummary.scss';

function GameSummary(props) {
	const { score } = props;

	const getScore = (score) => {
		return [
			score.reduce((acc, cur) => (cur.isCorrect ? acc + 1 : acc), 0),
			score.length
		];
	};

	const scoreCount = getScore(score);

	return (
		<div className="GameSummary">
			<p>
				You scored {scoreCount[0]} out of {scoreCount[1]}!
			</p>
		</div>
	);
}

export default GameSummary;
