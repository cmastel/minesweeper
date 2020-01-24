// import React from "react";
// import Tile from "../components/tile/Tile";

function getBombArray(numBombs, totalTiles) {
  let bombArray = [];
  while (bombArray.length < numBombs) {
    let tileNumber = Math.floor(Math.random() * totalTiles);
    if (!bombArray.includes(tileNumber)) {
      bombArray.push(tileNumber);
    }
  }
  return bombArray;
}

function getZeroArray(dimensions) {
  let array = [];
  for (let i = 0; i < dimensions[0]; i++) {
    array.push([]);
    for (let j = 0; j < dimensions[1]; j++) {
      array[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighbor: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false
      };
    }
  }
  return array;
}

function addBombs(zeroArray, bombArray, dimensions) {
  let filledArray = zeroArray;
  for (const bomb of bombArray) {
    const x = Math.floor(bomb / dimensions[0]);
    const y = bomb % dimensions[0];
    filledArray[x][y].isMine = true;
  }
  return filledArray;
}

function getNeighbors(gridArray) {
  let updatedArray = gridArray;

  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      if (gridArray[i][j].isMine !== true) {
        let mine = 0;
        const adjacentTiles = getAdjacentTiles(
          gridArray[i][j].x,
          gridArray[i][j].y,
          gridArray
        );
        adjacentTiles.map(value => {
          if (value.isMine) {
            mine++;
          }
        });
        if (mine === 0) {
          updatedArray[i][j].isEmpty = true;
        }
        updatedArray[i][j].neighbor = mine;
      }
    }
  }
  return updatedArray;
}

function getAdjacentTiles(x, y, array) {
  const el = [];
  //up
  if (x > 0) {
    el.push(array[x - 1][y]);
  }
  //down
  if (x < array.length - 1) {
    el.push(array[x + 1][y]);
  }
  //left
  if (y > 0) {
    el.push(array[x][y - 1]);
  }
  //right
  if (y < array[x].length - 1) {
    el.push(array[x][y + 1]);
  }
  // top left
  if (x > 0 && y > 0) {
    el.push(array[x - 1][y - 1]);
  }
  // top right
  if (x > 0 && y < array[x].length - 1) {
    el.push(array[x - 1][y + 1]);
  }
  // bottom right
  if (x < array.length - 1 && y < array[x].length - 1) {
    el.push(array[x + 1][y + 1]);
  }
  // bottom left
  if (x < array.length - 1 && y > 0) {
    el.push(array[x + 1][y - 1]);
  }
  return el;
}

export function initiateBoard(dimensions) {
  const bombArray = getBombArray(40, 256);
  const zeroArray = getZeroArray(dimensions);
  const gridArray = addBombs(zeroArray, bombArray, dimensions);
  const gameArray = getNeighbors(gridArray);
  return gameArray;
}

export function revealBoard(gameBoard) {
  for (let row in gameBoard) {
    for (let i = 0; i < gameBoard[row].length; i++) {
      gameBoard[row][i].isRevealed = true;
    }
  }
  return gameBoard;
}

export function checkWin(gameBoard) {
  for (let row in gameBoard) {
    for (let i = 0; i < gameBoard[row].length; i++) {
      if (gameBoard[row][i].isMine === true && gameBoard[row][i].isFlagged === false) {
        return false
      }
    }
  }
  return true;
}
