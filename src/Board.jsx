import { useState, useContext, useEffect } from "react";
import { BoardContext } from "./App";

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
        "default": -700,
        0: -200,
        1: -300,
        2: -400,
        3: -500,
        4: -600,
        5: -700
    }

    const dropTime = margins[row] / margins["default"] * 0.5;
    const bounceTime = margins[row] / margins["default"] * 0.3;
    const drop2Time = dropTime + bounceTime;
    const ratio = margins[row] / margins["default"];


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

    let col = board[colId];

    function addMarkToCol(){
        if (canMark(col) !== -1 && winner == ""){
            let colCopy = structuredClone(col);
            let newBoard = structuredClone(board);

            colCopy[canMark(col)] = turn;
            newBoard[colId] = colCopy;
            
            setBoard(newBoard);
            col = [...colCopy];
            setMoveCount(moveCount+1);
        }
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