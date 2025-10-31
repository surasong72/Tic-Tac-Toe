const playerOne = {
  name: "Player X",
  mark: "X",
};
const playerTwo = {
  name: "Player O",
  mark: "O",
};

function switchPlayer() {
  let currentPlayer = Math.random() < 0.5 ? playerOne : playerTwo;

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  return { getCurrentPlayer, togglePlayer };
}

function GameBoard() {
  const Board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
  function getBoard() {
    return Board;
  }
  return { getBoard };
}

function GameController() {
  // Logic can be added later
}

function GameDisplay() {
  const gameArea = document.createElement("div");
  gameArea.style.width = "600px";
  gameArea.style.height = "550px";
  gameArea.style.backgroundColor = "#aee9e6ff";
  gameArea.style.display = "flex";
  gameArea.style.flexDirection = "column";
  gameArea.style.alignItems = "center";
  gameArea.style.justifyContent = "center";
  gameArea.style.gap = "15px";

  const playerControl = switchPlayer();
  const player = playerControl.getCurrentPlayer();

  const playerStatus = document.createElement("div");
  playerStatus.textContent = player.name + " turn";
  playerStatus.style.textAlign = "center";
  playerStatus.style.fontSize = "20px";

  const boardArea = document.createElement("div");
  boardArea.style.width = "300px";
  boardArea.style.height = "300px";
  boardArea.style.display = "grid";
  boardArea.style.gridTemplateColumns = "repeat(3, 100px)";
  boardArea.style.gridTemplateRows = "repeat(3, 100px)";
  boardArea.style.gap = "1px";
  boardArea.style.backgroundColor = "black";

  // Create 9 cells
  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = "100px";
    cell.style.height = "100px";
    cell.style.backgroundColor = "#df7c3aee";
    cell.style.display = "flex";
    cell.style.alignItems = "center";
    cell.style.justifyContent = "center";
    cell.style.fontSize = "32px";
    cell.style.cursor = "pointer";
    cell.textContent = "";

    cell.addEventListener("click", () => {
      if (cell.textContent === "") {
        const current = playerControl.getCurrentPlayer();
        cell.textContent = current.mark;
        playerControl.togglePlayer();
        const next = playerControl.getCurrentPlayer();
        playerStatus.textContent = next.name + " turn";
      }
    });

    boardArea.appendChild(cell);
  }

  const gameStatus = document.createElement("div");
  gameStatus.textContent = "Game not started";
  gameStatus.style.textAlign = "center";
  gameStatus.style.fontSize = "20px";

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.style.backgroundColor = "grey";
  restartButton.style.fontSize = "20px";
  restartButton.style.padding = "5px 15px";
  restartButton.addEventListener("click", () => {
    document.querySelectorAll(".cell").forEach((c) => (c.textContent = ""));
    gameStatus.textContent = "Game restarted";
  });

  gameArea.appendChild(playerStatus);
  gameArea.appendChild(boardArea);
  gameArea.appendChild(gameStatus);
  gameArea.appendChild(restartButton);

  document.body.appendChild(gameArea);
}

GameDisplay();
