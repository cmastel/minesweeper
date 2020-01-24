import React from "react";
import classes from "./Tile.module.scss";
const classNames = require("classnames");

function Tile(props) {
  const tile = props.gameBoard[props.x][props.y];

  const tileClass = classNames(
    classes.tile,
    tile.isRevealed ? classes.tile_revealed : null
  );

  const getValue = () => {
    if (!tile.isRevealed) {
      return tile.isFlagged ? "🚩" : null;
    }
    if (tile.isMine) {
      return "💣";
    }
    if (tile.neighbor === 0) {
      return null;
    }
    return tile.neighbor;
  };

  return (
    <div
      className={tileClass}
      onClick={props.onClick}
      onContextMenu={props.cMenu}
    >
      {getValue()}
    </div>
  );
}

export default Tile;
