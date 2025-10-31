
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
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  function getBoard() {
    return Board;
  }
  return { getBoard };
}

function GameController(boardArea, playerControl, playerStatus, gameStatus) {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let gameOver = false;

  // check winner or draw
  function checkWinner() {
    const winPatterns = [
      // rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]];
      }
    }

    const allFilled = board.flat().every(cell => cell !== "");
    return allFilled ? "draw" : null;
  }

  function handleMove(row, col, cell) {
    if (gameOver || board[row][col] !== "") return;

    const current = playerControl.getCurrentPlayer();
    board[row][col] = current.mark;
    cell.textContent = current.mark;

    const result = checkWinner();
    if (result) {
      gameOver = true;
      if (result === "draw") {
        gameStatus.textContent = "It's a Draw!";
      } else {
        gameStatus.textContent = current.name + " Wins!";
      }
      return;
    }

    playerControl.togglePlayer();
    const next = playerControl.getCurrentPlayer();
    playerStatus.textContent = next.name + " turn";
  }

  const cells = boardArea.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cell.addEventListener("click", () => handleMove(row, col, cell));
  });

  function restartGame() {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    gameOver = false;
    gameStatus.textContent = "Game restarted";
    playerStatus.textContent = playerControl.getCurrentPlayer().name + " turn";
    cells.forEach(cell => (cell.textContent = ""));
  }

  return { restartGame };
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

  gameArea.appendChild(playerStatus);
  gameArea.appendChild(boardArea);
  gameArea.appendChild(gameStatus);
  gameArea.appendChild(restartButton);
  document.body.appendChild(gameArea);

  const controller = GameController(boardArea, playerControl, playerStatus, gameStatus);
  restartButton.addEventListener("click", controller.restartGame);
}

GameDisplay();