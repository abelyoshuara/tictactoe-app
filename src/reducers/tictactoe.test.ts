/**
 * test scenario for tictactoeReducer
 *
 * - tictactoeReducer function:
 *  - should return the initial state
 *  - should return the tictactoe with the update state when given by PLAY action
 *  - should return the tictactoe with the update state when given by JUMP_TO action
 *  - should return the tictactoe with the update state when given by CLEAR action
 *  - should return the tictactoe with the update state when given by SORT action
 *  - should return the tictactoe with the update state when given by SYNCHRONIZE action
 *
 */

import { Action, initialTictactoe, tictactoeReducer } from "./tictactoe";

describe("tictactoeReducer function", () => {
  it("should return the initial state", () => {
    const initialState = {
      history: [Array(9).fill(null)],
      currentSquares: Array(9).fill(null),
      currentMove: 0,
      isDescOrdered: false,
    };
    expect(initialTictactoe).toEqual(initialState);
  });

  it("should return the tictactoe with the update state when given by PLAY action", () => {
    const action = {
      type: "PLAY",
      payload: {
        nextSquares: ["X", ...Array(8).fill(null)],
      },
    } as Action;

    const nextState = tictactoeReducer(initialTictactoe, action);

    if (action.type === "PLAY" && action.payload) {
      const nextHistory = [
        ...initialTictactoe.history.slice(0, initialTictactoe.currentMove + 1),
        action.payload.nextSquares,
      ];

      expect(nextState).toEqual({
        ...initialTictactoe,
        history: nextHistory,
        currentMove: initialTictactoe.currentMove + 1,
        currentSquares: action.payload.nextSquares,
      });
    } else {
      assert.fail("Invalid action type or missing payload");
    }
  });

  it("should return the tictactoe with the update state when given by JUMP_TO action", () => {
    const initialState = {
      history: [
        Array(9).fill(null),
        ["X", ...Array(8).fill(null)],
        ["X", "O", ...Array(7).fill(null)],
        ["X", "O", "X", ...Array(7).fill(null)],
      ],
      currentSquares: ["X", "O", "X", ...Array(7).fill(null)],
      currentMove: 3,
      isDescOrdered: false,
    };

    const action = {
      type: "JUMP_TO",
      payload: {
        nextMove: 2,
      },
    } as Action;

    const nextState = tictactoeReducer(initialState, action);

    if (action.type === "JUMP_TO" && action.payload) {
      expect(nextState).toEqual({
        ...initialState,
        currentSquares: initialState.history[action.payload.nextMove],
        currentMove: action.payload.nextMove,
      });
    } else {
      assert.fail("Invalid action type or missing payload");
    }
  });

  it("should return the tictactoe with the update state when given by CLEAR action", () => {
    const initialState = {
      history: [
        Array(9).fill(null),
        ["X", ...Array(8).fill(null)],
        ["X", "O", ...Array(7).fill(null)],
        ["X", "O", "X", ...Array(7).fill(null)],
      ],
      currentSquares: ["X", "O", "X", ...Array(7).fill(null)],
      currentMove: 3,
      isDescOrdered: false,
    };

    const action = { type: "CLEAR" } as Action;

    const nextState = tictactoeReducer(initialState, action);

    if (action.type === "CLEAR") {
      expect(nextState).toEqual({
        history: [Array(9).fill(null)],
        currentSquares: Array(9).fill(null),
        currentMove: 0,
        isDescOrdered: false,
      });
    } else {
      assert.fail("Invalid action type");
    }
  });

  it("should return the tictactoe with the update state when given by SORT action", () => {
    const initialState = {
      history: [
        Array(9).fill(null),
        ["X", ...Array(8).fill(null)],
        ["X", "O", ...Array(7).fill(null)],
        ["X", "O", "X", ...Array(7).fill(null)],
      ],
      currentSquares: ["X", "O", "X", ...Array(7).fill(null)],
      currentMove: 3,
      isDescOrdered: false,
    };

    const action = { type: "SORT" } as Action;

    const nextState = tictactoeReducer(initialState, action);

    if (action.type === "SORT") {
      expect(nextState).toEqual({
        ...initialState,
        isDescOrdered: !initialState.isDescOrdered,
      });
    } else {
      assert.fail("Invalid action type");
    }
  });

  it("should return the tictactoe with the update state when given by SYNCHRONIZE action", () => {
    const action = {
      type: "SYNCHRONIZE",
      payload: {
        savedHistory: [
          Array(9).fill(null),
          ["X", ...Array(8).fill(null)],
          ["X", "O", ...Array(7).fill(null)],
          ["X", "O", "X", ...Array(7).fill(null)],
        ],
      },
    } as Action;

    const nextState = tictactoeReducer(initialTictactoe, action);

    if (action.type === "SYNCHRONIZE" && action.payload) {
      const { savedHistory } = action.payload;

      expect(nextState).toEqual({
        ...initialTictactoe,
        history: savedHistory,
        currentMove: savedHistory.length ? savedHistory.length - 1 : 0,
        currentSquares:
          savedHistory[savedHistory.length ? savedHistory.length - 1 : 0],
      });
    } else {
      assert.fail("Invalid action type or missing payload");
    }
  });
});
