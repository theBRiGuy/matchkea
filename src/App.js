import logo from './logo.svg';
import './App.css';
import ItemGrid from './components/ItemGrid/ItemGrid';

function App() {
  return (
    <div className="App">
      <header className="App__header"></header>
      <main className="App__main">
        <ItemGrid />
      </main>
      <footer className="App__footer"></footer>
    </div>
  );
}

export default App;
