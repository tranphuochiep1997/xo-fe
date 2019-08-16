import React from 'react';
import DrawCell from './DrawCell';

function DrawGrid({edge}) {
  const grid = [];
  let index = 0;
  for(let i = 0; i < edge; i++) {
    for (let j = 0; j < edge; j++) {
      ++index;
      grid.push(<DrawCell key={index.toString()}/>)
    }
  }
  return (
      <div className='draw-grid'>
        {grid}
      </div>
  );
}

export default DrawGrid;
