import { useState } from 'react';


export function Square({ value, onClick }) {

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}

export function Board({ times, squares, egg, onPlay }) {

    // const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        // 이미 클릭된 칸이거나 승자가 나왔으면 동작 실행 X 
        if (squares[i] || calculateWinner(squares)) return;

        // 게임상태 사본만들기 
        const nextSquares = squares.slice();

        // 게임상태 업데이트 -> 클릭한 칸 값 넣기 
        nextSquares[i] = egg;

        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + egg;
    }
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </>
    )
}

export function BoardWithTimeTravel() {
    const [times, setTimes] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [egg, setEgg] = useState("O");

    const currentSquares = times[currentMove];

    function changeEgg() {
        if (egg == "O") {
            setEgg("X");
        } else {
            setEgg("O");
        }
    }

    function handleBtnClick(index) {
        setCurrentMove(index);
        // O,X도 그때에 맞춰 변경하기 
        if (index % 2 == 0) { //짝수면 O, 홀수면 X 
            setEgg("O");
        } else { setEgg("X") }

        // //  만약 칸을 클릭한다면 -> 선택한 시기 이후 배열들 제거하기 
        // const newTimes = times.slice(0, index + 1);
        // setTimes(newTimes);

    }

    // 보드에서 칸이 클릭됐을떄 작업해야할 것 (BoardWithTimeTravel에 속한 state를 수정하는 작업 )
    // egg바꾸기, times에 누적하기기
    function handlePlay(nextSquares) {
        const nextTimes = [...times.slice(0, currentMove + 1), nextSquares];
        setTimes(nextTimes);
        setCurrentMove(currentMove + 1);
        changeEgg();
    }

    const movesBtn = times.map((suquares, index) => {
        let description;
        if (index == 0) {
            description = "Go to game Start";
        } else {
            description = `Go to move #${index}`;
        }
        return (
            <li key={index}>
                <button onClick={() => handleBtnClick(index)}>{description}</button>
            </li>
        )
    })

    return (
        <div className='game'>
            <div className='game-board'>
                <Board times={times} squares={currentSquares} egg={egg} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>
                    {movesBtn}
                </ol>
            </div>

        </div>
    )
}

function calculateWinner(squares) {
    // 모든 경우의수를 저장하기 
    const possibleLines = [
        [0, 1, 2],
        [3, 4, 5],
        [5, 6, 7],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let line of possibleLines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;

}