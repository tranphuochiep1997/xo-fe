import React, {useState, useCallback} from 'react';
import './index.css';
import BoardContainer from './BoardContainer';
import Side from './Side';

function defaultSize() {
  return {
    xLength: parseInt(localStorage.getItem('x')) || 15,
    yLength: parseInt(localStorage.getItem('y')) || 15
  }
}

function Caro() {
  const [xIsNext, setXIsNext] = useState(true);
  const [size, setSize] = useState(defaultSize());
  const [isEndGame, setIsEndGame] = useState(null);
  const toggleXIsNext = useCallback(() => {
    setXIsNext(xIsNext => !xIsNext);
  }, []);

  const updateSize = useCallback((size) => {
      setSize(size);
      setXIsNext(true);
      localStorage.setItem('x', size.xLength);
      localStorage.setItem('y', size.yLength);
  }, []);

  return (
      <div className='caro'>
        <BoardContainer
            xIsNext={xIsNext}
            toggleXIsNext={toggleXIsNext}
            xLength={size.xLength}
            yLength={size.yLength}
            setIsEndGame={setIsEndGame}
            isEndGame={isEndGame}/>
        <Side xIsNext={xIsNext} isEndGame={isEndGame} initialSize={size} defaultSize={defaultSize} updateSize={updateSize}/>
      </div>
  );
}

export default Caro;