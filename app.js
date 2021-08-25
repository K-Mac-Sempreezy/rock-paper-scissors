//Global variables

const moves = ['rock', 'paper', 'scissors'];
const button = document.querySelector('button');
const tiles = document.querySelectorAll('.tile');
const comTiles = document.querySelectorAll('.com-tile');
const images = document.querySelectorAll('.img');
const scoreboard = document.querySelector('.scoreboard');
const scoreList = scoreboard.querySelector('#score-list');
const tileContainer = document.querySelector('#tile-container');
const comSelectionTiles = document.querySelectorAll('.com-tile');
const youScore = document.querySelector('.player-score');
const comScore = document.querySelector('.computer-score');
const computer = document.querySelector('.computer');
const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

let playerScore = 0;
let computerScore = 0;
let computerSelection;
let playerSelection;
let choiceMade = false;
let isGameOver = false;

//Functions

const keepScore = (player, com) => {
  playerScore += player;
  computerScore += com;

  youScore.textContent = playerScore;
  comScore.textContent = computerScore;
  button.textContent = 'Choose';

  if (playerScore < 5 && computerScore < 5) {
    button.addEventListener('click', function () {
      comTiles.forEach((tile) => (tile.style.boxShadow = 'none'));
      tiles.forEach((tile) => (tile.style.boxShadow = 'none'));
      tiles.forEach((tile) => tile.addEventListener('mouseover', addShadow));
      tiles.forEach((tile) =>
        tile.addEventListener('mouseleave', removeShadow)
      );
      comTiles.forEach((comTile) =>
        comTile.addEventListener('mouseover', addShadow)
      );
      comTiles.forEach((comTile) =>
        comTile.addEventListener('mouseleave', removeShadow)
      );
      isGameOver = false;
      startGame();
    });
  } else if (playerScore >= 5) {
    button.textContent = 'YOU WIN! PLAY AGAIN?';

    let li = document.createElement('li');
    li.textContent = 'CONGRATULATIONS! YOU WON THE GAME!';
    scoreList.prepend(li);

    youScore.textContent = playerScore;
    comScore.textContent = computerScore;
    playerScore = 0;
    computerScore = 0;
    playerSelection = null;
    computerSelection = null;
    choiceMade = false;
    isGameOver = !isGameOver;
    button.addEventListener('click', playAgain);
  } else if (computerScore >= 5) {
    button.textContent = 'COMPUTER WINS! PLAY AGAIN?';

    let li = document.createElement('li');
    li.textContent = 'SORRY, YOU LOST THE GAME.';
    scoreList.prepend(li);

    youScore.textContent = playerScore;
    comScore.textContent = computerScore;
    playerScore = 0;
    computerScore = 0;
    playerSelection = null;
    computerSelection = null;
    choiceMade = false;
    isGameOver = !isGameOver;
    button.addEventListener('click', playAgain);
  }
};

const playAgain = () => {
  youScore.textContent = playerScore;
  comScore.textContent = computerScore;

  comTiles.forEach((tile) => (tile.style.boxShadow = 'none'));
  tiles.forEach((tile) => (tile.style.boxShadow = 'none'));
  tiles.forEach((tile) => tile.addEventListener('mouseover', addShadow));
  tiles.forEach((tile) => tile.addEventListener('mouseleave', removeShadow));
  comTiles.forEach((comTile) =>
    comTile.addEventListener('mouseover', addShadow)
  );
  comTiles.forEach((comTile) =>
    comTile.addEventListener('mouseleave', removeShadow)
  );
  startGame();
};

const startGame = () => {
  if (isGameOver) {
    playerScore = 0;
    computerScore = 0;
    scoreList.textContent = '';
  }

  button.textContent = 'MAKE YOUR CHOICE';

  comTiles.forEach((comTile) =>
    comTile.removeEventListener('mouseover', addShadow)
  );

  tiles.forEach((tile) =>
    tile.addEventListener('click', function () {
      tiles.forEach((tile) =>
        tile.removeEventListener('mouseleave', removeShadow)
      );
      addShadow();
    })
  );

  images.forEach((img) =>
    img.addEventListener('click', function () {
      tiles.forEach((tile) => tile.removeEventListener('mouseover', addShadow));

      if (choiceMade) {
        return;
      }

      choiceMade = true;
    })
  );

  tiles.forEach((tile) =>
    tile.addEventListener('click', translatePlaySelection)
  );
};

const translatePlaySelection = () => {
  playerSelection = this.id;

  if (playerSelection === 'player-rock') {
    playerSelection = 'rock';
  } else if (playerSelection === 'player-paper') {
    playerSelection = 'paper';
  } else if (playerSelection === 'player-scissors') {
    playerSelection = 'scissors';
  }

  computerPlay(playerSelection);
  tiles.forEach((tile) =>
    tile.removeEventListener('click', translatePlaySelection)
  );
};

const computerPlay = (playerSelection) => {
  const computerSelection = moves[Math.floor(Math.random() * moves.length)];
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let colorString = '20px 20px 0px 2px ' + color;
  const tileID = document.getElementById(computerSelection);
  tileID.style.boxShadow = colorString;

  //add box shadow to computerSelection tile here
  game(playerSelection, computerSelection);
};

const game = (playerSelection, computerSelection) => {
  const win = `You win: ${playerSelection} beats ${computerSelection}!`;
  const lose = `You lose: ${computerSelection} beats ${playerSelection}!`;

  if (playerSelection === computerSelection) {
    let li = document.createElement('li');
    scoreList.prepend(li);
    li.textContent = 'Tie';

    playerSelection = null;
    computerSelection = null;
    keepScore(0, 0);
  }

  if (
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    keepScore(1, 0);
    let li = document.createElement('li');
    li.textContent = win;
    scoreList.prepend(li);
  } else if (
    (playerSelection === 'paper' && computerSelection === 'scissors') ||
    (playerSelection === 'rock' && computerSelection === 'paper') ||
    (playerSelection === 'scissors' && computerSelection === 'rock')
  ) {
    keepScore(0, 1);
    let li = document.createElement('li');
    li.textContent = lose;
    scoreList.prepend(li);
  }

  button.addEventListener('click', function () {
    playerSelection = null;
    computerSelection = null;
    choiceMade = !choiceMade;
    startGame();
  });
};

// Event listeners
button.addEventListener('click', startGame);
button.addEventListener('mouseover', addShadow);
button.addEventListener('mouseleave', removeShadow);

tiles.forEach((tile) => tile.addEventListener('mouseover', addShadow));
tiles.forEach((tile) => tile.addEventListener('mouseleave', removeShadow));
comTiles.forEach((comTile) => comTile.addEventListener('mouseover', addShadow));
comTiles.forEach((comTile) =>
  comTile.addEventListener('mouseleave', removeShadow)
);

// JQuery

function addShadow() {
  console.log(this);
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let colorString = '1px 1px 5px 5px ' + color;
  $(this).css('box-shadow', colorString);
}

function removeShadow() {
  console.log(this);
  let removed = 'none';
  $(this).css('box-shadow', removed);
}
