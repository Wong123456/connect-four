import './App.css';
import {Board} from './Board';
import { useEffect, useState, createContext, useContext } from 'react';

export const BoardContext = createContext(null);

function emptyBoard(){
  return [...Array(7)].map(() => Array(6).fill("null"));
}

//return whose turn by calculating turn
// turn starts from yellow
function getMarkFromTurn(turn){
  if (turn % 2 == 0) {return "red";}
  return "yellow";
}

function App() {
  const [board, setBoard] = useState(emptyBoard());
  const [turn, setTurn] = useState(1);
  const [mark, setMark] = useState("");

  const boardProps = {
    board: board,
    turn: turn,
    incrementTurn: incrementTurn,
    mark: mark,
  }

  function incrementTurn(){
    setTurn(turn + 1);
  }

  useEffect(() =>{
    setMark(getMarkFromTurn(turn));
  }, [turn])

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


function Announcement(){
  //anc == announcement
  const [anc, setAnc] = useState("");

  const boardProps = useContext(BoardContext);
  let {turn, mark} = boardProps;

  function handleAnc(){
    return "Turn " + turn + ", " + mark + "'s turn!";
  }

  return <h1>{handleAnc()}</h1>
}