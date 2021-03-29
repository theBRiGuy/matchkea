import { useEffect, useState } from 'react';
import { shuffleArray } from '../helpers';
import './ItemGuess.scss';
import ChoiceButton from '../ChoiceButton/ChoiceButton';

function ItemGuess(props) {
	const baseCls = 'ItemGuess';
	const { item, results } = props;
	console.log('props is', props);
	console.log('xxx item is', item);
	const [choices, setChoices] = useState([]);

	const getChoices = (n = 4) => {
		let choices = [item];
		console.log('xxx choices is', choices);
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
				console.log('existingChoicesArr is', existingChoicesArr);
				console.log('choice is ', choice);
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

	const handleItemClick = (e) => {
		console.log('this is', this);
		console.log('e is', e);
		if (this.props.choice.id === item.id) {
			alert('Correct!');
		} else {
			alert('Incorrect!');
		}
	};

	useEffect(() => {
		setChoices(shuffleArray(getChoices()));
	}, []);

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
							onClick={handleItemClick}
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
