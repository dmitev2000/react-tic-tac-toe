import React from "react";
import { useState, useContext } from "react";
import GameContext from "../context/GameContext";
import { useEffect } from "react";

const Tile = ({ index }) => {
  const { hasWinner, clearTiles, playerTurn, dispatch } = useContext(GameContext);
  const [value, setValue] = useState();

    useEffect(() => {
        setValue("");
    }, [clearTiles]);

  const clickHandler = () => {
    if (value || hasWinner) return;
    setValue(playerTurn);
    dispatch({ type: "updateBoard", indexToUpdate: index });
  };

  return (
    <div className="tile" onClick={clickHandler}>
      {value}
    </div>
  );
};

export default Tile;
