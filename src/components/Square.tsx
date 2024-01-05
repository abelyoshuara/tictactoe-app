interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinner: boolean;
}

export default function Square({
  value,
  onSquareClick,
  isWinner,
}: SquareProps) {
  return (
    <button
      className={`px-5 leading-3 py-4 w-20 h-14 text-2xl border border-slate-400 text-center shadow-sm ${
        isWinner ? "bg-green-100" : ""
      }`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
