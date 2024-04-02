interface HistoryProps {
  moves: (string[] | null[])[];
  onJumpTo: (move: number) => void;
  currentMove: number;
}

export default function History({
  moves,
  onJumpTo,
  currentMove,
}: HistoryProps) {
  return (
    <ol className="mx-auto text-center">
      {moves.map((_squares, move) => {
        let message: string = "";
        if (move === currentMove) {
          message = `You are at move #${move}`;
        } else if (move > 0) {
          message = `Go to move #${move}`;
        } else {
          message = `Go to game start`;
        }

        return (
          <li key={move}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => onJumpTo(move)}
            >
              {message}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
