let scores, currentScore, activePlayer, playing;


const btnNew = document.getElementById('btnNew');
const btnRoll = document.getElementById('btnRoll');
const btnHold = document.getElementById('btnHold');
const diceEl = document.getElementById('diceGraphic');
const score0El = document.getElementById('score0');
const score1El = document.getElementById('score1');
const current0El = document.getElementById('current0');
const current1El = document.getElementById('current1');
const playerSection0 = document.getElementById('playerSection0');
const playerSection1 = document.getElementById('playerSection1');


function resetGame(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    playerSection0.style.backgroundColor = 'rgb(238, 181, 214)';
    playerSection1.style.backgroundColor = 'rgb(202, 109, 163)';

}

resetGame();

function switchPlayer() {
    document.getElementById(`current${activePlayer}`).textContent = 0;
    currentScore = 0;
    playerSection0.classList.toggle('player-active');
    playerSection1.classList.toggle('player-active');
}

btnRoll.addEventListener('click', function(){
    if (!playing) return;
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.style.display = 'block';

    if(dice > 1){
        currentScore = currentScore + dice;

        document.getElementById(`current${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer()
    }
});

btnHold.addEventListener('click', function(){
    if (!playing) return;
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score${activePlayer}`).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 10){
        playing = false;
        const winnerSection = document.getElementById(`playerSection${activePlayer}`);
        winnerSection.classList.add('player-winner');
        winnerSection.classList.remove('player-active');
        winnerSection.querySelector('h3').textContent = `🏆 Player ${activePlayer + 1} Wins!`;
        btnRoll.disabled = btnHold.disabled = true;
    } else {
        switchPlayer();
    }
})

btnNew.addEventListener('click', resetGame);
