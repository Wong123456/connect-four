import './App.css';
import {Board} from './Board';
import { useState, createContext } from 'react';

export const BoardContext = createContext(null);

function emptyBoard(){
  return [...Array(7)].map(() => Array(6).fill("null"));
}

function App() {
  const [board, setBoard] = useState(emptyBoard());

  const boardProps = {
    board: board,
  }

  return (
    <div className="App">
      <BoardContext.Provider value={boardProps}>
        <Board/>
      </BoardContext.Provider>
      {console.log(board)}
    </div>
  );
}

export default App;
