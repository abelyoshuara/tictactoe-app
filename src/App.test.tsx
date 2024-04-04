/**
 * test scenario for App component
 *
 * - App component
 *   - should renders correctly
 *   - should clear history when user click the clear button
 */

import App from "./App";
import { render, screen, userEvent } from "./utils/test-utils";

describe("App component", () => {
  it("should renders correctly", () => {
    render(<App />);

    const title = screen.getByText(/tictactoe app/i);
    expect(title).toBeInTheDocument();

    const statusGame = screen.getByTestId("status-game");
    expect(statusGame).toBeInTheDocument();

    const buttonClear = screen.getByRole("button", { name: "Clear" });
    expect(buttonClear).toBeInTheDocument();

    const buttonSort = screen.getByTestId("btn-sort");
    expect(buttonSort).toBeInTheDocument();

    const board = screen.getByTestId("board");
    expect(board).toBeInTheDocument();

    const history = screen.getByTestId("history");
    expect(history).toBeInTheDocument();

    const squares = screen.getAllByTestId("square");
    expect(squares).toHaveLength(9);
  });

  it("should clear history when user click the clear button", async () => {
    render(<App />);

    localStorage.setItem(
      "history",
      JSON.stringify("[['x', 'o', 'x', null, null, null, null, null, null]]"),
    );

    const buttonClear = screen.getByRole("button", { name: "Clear" });
    await userEvent.click(buttonClear);

    expect(null).toEqual(localStorage.getItem("history"));
  });
});
