import './QuestionCounter.scss';

export default function QuestionCounter(props) {
	const { current, end } = props;

	return (
		<div className="QuestionCounter">
			Question {current} of {end}
		</div>
	);
}
