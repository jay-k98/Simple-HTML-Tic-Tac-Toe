var rounds = 0;
var scoreX = 0;
var scoreO = 0;
var activePlayer;
var positions;

function start() {
    rounds++;
    positions = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    activePlayer = 'X';
    clearTable();
    var round = document.getElementById('winner');
    round.textContent = 'Round ' + rounds;
}

function clearTable() {
    for (var i = 0; i < 9; i++) {
        var field = document.getElementById(i);
        field.innerHTML = '';
        field.className = '';
        field.addEventListener('click', setSymbol);
    }
}

function changePlayer() {
    if (activePlayer == 'X') {
        activePlayer = 'O';
    } else {
        activePlayer = 'X';
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

function setSymbol() {
    var id = this.id;
    var field = document.getElementById(id);

    if (field.innerHTML == '') {
        field.className = activePlayer;
        field.innerHTML = activePlayer;
        if (activePlayer == 'X') {
            positions[id] = 1;
        } else {
            positions[id] = -1;
        }

        var winner = checkWinner();
        if (winner == '#') {
            changePlayer();
        } else {
            if (winner == 'X') {
                scoreX += 1;
                var score = document.getElementById('score');
                var value = score.getElementsByClassName('X');
                value[0].textContent = scoreX;
            } else {
                scoreO += 1;
                var score = document.getElementById('score');
                var value = score.getElementsByClassName('O');
                value[0].textContent = scoreO;
            }
            var label = document.getElementById('winner');
            var message = '<span class="' + winner + '">' + winner + '</span>wins Round ' + rounds;
            label.innerHTML = message;
            lockTable();
        }
    }
}

function lockTable() {
    for (var i = 0; i < 9; i++) {
        var field = document.getElementById(i);
        field.removeEventListener('click', setSymbol);
    }
}