import React from 'react'


const Reset = ({ setEmpty, setPlayer, setUsed, setSquares, id, setActive }) => {

    function resetGame() {
        setSquares(Array(9).fill('-'));
        setUsed(Array(9).fill('unused-square'));
        setActive(true);
        setPlayer("Player 1's turn (X)");
        setEmpty(8);
    }


    return (
        <button id={id} onClick={resetGame}>Restart</button>
    )
}


export default Reset;