import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState("A");

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let y = 0; y < nrows; y++){
      let columns = [];
      for(let x = 0; x < ncols; x++){
        const cellLit = chanceLightStartsOn ? Boolean(Math.round(Math.random())) : false;
        columns.push(cellLit);
      }
      initialBoard.push(columns);
    }
    return initialBoard;
  }

  function hasWon(){
    // TODO: check the board in state to determine whether the player has won.
    let hasWon = false;
    for(let y = 0; y < nrows; y++){
      for(let x = 0; x < ncols; x++){
        if(board[y][x] == true){
          hasWon = true;
        }
      }
    }
    return hasWon;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      
      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.slice();

      // TODO: in the copy, flip this cell and the cells around it
      // cell clicked
      flipCell(y, x, boardCopy);
      // cells on top botton right left
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      // change current player
      setPlayer(player === "A" ? "B" : "A");

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
  if(!hasWon()){
    alert(`Player ${player} is the winner...!!!`);
  }

  // make table board
  // TODO
  let rowsBoard = [];
  for(let i = 0; i < board.length; i++){
    const renderRow = board[i].map((column, idx) => {
      return <Cell flipCellsAroundMe={flipCellsAround} isLit={column} coord={ `${i}-${idx}` } />
    });
    rowsBoard.push(<tr>{ renderRow }</tr>);
  }

  return (
    <div className="Board">
      <table>
        <tbody>
          { rowsBoard }
        </tbody>
      </table>
    </div>
  );
}

Board.defaultProps = {
  nrows: 3, 
  ncols: 3, 
  chanceLightStartsOn: true
};

export default Board;
