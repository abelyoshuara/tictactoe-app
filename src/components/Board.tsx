import { ReactNode } from "react";

interface BoardProps {
  children: ReactNode;
}

export default function Board({ children }: BoardProps) {
  return (
    <>
      <div className="flex justify-center gap-3">{children}</div>
    </>
  );
}
