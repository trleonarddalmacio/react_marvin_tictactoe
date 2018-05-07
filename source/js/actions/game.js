export const GET_GAME_START = 'GET_GAME_START';
export const GET_GAME_ERROR = 'GET_GAME_ERROR';
export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS';
export const CALCULATE_WINNER = 'CALCULATE_WINNER';


export function getGame() {
  return {
    type: GET_GAME_START,
  };
}

export function calculateWinner() {
  
}

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }