import './App.css';
import {Board} from './Board';
import { useState, createContext } from 'react';

export const BoardContext = createContext(null);



function emptyBoard(){
  return [...Array(7)].map(() => Array(6).fill(""));
}

function App() {
  const [board, setBoard] = useState(emptyBoard());

  const addMoveCount = (function() { // Closure Function
    let moveCount = 0;
    return function() {
        moveCount++;
        console.log(moveCount);
        if (moveCount >= 7) checkWin();
        return moveCount;
    }
  })();
  
  function checkWin() {
    // Check Horizontal

    // Check Vertical

    // Check Quadrant I & III Diagonal

    // Check Quadrant II & IV Diagonal
  }

  const boardProps = {
    board: board,
    addMoveCount: addMoveCount
  }

  return (
    <div className="App">
      <BoardContext.Provider value={boardProps}>
        <Board/>
      </BoardContext.Provider>
    </div>
  );
}

export default App;
