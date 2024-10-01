import './App.css';
import {Board} from './Board';
import { useState, useEffect, useContext, createContext } from 'react';

export const BoardContext = createContext(null);

function emptyBoard(col = 7, row = 6){
  return [...Array(col)].map(() => Array(row).fill(""));
}

function Announcement(){
  //anc == announcement

  const boardProps = useContext(BoardContext);
  let {moveCount, turn, winner} = boardProps;

  
function handleAnc(){
  let returnStr = winner + " won!";
  if (winner == "") returnStr = `Turn ${moveCount} ,   ${turn}'s move!`;
  if (moveCount == 43) returnStr = `Board filled, there is no winner!`;
  return returnStr
  }

  return <h1 className="anc">{handleAnc()}</h1>
}

function RestartButton(){
  const props = useContext(BoardContext);
  let {newGame, setNewGame} = props;

  function restart() {
      setNewGame(true);
  }

  return <button onClick={restart}>Restart</button>
}

function App() {
  const [board, setBoard] = useState(emptyBoard());
  const [winner, setWinner] = useState("");
  const [moveCount, setMoveCount] = useState(1);
  const [newGame, setNewGame] = useState(false);

  const width = board.length, height = board[0].length; // Col, Row

  useEffect(() => { // Check Win every move if the move is at least 7.
    if (moveCount >= 7) checkHorizontal() || checkVertical() || checkDiag1() || checkDiag2();
  }, [board])
  
  useEffect(() => {
    if (winner) winner == "Y" ? console.log("Yellow") : console.log("Red");
  }, [winner])

  if (newGame) {
    setBoard(emptyBoard());
    setWinner("");
    setMoveCount(1);
    setNewGame(false);
  }

  if (newGame) {
    setBoard(emptyBoard());
    setWinner("");
    setMoveCount(1);
    setNewGame(false);
  }

  function checkHorizontal() { // Check Horizontal Columns
    let sameColor = 1;
    for (let r = 0; r < height; r++) {
      sameColor = 1;
      for (let c = 0; c < width-1; c++) {
        board[c][r] != "" && board[c][r] == board[c+1][r] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[c][r]);
          return true;
        }
      }
    }
    return false;
  }

  function checkVertical() { // Check Vertical Columns
    let sameColor = 1;
    for (let c = 0; c < width; c++) {
      sameColor = 1;
      for (let r = height-1; r > 0; r--) {
        board[c][r] != "" && board[c][r] == board[c][r-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[c][r]);
          return true;
        }
      }
    }
    return false;
  }

  function checkDiag1() { // Quadrant I & Quadrant III
    let sameColor = 1;

    for (let r = 3; r < height; r++) { // TOP-LEFT SIDE
      sameColor = 1;
      for (let i = 0, j = r; i < width-1 && j > 0; i++, j--) {
        board[i][j] != "" && board[i][j] == board[i+1][j-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[i][j]);
          return true;
        }
      }
    }

    for (let c = 1; c < width-3; c++) { // BOTTOM-RIGHT SIDE
      sameColor = 1;
      for (let i = c, j = height-1; i < width-1 && j > 0; i++, j--) {
        board[i][j] != "" && board[i][j] == board[i+1][j-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[i][j]);
          return true;
        }
      }
    }
    
    return false;
  }

  function checkDiag2() { // Quadrant II & Quadrant IV
    let sameColor = 1;

    for (let c = 3; c < width; c++) { // BOTTOM-LEFT SIDE
      sameColor = 1;
      for (let i = c, j = height-1; i > 0 && j > 0; i--, j--) {
        board[i][j] != "" && board[i][j] == board[i-1][j-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
           setWinner(board[i][j]);
          return true;
        }
      }
    }

    for (let r = height-1; r >= 3; r--) { // TOP-RIGHT SIDE
      sameColor = 1;
      for (let i = width-1, j = r; i > 0 && j > 0; i--, j--) {
        board[i][j] != "" && board[i][j] == board[i-1][j-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[i][j]);
          return true;
        }
      }
    }
    
    return false;
  }

  const boardProps = {
    board: board,
    setBoard: setBoard,
    moveCount: moveCount,
    setMoveCount: setMoveCount,
    turn: moveCount % 2 == 0 ? "Yellow" : "Red",
    winner: winner,
    newGame: newGame,
    setNewGame: setNewGame,
  };

  return (
    <div className="App">
      <BoardContext.Provider value={boardProps}>
        <Announcement />
        <Board />
        <RestartButton />
      </BoardContext.Provider>
    </div>
  );
}

export default App;