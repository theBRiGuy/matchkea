import React, { Component } from 'react';
import QuestionCounter from '../QuestionCounter/QuestionCounter';
import ItemGuess from '../ItemGuess/ItemGuess';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quizQuestionsAsked: [],
			currentQuestion: 1,
			errors: null,
			results: []
		};
	}

	getUniqueQuestion = () => {
		const { results, quizQuestionsAsked } = this.state;
		const rand = Math.floor(Math.random() * results.length);
		const potentialQuestion = results[rand];

		if (!quizQuestionsAsked.includes(potentialQuestion.id)) {
			this.setState({
				quizQuestionsAsked: [...quizQuestionsAsked, potentialQuestion.id]
			});
			return potentialQuestion;
		} else {
			return this.getUniqueQuestion();
		}
	};

	componentDidMount() {
		const url = 'http://localhost:4000/';
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				this.setState(
					{
						results: json
					},
					() => {
						this.setState(
							{
								currentItem: this.getUniqueQuestion()
							},
							() => {
								console.log(
									'this.state.currentItem is',
									this.state.currentItem
								);
							}
						);
					}
				);
			})
			.catch((err) => this.setState({ errors: err }));
	}

	render() {
		return (
			<div>
				<QuestionCounter
					current={this.state.currentQuestion}
					end={this.props.maxQuestions}
				/>
				{this.state.results.length > 0 && this.state.currentItem && (
					<ItemGuess
						item={this.state.currentItem}
						results={this.state.results}
					/>
				)}
			</div>
		);
	}
}

export default Game;
// import { useState, useEffect, useCallback } from 'react';
// import { useConstructor } from 'use-constructor-hook';
// import QuestionCounter from '../QuestionCounter/QuestionCounter';
// import ItemGuess from '../ItemGuess/ItemGuess';

// function Game() {
// 	const [hasError, setErrors] = useState(false);
// 	const [results, setResults] = useState([]);
// 	const [quizQuestionsAsked, setQuizQuestionsAsked] = useState([]);
// 	const [currentQuestion, setCurrentQuestion] = useState(1);
// 	const [currentItem, setCurrentItem] = useState(null);
// 	const url = 'http://localhost:4000/';
// 	const maxQuestions = 10;

// 	const nextQuestion = () => {
// 		const rand = Math.floor(Math.random() * results.length);
// 		console.log('results is', results);
// 		console.log('rand is', rand);
// 		const potentialQuestion = results[rand];
// 		console.log('potentialQuestion is', potentialQuestion);
// 		if (!quizQuestionsAsked.includes(potentialQuestion.id)) {
// 			setQuizQuestionsAsked(quizQuestionsAsked.push(potentialQuestion.id));
// 			return potentialQuestion;
// 		}
// 		return nextQuestion();
// 	};

// 	const fetchData = async () => {
// 		const response = await fetch(url);
// 		response
// 			.json()
// 			.then((json) => {
// 				setResults(json);
// 			})
// 			.catch((err) => setErrors(err));
// 		console.log('currentItem is', currentItem);
// 		setCurrentItem(nextQuestion());
// 	};

// 	useConstructor(async () => {
// 		fetchData();
// 	});

// 	useEffect(() => {}, []);

// 	return (
// 		<div>
// 			<QuestionCounter current={currentQuestion} end={maxQuestions} />
// 			<ItemGuess item={currentItem} />
// 		</div>
// 	);
// }

// export default Game;
