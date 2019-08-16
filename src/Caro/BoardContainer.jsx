import React from 'react';
import './index.css';
import Board from './Board';
import IO from 'socket.io-client';
const socket = IO('172.16.1.170:2019');

const initSteps = (xLength, yLength) => {
  const steps = [];
  for (let i = 0; i < xLength; i++) {
    steps.push(Array(yLength).fill(null));
  }
  return steps;
};

class BoardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      steps: initSteps(props.xLength, props.yLength),
      lastStep: {
        i: -1,
        j: -1
      }
    };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.isEndGame = this.isEndGame.bind(this);
    this.isEndDiagonal = this.isEndDiagonal.bind(this);
    this.isEndHorizontal = this.isEndHorizontal.bind(this);
    this.isEndVertical = this.isEndVertical.bind(this);
  }
  componentDidUpdate(prevProps) {
    const {xLength, yLength} = this.props;
    if (prevProps.xLength !== xLength || prevProps.yLength !== yLength) {
      this.setState({
        steps: initSteps(xLength, yLength),
        lastStep: {i: -1, j: -1}
      });
    }
  }

  isEndGame(i, j) {
    return this.isEndHorizontal(i, j) || this.isEndVertical(i, j) || this.isEndDiagonal(i, j);
  }

  isEndHorizontal(i, j) {
    let {steps} = this.state;
    const {xIsNext} = this.props;
    let count = 1;

    let y = j - 1;
    // Count to left
    while (steps[i][y] === xIsNext) {
      count++;
      y--;
    }

    y = j + 1;
    //Count to right
    while (steps[i][y] === xIsNext) {
      count++;
      y++;
    }

    return count > 4;
  }
  isEndVertical(i, j) {
    let {steps} = this.state;
    const {xIsNext} = this.props;
    let count = 1;

    let x = i - 1;
    // Count up
    while (steps[x] && steps[x][j] === xIsNext) {
      count++;
      x--;
    }

    x = i + 1;
    //Count up
    while (steps[x] && steps[x][j] === xIsNext) {
      count++;
      x++;
    }

    return count > 4;
  }
  isEndDiagonal(i, j) {
    let {steps} = this.state;
    const {xIsNext} = this.props;
    let count = 1;

    let x = i - 1;
    let y = j - 1;
    // \\
    while (steps[x] && steps[x][y] === xIsNext) {
      count++;
      x--;
      y--;
    }

    x = i + 1;
    y = j + 1;
    // \\
    while (steps[x] && steps[x][y] === xIsNext) {
      count++;
      x++;
      y++;
    }

    if (count > 4) {
      return true;
    }

    count = 1;

    x = i - 1;
    y = j + 1;
    // \\
    while (steps[x] && steps[x][y] === xIsNext) {
      count++;
      x--;
      y++;
    }

    x = i + 1;
    y = j - 1;
    // \\
    while (steps[x] && steps[x][y] === xIsNext) {
      count++;
      x++;
      y--;
    }

    return count > 4;
  }

  handleCellClick (i, j) {
    return (e) => {
      e.preventDefault();
      if (this.state.steps[i][j] !== null) {
        return;
      }
      socket.emit('MOVE', ({i, j}));
    }
  };

  componentDidMount() {
    socket.on('MOVE', ({i, j}) => {
      this.setState((state, props) => {
        let {steps} = state;
        steps[i][j] = props.xIsNext;
        return {
          ...steps,
          lastStep: {
            i,j
          }
        }
      });
      if(this.isEndGame(i, j)) {
        this.props.setIsEndGame();
      }
      this.props.toggleXIsNext();
    });
  }

  componentWillUnmount() {
    socket.off('MOVE');
    socket.disconnect();
  }

  render() {
    return (
        <div className='board-container' style={{pointerEvents: this.props.isEndGame !== null ? 'none' : 'auto'}}>
          <Board steps={this.state.steps} lastStep={this.state.lastStep} onCellClick={this.handleCellClick}/>
        </div>
    );
  }
}

export default BoardContainer;