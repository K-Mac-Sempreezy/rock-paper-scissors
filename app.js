const moves = ['rock', 'paper', 'scissors'];
const button = document.querySelector('button');
let playerScore = 0;
let computerScore = 0;
let playerSelection;

function keepScore(playScore, comScore) {
  playerScore =  playerScore + playScore;
  computerScore = computerScore + comScore;

  if (playerScore >= 3) {
    alert('Player wins game!')
    playerScore = 0;
    computerScore = 0;
    playerSelection = null;
  }
  
  if (computerScore >= 3) {
    alert('Computer wins game!')
    playerScore = 0;
    computerScore = 0;
    playerSelection = null;
  }
}


function startGame() {
  
  playerSelection = prompt('Choose rock, paper, or scissors.').toLowerCase();

  if(!playerSelection) {
    playerSelection = null;
    startGame();
  }

  if (playerSelection === 'paper') {
    computerPlay(playerSelection);
  } else if (playerSelection === 'rock') {
      computerPlay(playerSelection);
  } else if (playerSelection === 'scissors') {
      computerPlay(playerSelection);
  } else {
      alert('Check spelling and try again. Choose only rock, paper, or scissors.')
      startGame();
  }
}

function computerPlay(playerSelection) {
  const computerSelection = moves[Math.floor(Math.random() * moves.length)];
  game(playerSelection, computerSelection);
}

function game(playerSelection, computerSelection) {

  const win = `You win: ${playerSelection} beats ${computerSelection}!`
  const lose = `You lose: ${playerSelection} loses to ${computerSelection}!`

  if (playerSelection === computerSelection) {
    alert('It\'s a tie!');

    playerSelection = null;
    computerSelection = null;
    keepScore(0, 0);
  };

  if (playerSelection === 'paper' && computerSelection === 'rock') {
    alert(win)
    keepScore(1, 0);
  } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
    keepScore(0, 1);
    alert(lose)
  } else if (playerSelection === 'rock' && computerSelection === 'scissors') {
    keepScore(1, 0);
    alert(win)
  } else if (playerSelection === 'rock' && computerSelection === 'paper') {
    keepScore(0, 1);
    alert(lose)
  } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
    keepScore(1, 0);
    alert(win)
  } else if (playerSelection === 'scissors' && computerSelection === 'rock') {
    keepScore(0, 1);
    alert(lose)
  
  };

  playerSelection = null;
  computerSelection = null;
  startGame();
}

button.addEventListener('click', startGame);
