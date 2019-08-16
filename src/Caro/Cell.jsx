import React from 'react';

function Cell({value, onClick, color, isLastStep}) {
    return <button className={`cell ${isLastStep && 'cell-highlight'}`} style={{color}} onClick={onClick}>{value}</button>;
}

export default Cell;
