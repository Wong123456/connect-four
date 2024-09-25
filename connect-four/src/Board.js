import { useState, useContext, useEffect } from "react";
import { BoardContext } from "./App";

function canMark(col){
    for (let i = 0; i < col.length; i++) {
        if (col[i] !== "null") return i - 1;
    }
    return col.length - 1;
}

function Cell({colId, row}){
    return <div className="cell">{colId}, {row}</div>;
}

function Col({colId}){
    const boardProps = useContext(BoardContext);
    const {board} = boardProps;
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
            colCopy[canMark(col)] = "marked";
            updateCol(colCopy);
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