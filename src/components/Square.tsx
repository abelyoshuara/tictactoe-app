interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="px-5 leading-3 py-4 w-20 h-14 text-2xl border text-center shadow-sm"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
