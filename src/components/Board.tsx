import calculateWinner from "../utils/calculateWinner";
import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: string[] | null[];
  onPlay: (nextSquares: string[] | null[]) => void;
}

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "0";
    }
    onPlay(nextSquares);
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
      <div>
        <p className="text-center">{status}</p>
      </div>
      <div className="border-collapse flex flex-col gap-y-3">
        {[...Array(3)].map((_row, i) => (
          <div key={i}>
            {[...Array(3)].map((_col, j) => (
              <Square
                key={j}
                value={squares[i * 3 + j]}
                onSquareClick={() => handleClick(i * 3 + j)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
