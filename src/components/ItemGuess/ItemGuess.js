import { useEffect, useState } from 'react';
import { shuffleArray } from '../helpers';
import './ItemGuess.scss';
import ChoiceButton from '../ChoiceButton/ChoiceButton';

function ItemGuess(props) {
	const baseCls = 'ItemGuess';
	const { item, results } = props;
	const [choices, setChoices] = useState([]);

	const getChoices = (n = 4) => {
		let choices = [item];
		for (let i = 1; i < n; i++) {
			choices.push(getRandomChoice(choices));
		}
		return choices;
	};

	const getRandomChoice = (existingChoicesArr) => {
		const rand = Math.floor(Math.random() * results.length);
		const potentialChoice = results[rand];

		if (
			existingChoicesArr.find((choice) => {
				return (
					choice.title.toLowerCase() === potentialChoice.title.toLowerCase()
				);
			})
		) {
			// choice exists in array; try again
			return getRandomChoice(existingChoicesArr);
		} else {
			return potentialChoice;
		}
	};

	const handleItemClick = (id) => {
		// Update score object
		props.updateScore(props.current, id === item.id);
	};

	useEffect(() => {
		setChoices(shuffleArray(getChoices()));
	}, [item]);

	return (
		<div>
			{item && item.image && (
				<div className={`${baseCls}__image`}>
					<img {...item.image} />
				</div>
			)}
			{choices && (
				<div className={`${baseCls}__choices`}>
					{choices.map((choice) => (
						<ChoiceButton
							baseCls={`${baseCls}__choices__choice`}
							onClick={(e) => {
								handleItemClick(choice.id);
							}}
							choice={choice}
						>
							{choice.title}
						</ChoiceButton>
					))}
				</div>
			)}
		</div>
	);
}

export default ItemGuess;
