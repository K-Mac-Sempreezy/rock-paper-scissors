//Global variables

const moves = ['rock', 'paper', 'scissors'];
const svg = {
  rock: './SVG/rock.svg',
  paper: './SVG/paper.svg',
  scissors: './SVG/scissors.svg',
  question: './SVG/question-mark.svg',
};
const button = document.querySelector('button');
const tiles = document.querySelectorAll('.tile');
const comTile = document.getElementById('com-tile');
const images = document.querySelectorAll('.img');
const scoreboard = document.querySelector('.scoreboard');
const scoreList = document.getElementById('score-list');
const youScore = document.querySelector('.player-score');
const comScore = document.querySelector('.computer-score');

const wonGame = 'CONGRATULATIONS! YOU WON THE GAME!';
const lostGame = 'SORRY, YOU LOST THE GAME.';
const winButton = 'YOU WIN! PLAY AGAIN?';
const loseButton = 'COMPUTER WINS! PLAY AGAIN?';
const tiePoint = 'Tie';
const winPoint = '';
const losePoint = '';
const click = 'click to reset';
const buttonChoice = 'MAKE YOUR CHOICE';


let playerScore = 0;
let computerScore = 0;
let computerSelection;
let playerSelection;
let choiceMade = false;
let isGameOver = false;

//Functions

const startGame = () => {
  if (isGameOver) {
    playerScore = 0;
    computerScore = 0;
    scoreList.textContent = '';
  }
  button.textContent = buttonChoice;
  comTile.removeEventListener('mouseover', addShadow);
  comTile.setAttribute('src', svg['question'])
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

const translatePlaySelection = (e) => {
  playerSelection = e.target.id;

  if (playerSelection === 'player-rock') {
    playerSelection = moves[0];
    comTile.setAttribute('src', svg[moves[0]])
  } else if (playerSelection === 'player-paper') {
    playerSelection = moves[1];
    comTile.setAttribute('src', svg[moves[1]])
  } else if (playerSelection === 'player-scissors') {
    playerSelection = moves[2];
    comTile.setAttribute('src', svg[moves[2]])
  }

  computerPlay(playerSelection);
  tiles.forEach((tile) =>
    tile.removeEventListener('click', translatePlaySelection)
  );
};

const computerPlay = (playerSelection) => {
  const computerSelection = moves[Math.floor(Math.random() * moves.length)];
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let colorString = '1px 1px 5px 5px ' + color;
  comTile.setAttribute('src', svg[computerSelection])
  comTile.style.boxShadow = colorString;

  //add box shadow to computerSelection tile here
  game(playerSelection, computerSelection);
};

const game = (playerSelection, computerSelection) => {
  const win = `You win: ${playerSelection} beats ${computerSelection}!`;
  const lose = `You lose: ${computerSelection} beats ${playerSelection}!`;

  if (playerSelection === computerSelection) {
    createScoreBoardComment(tiePoint);
    playerSelection = null;
    computerSelection = null;
    keepScore(0, 0);
  }

  if (
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    createScoreBoardComment(win);
    keepScore(1, 0);
  } else if (
    (playerSelection === 'paper' && computerSelection === 'scissors') ||
    (playerSelection === 'rock' && computerSelection === 'paper') ||
    (playerSelection === 'scissors' && computerSelection === 'rock')
  ) {
    createScoreBoardComment(lose);
    keepScore(0, 1);
  }

  button.addEventListener('click', function () {
    playerSelection = null;
    computerSelection = null;
    choiceMade = !choiceMade;
    startGame();
  });
};

const keepScore = (player, com) => {
  playerScore += player;
  computerScore += com;

  youScore.textContent = playerScore;
  comScore.textContent = computerScore;
  button.textContent = click;

  if (playerScore < 5 && computerScore < 5) {
    button.addEventListener('click', function () {
      comTile.style.boxShadow = 'none';
      comTile.addEventListener('mouseover', addShadow);
      comTile.addEventListener('mouseleave', removeShadow);
      tiles.forEach((tile) => (tile.style.boxShadow = 'none'));
      tiles.forEach((tile) => tile.addEventListener('mouseover', addShadow));
      tiles.forEach((tile) =>
        tile.addEventListener('mouseleave', removeShadow)
      );
      isGameOver = false;
      startGame();
    });
  } else if (playerScore >= 5) {
    button.textContent = winButton;
    createScoreBoardComment(wonGame);
    reset();
  } else if (computerScore >= 5) {
    button.textContent = loseButton;
    createScoreBoardComment(lostGame);
    reset();
  }
};

const createScoreBoardComment = (result) => {
  let li = document.createElement('li');
  li.textContent = result;
  scoreList.prepend(li);
};

const reset = () => {
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

const playAgain = () => {
  youScore.textContent = playerScore;
  comScore.textContent = computerScore;

  comTile.style.boxShadow = 'none';
  comTile.addEventListener('mouseover', addShadow);
  comTile.addEventListener('mouseleave', removeShadow);
  tiles.forEach((tile) => (tile.style.boxShadow = 'none'));
  tiles.forEach((tile) => tile.addEventListener('mouseover', addShadow));
  tiles.forEach((tile) => tile.addEventListener('mouseleave', removeShadow));
  startGame();
};








const initialLoad = () => {
  button.addEventListener('click', startGame);
  button.addEventListener('mouseover', addShadow);
  button.addEventListener('mouseleave', removeShadow);

  tiles.forEach((tile) => tile.addEventListener('mouseover', addShadow));
  tiles.forEach((tile) => tile.addEventListener('mouseleave', removeShadow));
  comTile.addEventListener('mouseover', addShadow);
  comTile.addEventListener('mouseleave', removeShadow);
}

// JQuery

function addShadow() {
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let colorString = '1px 1px 5px 5px ' + color;
  $(this).css('box-shadow', colorString);
}

function removeShadow() {
  let removed = 'none';
  $(this).css('box-shadow', removed);
}

initialLoad();
