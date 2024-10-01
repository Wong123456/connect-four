import { useState, useContext, useEffect, useCallback } from "react";
import { BoardContext } from "./App";

let ratio = 1;

// throttling function => reject a function call if interval is 
// smaller than delay defined
const throttle = (fn, delay) => {
    let lastTime = 0; //closure function, so lastTime will be remembered
    return (...args) => {
        let now = new Date().getTime();
        console.log("Now: " + now);
        console.log("Last Time: " + lastTime);
        // calculate the interval, if smaller than delay, do nothing
        if (now - lastTime < delay) {console.log("not called"); return;}
        lastTime = now;
        // call the function and pass the arguments if any
        fn(...args);
    };
};

function canMark(col){
    for (let i = 0; i < col.length; i++) {
        if (col[i] !== "") return i - 1;
    }
    return col.length - 1;
}

function Cell({colId, row}){
    const boardProps = useContext(BoardContext);
    const {board} = boardProps;    
    const [mark, setMark] = useState("");

    const margins = {
        "default": -600,
        0: -100,
        1: -200,
        2: -300,
        3: -400,
        4: -500,
        5: -600
    }

    ratio = margins[row] / margins["default"];

    document.documentElement.style.setProperty('--start-margin', margins[row])
 
    useEffect(() =>{
        if (board[colId][row] == "Red") {setMark("red");}
        if (board[colId][row] == "Yellow") {setMark("yellow");}
        if (board[colId][row] == "") {setMark("");}
    }, [board[colId][row]])

    return <div className="cell"><div className={mark} style={
        {'--start-margin': margins[row] + "px", '--ratio': ratio,
        }}></div></div>
}

function Col({colId}){
    const boardProps = useContext(BoardContext);
    const {board, setBoard, moveCount, setMoveCount, turn, winner} = boardProps;
    const [lastTime, setLastTime] = useState(0);

    let col = board[colId];

    function addMarkToCol(){
        console.log(ratio);
        let now = new Date().getTime();
        if (now - lastTime < 950 * ratio + 100) return;
        if (canMark(col) !== -1 && winner == ""){
            let colCopy = structuredClone(col);
            let newBoard = structuredClone(board);

            colCopy[canMark(col)] = turn;
            newBoard[colId] = colCopy;
            
            setBoard(newBoard);
            col = [...colCopy];
            setMoveCount(moveCount+1);
        }
        setLastTime(now);
    }

    function addCell(row){
        if (row >= board[0].length) return [];
        return [<Cell colId={colId} row={row}/>, ...addCell(row + 1)];
    }

    return (
        <div className="column" onClick={addMarkToCol}>
            {addCell(0)}
        </div>
    );
}

export function Board() {
    const boardProps = useContext(BoardContext);
    const {board} = boardProps;
    // 6 Rows, 7 Columns
    function addCol(colId){
        if (colId >= board.length) return [];
        return [<Col colId={colId}/>, ...addCol(colId + 1)];
    }
    return <div className="board">{addCol(0)}</div>
}