import type { Tictactoe } from "../types/Tictactoe";

export type Action =
  | { type: "PLAY"; payload: { nextSquares: string[] } }
  | { type: "JUMP_TO"; payload: { nextMove: number } }
  | { type: "CLEAR" }
  | { type: "SORT" }
  | { type: "SYNCHRONIZE"; payload: { savedHistory: string[][] } };

const initialTictactoe: Tictactoe = {
  history: [Array(9).fill(null)],
  currentSquares: Array(9).fill(null),
  currentMove: 0,
  isDescOrdered: false,
};

function tictactoeReducer(tictactoe: Tictactoe, action: Action) {
  switch (action.type) {
    case "PLAY": {
      const nextHistory = [
        ...tictactoe.history.slice(0, tictactoe.currentMove + 1),
        action.payload.nextSquares,
      ];

      localStorage.setItem("history", JSON.stringify(nextHistory));

      return {
        ...tictactoe,
        history: nextHistory,
        currentMove: nextHistory.length - 1,
        currentSquares: action.payload.nextSquares,
      };
    }

    case "JUMP_TO": {
      return {
        ...tictactoe,
        currentMove: action.payload.nextMove,
        currentSquares: tictactoe.history[action.payload.nextMove],
      };
    }

    case "CLEAR": {
      localStorage.removeItem("history");

      return {
        history: [Array(9).fill(null)],
        currentSquares: Array(9).fill(null),
        currentMove: 0,
        isDescOrdered: false,
      };
    }

    case "SORT": {
      return {
        ...tictactoe,
        isDescOrdered: !tictactoe.isDescOrdered,
      };
    }

    case "SYNCHRONIZE": {
      const { savedHistory } = action.payload;

      return {
        ...tictactoe,
        history: savedHistory,
        currentMove: savedHistory.length ? savedHistory.length - 1 : 0,
        currentSquares:
          savedHistory[savedHistory.length ? savedHistory.length - 1 : 0],
      };
    }

    default:
      throw new Error("Unknown action.");
  }
}

export { tictactoeReducer, initialTictactoe };
