import React, { useState } from 'react';

// Import components
import Square from './Square';
import Reset from './Reset';

const Board = () => {
    // Keeps track of each square text:
    // - : empty
    // O/X : Player's moves 
    const [squares, setSquares] = useState(Array(9).fill('-'));

    // Keeps track of next player to go
    const [isNext, setIsNext] = useState(true);

    // Keeps track of each square's className
    // Update className when square is used to turn off css effect
    const [used, setUsed] = useState(Array(9).fill('unused-square'));

    // Updates text for which player is active
    const [player, setPlayer] = useState("Player 1's turn (X)");

    // Check's to see if game is active
    const [active, setActive] = useState(true);

    // Keeps track boxes left on board
    const [empty, setEmpty] = useState(8);

    function squareHandler(i) {
        // Get the current state values
        let isActive = active;
        const newSquares = squares.slice();
        const newUsed = used.slice();
        const next = isNext;
        let newPlayer = player;
        let newEmpty = empty;

        while (isActive) {
            // Return if square is used already
            if (newSquares[i] !== '-') {
                return;
            }

            // Get the new values for the states
            newSquares[i] = next ? 'X' : 'O';
            newPlayer = player === "Player 1's turn (X)" ? "Player 2's turn (O)" : "Player 1's turn (X)";
            newUsed[i] = 'used-square';

            // Update the state values
            setUsed(newUsed);
            setSquares(newSquares);
            setIsNext(!next);
            setPlayer(newPlayer)
            setEmpty(newEmpty - 1);

            if (newEmpty === 0) {
                setPlayer('Both players Tied');
                return;
            }

            if (calculateWinner(newSquares)) {
                setActive(!isActive)
                setUsed(Array(9).fill('used-square'));

                if (next) {
                    setPlayer("Player 1 (X) Won!");
                } else {
                    setPlayer("Player 2 (O) Won!");
                }

                return;
            }
        }
    };

    function renderSquare(i) {
        return <Square value={squares[i]} used={used[i]} onClick={() => squareHandler(i)} />
    }

    return (
        <div className='board-container'>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <br />
            <div id='status'>{player}</div>
            <Reset id='resetBtn' setEmpty={setEmpty} setPlayer={setPlayer} 
                   setUsed={setUsed} setSquares={setSquares} setActive={setActive} />
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] !== '-' && squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board