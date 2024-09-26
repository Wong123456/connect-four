import './App.css';
import {Board} from './Board';
import { useState, useContext, createContext } from 'react';

export const BoardContext = createContext(null);

function emptyBoard(){
  return [...Array(7)].map(() => Array(6).fill(""));
}

function Announcement() {
  const boardProps = useContext(BoardContext);
  let {turn} = boardProps;
  return (
    <h1>It is now {turn}'s turn!</h1>
  );
}

function App() {
  const [board, setBoard] = useState(emptyBoard());
  const [moveCount, setMoveCount] = useState(0);

  if (moveCount >= 7) checkWin();
  
  function checkWin() {
    // Check Horizontal

    // Check Vertical

    // Check Quadrant I & III Diagonal

    // Check Quadrant II & IV Diagonal
  }

  const boardProps = {
    board: board,
    moveCount: moveCount,
    setMoveCount: setMoveCount,
    turn: moveCount % 2 == 0 ? "Y" : "R"
  };

  return (
    <div className="App">
      
      <BoardContext.Provider value={boardProps}>
        <Announcement />
        <Board/>
      </BoardContext.Provider>
    </div>
  );
}

export default App;
