import { useState } from "react";
import Board from "./components/Board";
import History from "./components/History";

function App() {
  const [history, setHistory] = useState<(string[] | null[])[]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext: boolean = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[] | null[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleJumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  return (
    <>
      <div className="container">
        <h1 className="text-slate-700 text-4xl font-bold text-center mt-20">
          TicTacToe App
        </h1>

        <div className="mt-5">
          <div className="flex flex-col items-center gap-3">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <History moves={history} onJumpTo={handleJumpTo} />
        </div>
      </div>
    </>
  );
}

export default App;
