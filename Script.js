const playerOne ={
  name: "player X",
  mark: "X",
}
const playerTwo ={
  name: "player O",
  mark: "O", 
}
function switchPlayer() {
  let currentPlayer = Math.random() < 0.5 ? playerOne : playerTwo;

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  // return the two inner functions so we can use them later
  return { getCurrentPlayer, togglePlayer };
}


function GameBoard  () {
  Board = [
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
  ];
  function getBoard(){
    return Board;
  }
}

function GameController(){

}
function GameDisplay(){
  const gameArea=document.createElement("div");
  gameArea.style.width="600px";
  gameArea.style.height="550px";
  gameArea.style.backgroundColor= "#aee9e6ff";
  gameArea.style.justifySelf="center";
  gameArea.style.justifyItems="center";

  const playerControl=switchPlayer();
  const player = playerControl.getCurrentPlayer();
  const playerStatus=document.createElement("div");
  playerStatus.textContent=player.name;
  playerStatus.style.textAlign="center";
  playerStatus.style.fontSize="20px";
  playerStatus.style.padding="10px";
 
  const boardArea=document.createElement("div");
  boardArea.style.width="400px";
  boardArea.style.height="400px";
  boardArea.style.justifySelf="center";
  boardArea.style.backgroundColor="#df7c3aee";
  
  
  const gameStatus=document.createElement("div");
  gameStatus.textContent="game not started";
  gameStatus.style.textAlign="center";
  gameStatus.style.fontSize="20px";

  const restartButton=document.createElement("button");
  restartButton.value="restart";
  restartButton.textContent="restart";
  restartButton.style.backgroundColor="grey";
  restartButton.style.fontSize="20px";

  gameArea.appendChild(playerStatus);
  gameArea.appendChild(boardArea);
  gameArea.appendChild(gameStatus);
  gameArea.appendChild(restartButton);

  document.body.appendChild(gameArea);

}
GameDisplay();