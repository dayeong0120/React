import { useState } from "react";

export function Square({ onSquareClick, value }) {
    return (
        <button onClick={onSquareClick} className="square">{value}</button>
    );
}

export function Board({ saveHistory, squares }) {
    // const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    let status = "Next Player is: " + (xIsNext ? "X" : "O");
    const winner = checkWinner(squares);
    if (winner) {
        status = "Winner : " + winner;
    }

    function handleSquareClick(i) {
        // 해당 위치에 이미 값이 존재하면 아무 동작안하도록
        if (squares[i] !== null || checkWinner(squares)) {
            return;
        }

        const newSquares = squares.slice();
        //xIsNext의 값에 따라 Square에 추가할 값 결정
        // 해당 인덱스의 버튼에 값 추가 
        if (xIsNext) {
            newSquares[i] = "X";
        } else {
            newSquares[i] = "O";
        }

        // saveHistory로 history에 현재 상태 배열 저장하기 
        saveHistory(newSquares);

        // 값 변경 (X, O)
        setXIsNext(!xIsNext);
    }

    const squaresDisplay = Array(3).fill(null).map((v, row) => {
        const roop2 = Array(3).fill(null).map((v2, col) => {
            const nowIndex = col + (row * 3);
            return (
                <Square onSquareClick={() => handleSquareClick(nowIndex)} value={squares[nowIndex]} />
            )
        })
        return (
            <div className="board-row">
                {roop2}
            </div>
        )
    })
    return (
        <>
            <div>
                <p>{status}</p>
            </div>
            {squaresDisplay}
        </>
    )
}

export function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [order, setOrder] = useState(0);
    const [currSquares, setCurrSquares] = useState(Array(9).fill(null));
    console.log(history);

    // 버튼 눌릴때마다 squares가 추가됨 
    // squares는 지난 squares를 기반으로 값을 수정한 후 history에 저장된다 
    // 자식컴포넌트에게 이 메소드를 보내주고, 자식에서 파라미터를 전달하며 이 함수를 호출하면 됨 
    function saveHistory(squares) {
        const newHistory = [...history.slice(0, order + 1), squares] // history를 개별적인 요소로분리 
        setHistory(newHistory);
        setOrder(order + 1);
        setCurrSquares(squares);
    }

    const mapBtn = history.map((squares, index) => {
        let description;
        if (index == 0) {
            description = "Go to game start";
        } else if (index == (history.length - 1)) {
            description = `당신은 지금 ${index}번째 순서에 있습니다`;
        } else {
            description = `Go back #${index}`;
        }
        return (
            <li key={index}>
                <button onClick={() => handleHisBtn(index)}>{description}</button>
            </li>
        )
    });

    function handleHisBtn(index) {
        setOrder(index);
        setCurrSquares(history[index]);
    }

    return (
        <div className="game">
            <div className='game-board'>
                <Board saveHistory={saveHistory} squares={currSquares} />
            </div>
            <div className="game-info">
                {mapBtn}
            </div>
        </div>
    )
}


function checkWinner(squares) {
    const possible = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let line of possible) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}