import { useState } from 'react';


export function Square({ value, onClick }) {

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}

export function Board({ times, setTimes, squares, setSquares, egg, setEgg }) {


    function changeEgg() {
        if (egg == "O") {
            setEgg("X");
        } else {
            setEgg("O");
        }
    }

    function handleClick(i) {
        // 이미 클릭된 칸이거나 승자가 나왔으면 동작 실행 X 
        if (squares[i] || calculateWinner(squares)) return;

        // 게임상태 사본만들기 
        const nextSquares = squares.slice();

        // 게임상태 업데이트 -> 클릭한 칸 값 넣기 
        nextSquares[i] = egg;
        setSquares(nextSquares);

        // times에 이후 기록이 있다면 삭제하기기
        // 일단 squares의 null이아닌값 개수나 세자 

        // 기록배열에 현재 게임상태 추가하기 
        times.push(nextSquares);
        setTimes(times);

        // O,X 변경하기 
        changeEgg();
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
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [times, setTimes] = useState([squares]);
    const [egg, setEgg] = useState("O");

    for (let i = 0; i < times.length; i++) {
        console.log(`타임스의 ${i}번째 요소 : [${times[i]}]`);
    }

    function handleBtnClick(index) {
        console.log("squares" + squares);
        setSquares(times[index]);

        // O,X도 그때에 맞춰 변경하기 
        if (index % 2 == 0) { //짝수면 O, 홀수면 X 
            setEgg("O");
        } else { setEgg("X") }

        // //  만약 칸을 클릭한다면 -> 선택한 시기 이후 배열들 제거하기 
        // const newTimes = times.slice(0, index + 1);
        // setTimes(newTimes);

    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board times={times} setTimes={setTimes} squares={squares} setSquares={setSquares}
                    egg={egg} setEgg={setEgg} />
            </div>
            <div className="game-info">
                {times.map((time, index) => {
                    if (index == 0) {
                        return <button key={index} onClick={() => handleBtnClick(index)}>Go to game start</button>
                    }
                    return <button key={index} onClick={() => handleBtnClick(index)}>Go to mive #{index}</button>
                }
                )}
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