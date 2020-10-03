import React from 'react';

const Square = ({ value, onClick, used }) => {
    return (
        <button onClick={onClick} className={used}>{value}</button>
    );
}

export default Square