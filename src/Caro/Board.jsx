import React from 'react';
import Cell from './Cell';

function Board({steps, onCellClick, lastStep}) {
  const renderBoard = () => {
    const board = [];
    const {length} = steps;
    let key = 0;
    for (let i = 0; i < length; i++) {
      const rows = [];
      const rowLength = steps[i].length;
      for (let j = 0; j < rowLength; j++) {
        rows.push(renderCell(key, i, j));
        ++key;
      }
      board.push(
          <div className='caro-row' key={i.toString()}>
            {rows}
          </div>
      );
    }
    return board;
  };

  const renderCell = (key, i, j) => {
    const step = steps[i][j];
    let color = null;
    let value = null;
    if (step === true) {
      color = 'red';
      value = 'X'
    }
    if (step === false) {
      color = 'green';
      value = 'O';
    }
    const isLastStep = lastStep.i === i && lastStep.j === j;
    return <Cell key={key.toString()} isLastStep={isLastStep} color={color} value={value} onClick={onCellClick(i, j)}/>;
  };

  return (
      <div className='caro-board'>
        {renderBoard()}
      </div>
  );
}

export default Board;
