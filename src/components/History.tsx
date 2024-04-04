interface HistoryProps {
  moves: string[][];
  onJumpTo: (move: number) => void;
  currentMove: number;
  isDescOrdered: boolean;
}

export default function History({
  moves,
  onJumpTo,
  currentMove,
  isDescOrdered,
}: HistoryProps) {
  const elements = [];

  const startMove = isDescOrdered ? moves.length - 1 : 0;
  const endMove = isDescOrdered ? -1 : moves.length;
  const increment = isDescOrdered ? -1 : 1;

  for (let move = startMove; move !== endMove; move += increment) {
    let message = `Move #${move}`;
    if (move === 0) {
      message = `Go to game start`;
    } else if (move === currentMove) {
      message = `You are at move #${move}`;
    } else if (move > 0) {
      message = `Go to move #${move}`;
    }

    elements.push(
      <li key={move} className={`${move === 0 ? "col-span-3" : ""}`}>
        <button
          type="button"
          className={`text-white ${
            move === currentMove ? "bg-blue-800" : "bg-blue-700"
          } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          onClick={() => onJumpTo(move)}
        >
          {message}
        </button>
      </li>,
    );
  }

  return (
    <ol
      className="mx-auto w-96 text-center grid grid-cols-3 gap-1 mt-8"
      data-testid="history"
    >
      {elements}
    </ol>
  );
}
