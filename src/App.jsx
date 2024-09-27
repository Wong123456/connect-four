import './App.css';
import {Board} from './Board';
import { useState, useEffect, useContext, createContext } from 'react';

export const BoardContext = createContext(null);

function emptyBoard(){
  return [...Array(7)].map(() => Array(6).fill(""));
}

function Announcement(){
  //anc == announcement
  const [anc, setAnc] = useState("");

  const boardProps = useContext(BoardContext);
  let {moveCount, turn, winner} = boardProps;

  function handleAnc(){
    if (winner == "") {
    return "Turn " + moveCount + ", " + turn + "'s move!";
    }
    else {
      return winner + " won!";
    }
  }

  return <h1>{handleAnc()}</h1>
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

  useEffect(() => {
    if (moveCount >= 7) checkWin();
    console.log(board);
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

  function checkHorizontal() {
    let sameColor = 1;
    for (let r = 0; r < 6; r++) {
      sameColor = 1;
      for (let c = 0; c < 6; c++) {
        board[c][r] != "" && board[c][r] == board[c+1][r] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[c][r]);
          return true;
        }
      }
    }
    return false;
  }

  function checkVertical() {
    let sameColor = 1;
    for (let c = 0; c < 6; c++) {
      sameColor = 1;
      for (let r = 5; r > 0; r--) {
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

    for (let r = 3; r < 6; r++) { // TOP-LEFT SIDE
      sameColor = 1;
      for (let i = 0, j = r; j > 0; i++, j--) {
        board[i][j] != "" && board[i][j] == board[i+1][j-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[i][j]);
          return true;
        }
      }
    }

    for (let c = 1; c < 4; c++) { // BOTTOM-RIGHT SIDE
      sameColor = 1;
      for (let i = c, j = 5; i < 6; i++, j--) {
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

    for (let c = 3; c <= 6; c++) { // BOTTOM-LEFT SIDE
      sameColor = 1;
      for (let i = c, j = 5; i > 0; i--, j--) {
        board[i][j] != "" && board[i][j] == board[i-1][j-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[i][j]);
          return true;
        }
      }
    }

    for (let r = 5; r >= 3; r--) { // TOP-RIGHT SIDE
      sameColor = 1;
      for (let i = 6, j = r; j > 0; i--, j--) {
        board[i][j] != "" && board[i][j] == board[i-1][j-1] ? sameColor++ : sameColor = 1;
        if (sameColor == 4) {
          setWinner(board[i][j]);
          return true;
        }
      }
    }
    
    return false;
  }

  function checkWin() {
    let winStatus = false;
    // Check Horizontal
    winStatus = checkHorizontal();

    // Check Vertical
    winStatus = checkVertical();

    // Check Quadrant I & III Diagonal
    winStatus = checkDiag1();

    // Check Quadrant II & IV Diagonal
    winStatus = checkDiag2();

    return winStatus;
  }

  const boardProps = {
    board: board,
    setBoard: setBoard,
    moveCount: moveCount,
    setMoveCount: setMoveCount,
    turn: moveCount % 2 == 0 ? "Y" : "R",
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