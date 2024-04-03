import { useEffect, useState } from "react";
import Board from "./components/Board";
import History from "./components/History";
import { Tictactoe } from "./types/Tictactoe";

function App() {
  const [tictactoe, setTictactoe] = useState<Tictactoe>({
    history: [Array(9).fill(null)],
    currentSquares: Array(9).fill(null),
    currentMove: 0,
    isDescOrdered: false,
  });

  const xIsNext: boolean = tictactoe.currentMove % 2 === 0;

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [
      ...tictactoe.history.slice(0, tictactoe.currentMove + 1),
      nextSquares,
    ];

    setTictactoe((prevState) => ({
      ...prevState,
      history: nextHistory,
      currentMove: nextHistory.length - 1,
      currentSquares: nextSquares,
    }));

    localStorage.setItem("history", JSON.stringify(nextHistory));
  }

  function handleJumpTo(nextMove: number) {
    setTictactoe((prevState) => ({
      ...prevState,
      currentMove: nextMove,
      currentSquares: prevState.history[nextMove],
    }));
  }

  function clear() {
    setTictactoe({
      history: [Array(9).fill(null)],
      currentSquares: Array(9).fill(null),
      currentMove: 0,
      isDescOrdered: false,
    });

    localStorage.removeItem("history");
  }

  const handleSorting = () => {
    setTictactoe((prevState) => ({
      ...prevState,
      isDescOrdered: !prevState.isDescOrdered,
    }));
  };

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("history") ||
        "[[null, null, null, null, null, null, null, null, null]]",
    );

    setTictactoe((prevState) => ({
      ...prevState,
      history: savedHistory,
      currentMove: savedHistory.length ? savedHistory.length - 1 : 0,
    }));
  }, []);

  return (
    <>
      <div className="container my-12">
        <h1 className="text-slate-700 text-4xl font-bold text-center">
          TicTacToe App
        </h1>

        <div className="mt-5">
          <div className="flex flex-col items-center gap-3">
            <Board
              xIsNext={xIsNext}
              squares={tictactoe.currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="text-center mt-5">
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              onClick={clear}
            >
              Clear
            </button>
            <button
              type="button"
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
              onClick={handleSorting}
            >
              {tictactoe.isDescOrdered ? "Asc" : "Desc"}
            </button>
          </div>
          <History
            moves={tictactoe.history}
            onJumpTo={handleJumpTo}
            currentMove={tictactoe.currentMove}
            isDescOrdered={tictactoe.isDescOrdered}
          />
        </div>
      </div>
    </>
  );
}

export default App;
