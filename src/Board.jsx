import { useState, useContext, useEffect } from "react";
import { BoardContext } from "./App";

function canMark(col){
    for (let i = 0; i < col.length; i++) {
        if (col[i] !== "") return i - 1;
    }
    return col.length - 1;
}

function Red(){
    return <span className="red"></span>
}

function Yellow(){
    return <span className="yellow"></span>
}

function Cell({colId, row}){
    const boardProps = useContext(BoardContext);
    const {board} = boardProps;    
    const [mark, setMark] = useState("");

    useEffect(() =>{
        if (board[colId][row] == "Red") {setMark(<Red />);}
        if (board[colId][row] == "Yellow") {setMark(<Yellow />);}
        if (board[colId][row] == "") {setMark("");}
    }, [board[colId][row]])

    return <div className="cell">{mark}</div>
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