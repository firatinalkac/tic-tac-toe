const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const circleCount = document.querySelector("#circle-count")
const crossCount = document.querySelector("#cross-count");
const newGameBtn = document.querySelector("#newGame")
const restartGameBtn = document.querySelector("#restartGame")

const startCells = [
   "", "", "",
   "", "", "",
   "", "", "",
];

let go = "circle";
let finishGame = false;
infoDisplay.textContent = "Circle goes first";

function createBoard() {
   startCells.forEach((_cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('square');
      cellElement.id = index;
      cellElement.addEventListener('click', addGo);
      gameBoard.append(cellElement)
   })
}
createBoard();

function addGo(e) {
   if(finishGame) {
      return;
   }
   const goDisplay = document.createElement('div');
   goDisplay.classList.add(go);
   e.target.append(goDisplay);
   go = go === 'circle' ? 'cross' : 'circle';
   infoDisplay.textContent = 'it is now ' + go + "'s go.";
   e.target.removeEventListener("click", addGo);
   checkScore();
}

function finishLine(array, index) {
   const allSquares = document.querySelectorAll(".square");
   array.forEach((el) => {
      const lineSpan = document.createElement('span')
      lineSpan.classList.add('line')
      if(index > 5) {
         lineSpan.style.transform = `rotate(${index === 6 ? 45 : -45}deg)`
      }
      if(index > 2 && index < 6) {
         lineSpan.style.transform = `rotate(90deg)`
      }
      allSquares[el].append(lineSpan);
   });
   newGameBtn.style.display = 'block';
   restartGameBtn.style.display = 'block';
   finishGame = true;
}

function checkScore() {
   const allSquares = document.querySelectorAll(".square");

   const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
   ];

   winningCombos.forEach((array, index) => {
      const circleWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('circle'))

      const crossWins = array.every(cell =>
         allSquares[cell].firstChild?.classList.contains('cross'))

      if (circleWins) {
         infoDisplay.textContent = 'Circle Wins!';
         finishLine(array, index);
         circleCount.textContent = `${parseInt(circleCount.textContent) + 1}`
         return
      } else if(crossWins) {
         infoDisplay.textContent = 'Cross Wins!';
         finishLine(array, index);
         crossCount.textContent = `${parseInt(crossCount.textContent) + 1}`
         return
      }
   })
}

function startNewGame() {
   const allSquares = document.querySelectorAll(".square");
   allSquares.forEach(square => {
      square.innerHTML = "";
      square.addEventListener('click', addGo);
   });
   go = 'circle';
   infoDisplay.textContent = "Circle goes first";
   newGameBtn.style.display = 'none';
   restartGameBtn.style.display = 'none';
   finishGame = false;
}

function restartGame() {
   startNewGame();
   circleCount.textContent = '0';
   crossCount.textContent = '0'
}

newGameBtn.addEventListener('click', startNewGame);
restartGameBtn.addEventListener('click', restartGame);