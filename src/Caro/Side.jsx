import React, {useState, useEffect} from 'react';

function Side({xIsNext, isEndGame, updateSize, initialSize, defaultSize}) {
  const [xLength, setXLength] = useState(initialSize.xLength);
  const [yLength, setYLength] = useState(initialSize.yLength);
  useEffect(() => {
    setXLength(initialSize.xLength);
    setYLength(initialSize.yLength);
  }, [initialSize]);

  const handleSubmit = e => {
    e.preventDefault();
    updateSize({xLength, yLength});
  };
  const handleReset = e => {
    e.preventDefault();
    updateSize(defaultSize);
  };
  return (
      <div className='side'>
        <h1>Game play</h1>
        <button type='button' style={{width: '200px'}} onClick={handleReset}>Reset size</button>
        <form onSubmit={handleSubmit}>
          Size:
          <br/>
          <input type='number' name='yLength' value={yLength} onChange={e => setYLength(+e.target.value)}/>
          <br/>
          <input type='number' name='xLength' value={xLength} onChange={e => setXLength(+e.target.value)}/>
          <input type='submit' value='Update'/>
        </form>
        <span style={{color: xIsNext ? 'red' : 'green'}}>Next turn: {xIsNext ? 'X' : 'O'}</span>
        {isEndGame !== null && <h2>{`${xIsNext ? 'O' : 'X'} won`}</h2>}
      </div>
  );
}

export default Side;
