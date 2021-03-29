import logo from './logo.svg';
import './App.css';
import Game from './components/Game/Game';

function App() {
	return (
		<div className="App">
			<header className="App__header"></header>
			<main className="App__main">
				<Game maxQuestions={10} />
			</main>
			<footer className="App__footer"></footer>
		</div>
	);
}

export default App;
