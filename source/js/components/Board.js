import React, { Component } from 'react';
import { Square } from './Square';

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquareRow(rowCount, noOfColoumn) { 
    const boardRow = [];
    for (let x = 0; x < noOfColoumn; x++) {
      boardRow.push(this.renderSquare((rowCount * noOfColoumn) + x));
    }

    const toSend = [];
    toSend.push(
      <div className='board-row'>
        {boardRow}
      </div>
    )
    return toSend;
  }

  render() {

    const that = this;

    const board = [];

    for (let y = 0; y < 6; y++) {
      board.push(this.renderSquareRow(y, 6));
    }

    // const boardRow = (
    //   <div className="board-row">{ this.props.squares.map(index  => {
    //       return (
    //         this.renderSquare(index)
    //       );
    //     })
    //   }
    //   </div>
    // );

    const trialBoard = [];
    trialBoard.push(this.renderSquare(0));
    trialBoard.push(this.renderSquare(1));
    trialBoard.push(this.renderSquare(2));

    return (
      <div>
        {board}
      </div>
    );
  }
}

export { Board };
