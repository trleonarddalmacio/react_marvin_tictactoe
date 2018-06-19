import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Board } from './../components/Board';

@connect(state => ({
  error: state.people.get('error'),
  loading: state.people.get('loading'),
  people: state.people.get('people'),
}))

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(256).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      xScore: 0,
      yScore: 0,
      dimension: 16,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log(i);

    if (squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    if (this.state.xIsNext) {
      console.log(this.state.dimension);
      const newScore = checkMatch(squares, i, this.state.dimension, this.state.xScore, this.state.xIsNext);
      this.setState({
        xScore: newScore,
      });
    } else {
      const newScore = checkMatch(squares, i, this.state.dimension, this.state.yScore, this.state.xIsNext);
      this.setState({
        yScore: newScore,
      });
    }  

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(this.state.xScore, this.state.yScore, this.state.stepNumber, this.state.dimension);


    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        {winner}
        <div className="game-scores">
          <span><strong>X:</strong> {this.state.xScore} || </span>
          <span><strong>Y:</strong> {this.state.yScore}</span>
        </div>
        <div className="game-board">
          <Board
            dimension={ this.state.dimension }
            squares={ current.squares }
            onClick={ i => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(xScore, yScore, stepNumber, dimension) {
  if (stepNumber === dimension * dimension) {
    let won = '';
    if (xScore > yScore) {
      won = 'X won!';
    } else if (xScore < yScore) {
      won = 'Y won!';
    } else {
      won = 'Its a tie!';
    }
    return (
      <div>
        {won}
      </div>
    );
  }
  return null;
}

function checkMatch(squares, pointer, xbx, score, isX) {
  let up = false;
  let upRight = false;
  let right = false;
  let downRight = false;
  let down = false;
  let downLeft = false;
  let left = false;
  let upLeft = false;
  let vertical = false;
  let horizontal = false;
  let backSlash = false;
  let forwardSlash = false;
  let newScore = score;

  if (isX) {
    while (!up || !upRight || !right || !downRight || !down || !downLeft || !left || !upLeft) {
      switch (false) {
        case up:
          if (pointer - (xbx * 2) >= 0) {
            if (squares[pointer - (xbx * 2)] === 'X') {
              if (squares[pointer - xbx] === 'O') {
                newScore++;
              }
            }
          }
          up = true;
          break;
        case upRight:
          if (pointer - (xbx * 2) >= 0) {
            if ((pointer % xbx) + 2 < xbx) {
              if (squares[pointer - ((xbx - 1) * 2)] === 'X') {
                if (squares[pointer - (xbx - 1)] === 'O') {
                  newScore++;
                }
              }
            }
          }
          upRight = true;
          break;
        case right:
          if ((pointer % xbx) + 2 < xbx) {
            if (squares[pointer + 2] === 'X') {
              if (squares[pointer + 1] === 'O') {x
                newScore++;
              }
            }
          }
          right = true;
          break;
        case downRight:
          if (pointer + (xbx * 2) < xbx * xbx) { // if it would exceed below the array
            if ((pointer % xbx) + 2 < xbx) {
              if (squares[pointer + ((xbx + 1) * 2)] === 'X') {
                if (squares[pointer + (xbx + 1)] === 'O') {
                  newScore++;
                }
              }
            }
          }
          downRight = true;
          break;
        case down:
          if (pointer + (xbx * 2) < xbx * xbx) {
            if (squares[pointer + (xbx * 2)] === 'X') {
              if (squares[pointer + xbx] === 'O') {
                newScore++;
              }
            }
          }
          down = true;
          break;
        case downLeft:
          if (pointer + (xbx * 2) < xbx * xbx) {
            if ((pointer % xbx) - 2 >= 0) {
              if (squares[pointer + ((xbx - 1) * 2)] === 'X') {
                if (squares[pointer + (xbx - 1)] === 'O') {
                  newScore++;
                }
              }
            }
          }
          downLeft = true;
          break;
        case left:
          if ((pointer % xbx) - 2 >= 0) {
            if (squares[pointer - 2] === 'X') {
              if (squares[pointer - 1] === 'O') {
                newScore++;
              }
            }
          }
          left = true;
          break;
        case upLeft:
          if (pointer - (xbx * 2) >= 0) {
            if ((pointer % xbx) - 2 >= 0) {
              if (squares[pointer - ((xbx + 1) * 2)] === 'X') {
                if (squares[pointer - (xbx + 1)] === 'O') {
                  newScore++;
                }
              }
            }
          }
          upLeft = true;
          break;
        default:
          break;
      }
    }
  }
  else if (!isX) {
    while (!vertical || !horizontal || !forwardSlash || !backSlash) {
      switch (false) {
        case vertical:
          if (pointer - xbx >= 0) {
            if (pointer + xbx < xbx * xbx) {
              if (squares[pointer - xbx] === 'X') {
                if (squares[pointer + xbx] === 'X') {
                  newScore++;
                }
              }
            }
          }
          vertical = true;
          break;
        case horizontal:
          if ((pointer % xbx) - 1 >= 0) {
            if ((pointer % xbx) < xbx) {
              if (squares[pointer - 1] === 'X') {
                if (squares[pointer + 1] === 'X') {
                  newScore++;
                }
              }
            }
          }
          horizontal = true;
          break;
        case backSlash:
          if (pointer - xbx >= 0) { // Up?
            if (pointer + xbx < xbx * xbx) { // down ?
              if ((pointer % xbx) - 1 >= 0) { // left?
                if ((pointer % xbx) < xbx) { // right ?
                  if (squares[(pointer - xbx) + 1] === 'X' && squares[pointer + (xbx - 1)] === 'X') {
                    newScore++;
                  }
                }
              }
            }
          }
          backSlash = true;
          break;
        case forwardSlash:
          if (pointer - xbx >= 0) { // Up?
            if (pointer + xbx < xbx * xbx) { // down ?
              if ((pointer % xbx) - 1 >= 0) { // left?
                if ((pointer % xbx) < xbx) { // right ?
                  if (squares[(pointer - xbx) - 1] === 'X' && squares[pointer + (xbx + 1)] === 'X') {
                    newScore++;
                  }
                }
              }
            }
          }
          forwardSlash = true;
          break;
        default:
          break;
      }
    }
  }
  return newScore;
}