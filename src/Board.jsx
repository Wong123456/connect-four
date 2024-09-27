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

    return <div className="cell">{board[colId][row]}</div>;
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
        if (row >= 6) return [];
        return [<Cell colId={colId} row={row}/>, ...addCell(row + 1)];
    }

    return (
        <div className="column" onClick={addMarkToCol}>
            {addCell(0)}
        </div>
    );
}

export function Board() {
    // 6 Rows, 7 Columns
    function addCol(colId){
        if (colId >= 7) return [];
        return [<Col colId={colId}/>, ...addCol(colId + 1)];
    }
    return <div className="board">{addCol(0)}</div>
}