/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  playerTurn: Math.floor(Math.random() * 2) === 0 ? "X" : "O",
  moves: 0,
  hasWinner: false,
  winner: null,
  indexToUpdate: null,
  clearTiles: false,
  board: new Array(9).fill(""),
  dispatch: () => {},
};

export const GameContext = createContext(initial_state);

const GameReducer = (state, action) => {
  if (action.type === "updateBoard") {
    return {
      ...state,
      indexToUpdate: action.indexToUpdate,
      moves: state.moves + 1,
    };
  } else if (action.type === "changePlayerTurn") {
    return {
      ...state,
      playerTurn: action.playerTurn === "X" ? "O" : "X",
    };
  } else if (action.type === "gameOver") {
    return {
      ...state,
      hasWinner: true,
    };
  } else if (action.type === "draw") {
    return {
      ...state,
      hasWinner: false,
      winner: action.winner,
    };
  } else if (action.type === "newGame") {
    return {
        playerTurn: Math.floor(Math.random() * 2) === 0 ? "X" : "O",
        moves: 0,
        hasWinner: false,
        winner: null,
        indexToUpdate: null,
        clearTiles: !state.clearTiles,
        board: new Array(9).fill(""),
        dispatch: () => {},
      };
  }
};

export function GameContextProvider({ children }) {
  const [state, dispatch] = useReducer(GameReducer, initial_state);

  useEffect(() => {
    state.board = state.board.map((e, i) => {
      if (i === state.indexToUpdate) {
        return state.playerTurn;
      } else {
        return e;
      }
    });
    if (
      (state.board[0] &&
        state.board[1] &&
        state.board[2] &&
        state.board[0] === state.board[1] &&
        state.board[1] === state.board[2]) ||
      (state.board[3] &&
        state.board[4] &&
        state.board[5] &&
        state.board[3] === state.board[4] &&
        state.board[4] === state.board[5]) ||
      (state.board[6] &&
        state.board[7] &&
        state.board[8] &&
        state.board[6] === state.board[7] &&
        state.board[7] === state.board[8]) ||
      (state.board[0] &&
        state.board[3] &&
        state.board[6] &&
        state.board[0] === state.board[3] &&
        state.board[3] === state.board[6]) ||
      (state.board[1] &&
        state.board[4] &&
        state.board[7] &&
        state.board[1] === state.board[4] &&
        state.board[4] === state.board[7]) ||
      (state.board[2] &&
        state.board[5] &&
        state.board[8] &&
        state.board[2] === state.board[5] &&
        state.board[5] === state.board[8]) ||
      (state.board[0] &&
        state.board[4] &&
        state.board[8] &&
        state.board[0] === state.board[4] &&
        state.board[4] === state.board[8]) ||
      (state.board[2] &&
        state.board[4] &&
        state.board[6] &&
        state.board[2] === state.board[4] &&
        state.board[4] === state.board[6])
    ) {
      dispatch({ type: "gameOver", winner: state.playerTurn });
    } else {
      if (state.moves === 9) {
        dispatch({ type: "draw", winner: "none" });
      } else
        dispatch({ type: "changePlayerTurn", playerTurn: state.playerTurn });
    }
  }, [state.indexToUpdate]);

  return (
    <GameContext.Provider
      value={{
        playerTurn: state.playerTurn,
        indexToUpdate: state.indexToUpdate,
        winner: state.winner,
        hasWinner: state.hasWinner,
        board: state.board,
        moves: state.moves,
        clearTiles: state.clearTiles,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
