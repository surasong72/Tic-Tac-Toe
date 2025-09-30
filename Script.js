const playerOne = {
   name:"Mr.X", 
   mark:"X",
}

function gameboard(){
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  function getBoard(){
    return board;
  }
}

function gameController(){
  let currentPlayer = Math.random() < 0.5 ? playerOne : playerTwo;

  function switchPlayer(){
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    return currentPlayer;
  }
}