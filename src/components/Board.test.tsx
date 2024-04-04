/**
 * test scenario for Board component
 *
 * - Board component
 *   - should call onPlay function when square button is clicked
 *   - should display winner when someone win
 *   - should display draw when no one wins
 */

import { render, screen, userEvent } from "../utils/test-utils";
import Board from "./Board";

describe("Board component", () => {
  it("should call onPlay function when square button is clicked", async () => {
    const mockOnPlay = vi.fn();

    render(
      <Board
        xIsNext={true}
        squares={Array(9).fill(null)}
        onPlay={mockOnPlay}
      />,
    );

    const squares = screen.getAllByTestId("square");
    await userEvent.click(squares[0]);

    expect(mockOnPlay).toHaveBeenCalled();
  });

  it("should display winner when someone win", async () => {
    const mockOnPlay = vi.fn();

    render(
      <Board
        xIsNext={true}
        squares={["x", "x", "x", ...Array(6).fill(null)]}
        onPlay={mockOnPlay}
      />,
    );

    const statusGame = screen.getByTestId("status-game");
    expect(statusGame).toHaveTextContent(/Winner: x/i);
  });

  it("should display draw when no one wins", async () => {
    const mockOnPlay = vi.fn();

    render(
      <Board
        xIsNext={true}
        squares={["x", "0", "x", "x", "0", "0", "0", "x", "x"]}
        onPlay={mockOnPlay}
      />,
    );

    const statusGame = screen.getByTestId("status-game");
    expect(statusGame).toHaveTextContent(/draw/i);
  });
});
