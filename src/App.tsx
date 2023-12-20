import { useState } from "react";
import Board from "./components/Board";
import Square from "./components/Square";
import calculateWinner from "./utils/calculateWinner";

function App() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "0";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner: string | null = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "x" : "o"}`;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-slate-700 text-4xl font-bold text-center mt-20">
          TicTacToe App
        </h1>

        <p className="text-center my-5">{status}</p>

        <div className="border-collapse flex flex-col gap-y-3">
          {[...Array(3)].map((_row, i) => (
            <Board key={i}>
              {[...Array(3)].map((_col, j) => (
                <Square
                  key={j}
                  value={squares[i * 3 + j]}
                  onSquareClick={() => handleClick(i * 3 + j)}
                />
              ))}
            </Board>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
