var btn = document.getElementById('start');
window.onload = (event) => {
    btn.addEventListener('click', start);
};

var rounds = 0;
var scoreX = 0;
var scoreO = 0;
var activePlayer = 'X';
var positions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var round_end = true;
var winner = '#';
var beginner = activePlayer;


// <button id="start" onclick="start()">Start!</button>

function reset() {
    activePlayer = beginner;
    resetVars();
}

function setBtnState(func) {
    btn.removeEventListener('click', start);
    btn.removeEventListener('click', reset);

    var txt = 'Start';
    if (func == reset)
        txt = 'Reset';
    
    btn.innerHTML = txt;

    btn.addEventListener('click', func)
}

function start() {
    updateRound();
    
    if (activePlayer == winner)
        changePlayer();
    beginner = activePlayer;

    resetVars();
    setBtnState(reset);
}

function resetVars() {
    round_end = false;
    positions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    winner = '#';
    clearTable();
}

function updateRound() {
    rounds++;
    var round = document.getElementById('winner');
    round.textContent = 'Round ' + rounds;
}

function onClickCell() {
    var id = this.id;
    var cell = document.getElementById(id);

    if (!cellIsFree(cell))
        return;

    cell.removeEventListener('click', onClickCell);
    setSymbol(cell);
    setPositions(id);
    getWinner();
}

function setSymbol(cell) {
    cell.className = activePlayer;
    cell.innerHTML = activePlayer;
}

function getWinner() {
    winner = checkWinner();
    if (winner == '#') {
        changePlayer();
    } else {
        winnerFound();
    }
}

function changePlayer() {
    if (activePlayer == 'X') {
        activePlayer = 'O';
    } else {
        activePlayer = 'X';
    }
}

function winnerFound() {
    lockTable();
    updateScore();
    winnerMessage();
    setBtnState(start);
    round_end = true;
}

function lockTable() {
    for (var i = 0; i < 9; i++) {
        var cell = document.getElementById(i);
        cell.removeEventListener('click', onClickCell);
    }
}

function updateScore() {
    var score = document.getElementById('score');
    if (winner == 'X') {
        scoreX += 1;
        var value = score.getElementsByClassName('X');
        value[0].textContent = scoreX;
    } else {
        scoreO += 1;
        var value = score.getElementsByClassName('O');
        value[0].textContent = scoreO;
    }
}

function winnerMessage() {
    var label = document.getElementById('winner');
    var message = '<span class="' + activePlayer + '">' + activePlayer + '</span>wins Round ' + rounds;
    label.innerHTML = message;
}

function cellIsFree(cell) {
    console.log(cell);
    return cell.innerHTML == '';
}

function setPositions(id) {
    positions[id] = -1;
    if (activePlayer == 'X')
        positions[id] = 1;
}

function clearTable() {
    for (var i = 0; i < 9; i++) {
        var field = document.getElementById(i);
        field.innerHTML = '';
        field.className = '';
        field.addEventListener('click', onClickCell);
    }
}

function checkWinner() {
    var winner = '#';
    var line = positions[0] + positions[1] + positions[2];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    line = positions[3] + positions[4] + positions[5];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    line = positions[6] + positions[7] + positions[8];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    line = positions[0] + positions[3] + positions[6];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    line = positions[1] + positions[4] + positions[7];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    line = positions[2] + positions[5] + positions[8];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    line = positions[0] + positions[4] + positions[8];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    line = positions[6] + positions[4] + positions[2];
    if (line == 3 || line == -3) {
        winner = activePlayer;
    }
    return winner;
}