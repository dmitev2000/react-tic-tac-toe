import React, { useContext } from "react";
import "./App.css";
import Tile from "./components/Tile";
import GameContext from "./context/GameContext";

const App = () => {
  const { hasWinner, playerTurn, dispatch } = useContext(GameContext);
  const tiles = new Array(9).fill(null);

  return (
    <>
      <h1 className="player-turn">Player turn: {playerTurn}</h1>
      <h1
        className="new-game"
        onClick={() => {
          dispatch({ type: "newGame" });
        }}
      >
        New game
      </h1>
      {hasWinner && <h1 className="winner">Winner: player {playerTurn}!</h1>}
      <div className="App">
        {tiles.map((_, index) => {
          return <Tile key={index} index={index} />;
        })}
      </div>
    </>
  );
};

export default App;
