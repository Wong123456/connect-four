import { useState, useContext, useEffect } from "react";
import { BoardContext } from "./App";

function canMark(col){
    for (let i = 0; i < col.length; i++) {
        if (col[i] !== "null") return i - 1;
    }
    return col.length - 1;
}

function Cell({colId, row}){
    const boardProps = useContext(BoardContext);
    const {board, turn, incrementTurn, mark} = boardProps;
    return <div className="cell">{colId}, {row}, {mark}</div>;
}

function Col({colId}){
    const boardProps = useContext(BoardContext);
    const {board, turn, incrementTurn, mark} = boardProps;

    const [col, setCol] = useState(board[colId]);

    function updateCol(col){
        setCol([...col]);
    }

    function testCanMark(){
        console.log(canMark(col));
    }

    function addMarkToCol(){
        if (canMark(col) !== -1){
            let colCopy = structuredClone(col);
            colCopy[canMark(col)] = mark;
            updateCol(colCopy);
            console.log(mark);
            incrementTurn();
        }
    }

    useEffect(() =>{
        console.log(col);
    }, [col])

    function addCell(row){
        if (row >= 6) return [];
        return [<Cell colId={colId} row={row}/>, ...addCell(row + 1)];
    }
    return <div className="column" onClick={addMarkToCol}>{addCell(0)}</div>;
}

export function Board() {
    //6rows 7cols
    function addCol(colId){
        if (colId >= 7) return [];
        return [<Col colId={colId}/>, ...addCol(colId + 1)];
    }
    return <div className="board">{addCol(0)}</div>
}