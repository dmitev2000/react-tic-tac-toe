import React from "react";
import { useState, useContext } from "react";
import GameContext from "../context/GameContext";

const Tile = ({ index }) => {
  const { playerTurn, dispatch } = useContext(GameContext);
  const [value, setValue] = useState();

  const clickHandler = () => {
    if (value) return;
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
