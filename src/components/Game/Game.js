import React, { Component } from 'react';
import QuestionCounter from '../QuestionCounter/QuestionCounter';
import ItemGuess from '../ItemGuess/ItemGuess';
import GameSummary from '../GameSummary/GameSummary';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quizQuestionsAsked: [],
			currentQuestion: 1,
			errors: null,
			dataLoaded: false,
			results: [],
			score: [],
			gameComplete: false
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

	updateScore = (q, isCorrect) => {
		this.setState(
			(prevState) => ({
				score: [...prevState.score, { q, isCorrect }]
			}),
			() => {
				if (this.state.currentQuestion === this.props.maxQuestions) {
					this.setState({
						gameComplete: true
					});
				} else {
					this.setState((oldState) => ({
						// Get new question
						currentItem: this.getUniqueQuestion(),
						currentQuestion: oldState.currentQuestion + 1
					}));
				}
			}
		);
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
						this.setState({
							dataLoaded: true,
							currentItem: this.getUniqueQuestion()
						});
					}
				);
			})
			.catch((err) => this.setState({ errors: err }));
	}

	render() {
		if (this.state.gameComplete) {
			return <GameSummary score={this.state.score} />;
		} else {
			return (
				this.state.dataLoaded && (
					<>
						<QuestionCounter
							current={this.state.currentQuestion}
							end={this.props.maxQuestions}
						/>
						<ItemGuess
							item={this.state.currentItem}
							results={this.state.results}
							current={this.state.currentQuestion}
							updateScore={this.updateScore}
						/>
					</>
				)
			);
		}
	}
}

export default Game;
