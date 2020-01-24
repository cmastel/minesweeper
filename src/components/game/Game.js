import React, { useState, useReducer } from "react";
import Tile from "../tile/Tile";
import classes from "./Game.module.scss";
import reducer, {
  SET_REVEALED,
  SET_FLAG,
  REMOVE_FLAG
} from "../../reducers/gameBoard";
import { initiateBoard, revealBoard, checkWin } from "../../helpers/selectors";
const classNames = require("classnames");

function Game() {
  // Set up board
  const dimensions = [16, 16];
  const gameArray = initiateBoard(dimensions);

  // State Declarations
  const [minesRemaining, setMinesRemaining] = useState(40);
  const [gameBoard, dispatch] = useReducer(reducer, gameArray);
  const [gameStatus, setGameStatus] = useState("Playing");

  // Define class names
  const statusClass = classNames(
    gameStatus === "You lose!" ? classes.game_title_lose : null,
    gameStatus === "You win!!!" ? classes.game_title_win : null
  );

  // Handle Functions
  const handleClick = (x, y) => {
    if (gameBoard[x][y].isRevealed || gameBoard[x][y].isFlagged) {
      return null;
    }
    if (gameBoard[x][y].isMine) {
      setGameStatus("You lose!");
      revealBoard(gameBoard);
    } else if (checkWin(gameBoard)) {
      setGameStatus("You win!!!");
    }

    let updatedBoard = gameBoard;
    updatedBoard[x][y].isRevealed = true;
    dispatch({ type: SET_REVEALED });
  };

  const handleContextMenu = (event, x, y) => {
    event.preventDefault();
    let updatedBoard = gameBoard;
    let mines = minesRemaining;

    if (updatedBoard[x][y].isRevealed) return;
    if (updatedBoard[x][y].isFlagged) {
      updatedBoard[x][y].isFlagged = false;
      dispatch({ type: REMOVE_FLAG });
      mines++;
    } else {
      updatedBoard[x][y].isFlagged = true;
      dispatch({ type: SET_FLAG });
      mines--;
    }
    setMinesRemaining(mines);
  };

  // Create tile components based on gameArray
  const renderBoard = array => {
    return array.map(row => {
      return row.map(item => {
        return (
          <div key={item.x * row.length + item.y} className={classes.game_grid}>
            <Tile
              onClick={() => handleClick(item.x, item.y)}
              cMenu={e => handleContextMenu(e, item.x, item.y)}
              value={item}
              x={item.x}
              y={item.y}
              gameBoard={gameBoard}
            />
          </div>
        );
      });
    });
  };

  const tiles = renderBoard(gameArray);

  return (
    <div className={classes.game}>
      <div className={classes.game_title}>
        <h3>Flags Remaining: {minesRemaining}</h3>
        <h4 className={statusClass}>Status: {gameStatus}</h4>
        <button
          className={classes.game_button}
          onClick={() => window.location.reload(false)}
        >
          Reset Board
        </button>
      </div>
      <div className={classes.game_grid}>{tiles}</div>
    </div>
  );
}

export default Game;
