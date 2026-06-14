// ==========================================
// 1. GAME STATE VARIABLES
// ==========================================
let scores, currentScore, activePlayer, playing;

// ==========================================
// DOM ELEMENT SELECTORS (Using your camelCase IDs)
// ==========================================
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

// ==========================================
// 5 & 8. INITIALIZE / RESET ENGINE
// ==========================================
const initGame = function () {
  // FIX: Reset internal game data back to a clean numerical array
  scores =; // Index 0 is Player 1, Index 1 is Player 2
  
  currentScore = 0; 
  activePlayer = 0; 
  playing = true; 

  // Reset visual textual elements (This physically sets your HTML text to 0)
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Reset core element states and styles
  diceEl.style.display = 'none';
  btnRoll.disabled = false;
  btnHold.disabled = false;

  // Manage css layout indicator states
  playerSection0.classList.add('player-active');
  playerSection1.classList.remove('player-active');
  playerSection0.classList.remove('player-winner');
  playerSection1.classList.remove('player-winner');
  
  // Reset heading titles to default configurations
  playerSection0.querySelector('h3').textContent = 'PLAYER 1';
  playerSection1.querySelector('h3').textContent = 'PLAYER 2';
};


// Execute setup parameters on engine loading sequences
initGame();

// ==========================================
// 4. SWITCHING PLAYER ENGINE LOGIC
// ==========================================
const switchPlayer = function () {
  // Clear the visual text score of the current player running field
  document.getElementById(`current${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Swap active numeric positions using ternary evaluation conditional parameters
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle active styling highlights across player container divisions
  playerSection0.classList.toggle('player-active');
  playerSection1.classList.toggle('player-active');
};

// ==========================================
// 2. ROLL DICE BUTTON ENGINE 
// ==========================================
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random engine parameter integer between 1 and 6
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Adjust and project layout dice image graphics matching values
    diceEl.src = `dice-${dice}.png`;
    diceEl.style.display = 'block';

    // 3. Evaluate conditional rule assessments
    if (dice !== 1) {
      // Accumulate tracking point sets to temporary variable pools
      currentScore += dice;
      document.getElementById(`current${activePlayer}`).textContent = currentScore;
    } else {
      // Direct penalty rules execution pathing triggers player layout swapping
      switchPlayer();
    }
  }
});

// ==========================================
// 3. HOLD SCORE BUTTON ENGINE
// ==========================================
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Relocate transient accumulation sets over to active permanent array scores
    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent = scores[activePlayer];

    // ==========================================
    // 7. WINNING CONDITION SCENARIO ASSESSMENTS
    // ==========================================
    if (scores[activePlayer] >= 100) {
      playing = false; // Disables further state alterations internally

      // Set winning visualization banners
      document.getElementById(`playerSection${activePlayer}`).classList.add('player-winner');
      document.getElementById(`playerSection${activePlayer}`).classList.remove('player-active');
      document.querySelector(`#playerSection${activePlayer} h3`).textContent = `🏆 Player ${activePlayer + 1} Wins!`;

      // Physically block buttons from interaction
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      // If nobody won, hand control permissions to the alternative actor
      switchPlayer();
    }
  }
});

// ==========================================
// 5. CONNECT NEW GAME TRIGGER LISTENERS
// ==========================================
btnNew.addEventListener('click', initGame);