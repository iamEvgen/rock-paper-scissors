function computerPlay() {
    const items = ['rock', 'paper', 'scissors'];
    return items[Math.floor(Math.random() * items.length)];
}


function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    const winner_combo = ['rockscissors', 'paperrock', 'scissorspaper'];
    if (playerSelection === computerSelection) {
        return 'Tie game!';
    } else if (winner_combo.includes(playerSelection + computerSelection)) {
        return `You Win! ${playerSelection[0].toUpperCase() + playerSelection.slice(1)} \
beats ${computerSelection[0].toUpperCase() + computerSelection.slice(1)}`;
    } else {
        return `You Lose! ${computerSelection[0].toUpperCase() + computerSelection.slice(1)} \
beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1)}`;
    }
}

function game(index) {
    if (stopGame) return;
    let playerSelection = ['rock', 'paper', 'scissors'][index];
    let computerSelection = computerPlay();
    let resultOfTheRound = playRound(playerSelection, computerSelection);
    if (resultOfTheRound === 'Tie game!') {
        messageBox.textContent = 'Tie game!';
    } else if (resultOfTheRound.startsWith('You Win!')) {
        messageBox.textContent = resultOfTheRound;
        playerWins += 1;

    } else {
        messageBox.textContent = resultOfTheRound;
        pcWins += 1;
    }
    score.innerHTML = `Player <span class="score">${playerWins} : ${pcWins}</span> PC`;

    log.innerHTML = `Round ${round}: ${resultOfTheRound} <br> ${log.innerHTML}`
    round += 1;

    if (playerWins >= 5 && playerWins > pcWins) {
        messageBox.innerHTML = 'You won, congratulations!';
        messageBox.style.color = 'green';
        messageBox.style.fontSize = '50px';
        restart.style.display = 'block';
        stopGame = true;
    } else if (pcWins >= 5 && playerWins < pcWins) {
        messageBox.innerHTML = 'You are LOSER!';
        messageBox.style.color = 'red';
        messageBox.style.fontSize = '50px';
        restart.style.display = 'block';
        stopGame = true;
    }
}

function restartGame() {
    playerWins = 0;
    pcWins = 0;
    round = 1;
    stopGame = false;
    log.innerHTML = '';
    messageBox.textContent = 'Press the button to start:';
    score.innerHTML = `Player <span class="score">${playerWins} : ${pcWins}</span> PC`;
    restart.style.display = 'none';
    messageBox.style.color = 'white';
    messageBox.style.fontSize = '16px';
}

let playerWins = 0;
let pcWins = 0;
let round = 1;
let stopGame = false;

const score = document.getElementById('score');
score.innerHTML = `Player <span class="score">${playerWins} : ${pcWins}</span> PC`;

const messageBox = document.getElementById('messageBox');
messageBox.textContent = 'Press the button to start:';

const log = document.getElementById('log');
log.innerHTML = '';

const buttons = document.getElementsByClassName('button');
Array.from(buttons).forEach(function(element, index) {
    element.addEventListener('click', game.bind(null, index));
});

const restart = document.getElementById('restart');
restart.addEventListener('click', restartGame);