interface HistoryProps {
  moves: (string[] | null[])[];
  onJumpTo: (move: number) => void;
}

export default function History({ moves, onJumpTo }: HistoryProps) {
  return (
    <ol className="mt-5 mx-auto text-center">
      {moves.map((_squares, move) => {
        let description;

        if (move > 0) {
          description = "Go to move #" + move;
        } else {
          description = "Go to start game";
        }

        return (
          <li key={move}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => onJumpTo(move)}
            >
              {description}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
