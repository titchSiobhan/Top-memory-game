import { useEffect, useState, useRef } from 'react';
// import GameLogic from './gameLogic';

function GetCard() {
	const [image, setImage] = useState('');
	const [cards, setCards] = useState([]);
	const [choice, setChoice] = useState([]);
	const [won, setWon] = useState(false);
	const [lose, setLose] = useState(false);
	const [guessCount, setGuessCount] = useState(0);

    const catName = ['Pebble', 'Fluffy', 'Fluff', 'Nyx', 'Emerald', 'Topaz', 'Sapphire', 'Munchkin', 'Daffodil', 'Chicken', 'Tulip', 'Flower', 'Duck']

    function pickName() {
        const index = Math.floor(Math.random() * catName.length);
        return catName[index];
    }
	useEffect(() => {
		async function fetchCard() {
			const response = await fetch(
				'https://api.thecatapi.com/v1/images/search?limit=10',
			);
			const data = await response.json();
            let nextId = 1;
			const nameCats = data.map((cat) => ({
				id: nextId++,
				name: pickName(),
				url: cat.url,
                alt: cat.alt,

			}));
			setCards(nameCats);
		}
		fetchCard();
	}, []);
	const guess = useRef(new Map());
	const HandleClick = (cat) => {
		setChoice(cat);
		if (guess.current.has(cat.id)) {
			setLose(true);
			return;
		}
        const shuffledCards = cards.sort(() => Math.random() - 0.5);
		guess.current.set(cat.id, cat.name);
		console.log(cat);
		console.log(guess.current.entries());
		setGuessCount(guess.current.size);
	};

	useEffect(() => {
		if (guessCount === 10) {
			console.log('You won!');
			setWon(true);
		}
	}, [guessCount]);


	function resetGame() {
		guess.current = new Map();
		setChoice(null);
		setGuessCount(0);
		setLose(false);
		setWon(false);
	}
	if (won) {
		return (
			<div className='container'>
				<h1>You Won!</h1>
				<button onClick={resetGame}>Play Again</button>
			</div>
		);
	}
	if (lose) {
		return (
			<div className='container'>
				<h1>You Lose!</h1>
				<button onClick={resetGame}>Play Again</button>
			</div>
		);
	}

	return (
		<div className='container'>
			
            <h2>Don't click the same cat twice</h2>
            <h3>Guesses: {guessCount}</h3>
			<div className="cardArea">
				{cards.map((cat) => (
					<div
						key={cat.id}
						className="catCard"
						onClick={() => HandleClick(cat)}>

						<h3>{cat.name}</h3>
						<img src={cat.url} alt={cat.name} />
					</div>
				))}
			</div>
		</div>
	);
}

export default GetCard;
