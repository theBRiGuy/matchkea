function ChoiceButton(props) {
	return (
		<button className={props.baseCls} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

export default ChoiceButton;
