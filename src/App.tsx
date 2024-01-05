import { useEffect, useState } from "react";
import Board from "./components/Board";
import History from "./components/History";

function App() {
  const [history, setHistory] = useState<(string[] | null[])[]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext: boolean = currentMove % 2 === 0;
  const currentSquares: string[] | null[] =
    history[currentMove] || Array(9).fill(null);

  function handlePlay(nextSquares: string[] | null[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    localStorage.setItem("history", JSON.stringify(nextHistory));
  }

  function handleJumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function clear() {
    localStorage.removeItem("history");
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history") || "[[]]");
    setHistory(savedHistory);
    setCurrentMove(savedHistory.length ? savedHistory.length - 1 : 0);
  }, []);

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
          <div className="text-center mt-5">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={clear}
            >
              Clear
            </button>
          </div>
          <History moves={history} onJumpTo={handleJumpTo} />
        </div>
      </div>
    </>
  );
}

export default App;
