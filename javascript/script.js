document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const dice = document.querySelector(".dice");
  const scores = [0, 0];
  const currentScores = [0, 0];
  let activePlayer = 0;
  let playing = true;

  // Buttons
  const btnRoll = document.querySelector(".btn--roll");
  const btnNew = document.querySelector(".btn--new");
  const btnHold = document.querySelector(".btn--hold");
  // Update the UI based on the current state
  const updateUI = () => {
    document.getElementById(`score--0`).textContent = scores[0];
    document.getElementById(`score--1`).textContent = scores[1];
    document.getElementById(`current--0`).textContent = currentScores[0];
    document.getElementById(`current--1`).textContent = currentScores[1];

    // Update active player styling
    document
      .querySelector(".player--0")
      .classList.toggle("player--active", activePlayer === 0);
    document
      .querySelector(".player--1")
      .classList.toggle("player--active", activePlayer === 1);

    // Hide dice initially
    dice.classList.add("hidden");
  };

  // Switch to the next player
  const switchPlayer = () => {
    currentScores[activePlayer] = 0; // Reset current score
    activePlayer = activePlayer === 0 ? 1 : 0; // Switch player
    updateUI(); // Update the UI to reflect the changes
  };

  // Roll dice functionality
  document.querySelector(".btn--roll").addEventListener("click", function () {
    if (playing) {
      // Generate a random dice roll
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      dice.src = `./image/dice-${diceRoll}.png`; // Update dice image
      dice.classList.remove("hidden"); // Show the dice

      if (diceRoll !== 1) {
        // Add dice roll to the current score
        currentScores[activePlayer] += diceRoll;
        updateUI(); // Update UI with new scores
      } else {
        // Switch player if dice roll is 1
        switchPlayer();
      }
    }
  });

  // Hold functionality
  document.querySelector(".btn--hold").addEventListener("click", () => {
    if (playing) {
      // Add current score to the player's total score
      scores[activePlayer] += currentScores[activePlayer];
      currentScores[activePlayer] = 0; // Reset current score

      // Check if the player has won
      if (scores[activePlayer] >= 100) {
        playing = false;
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[activePlayer];
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        alert(`Player ${activePlayer + 1} wins!`);
      } else {
        // Switch player if no win
        switchPlayer();
      }
    }
  });

  // New game functionality
  document.querySelector(".btn--new").addEventListener("click", () => {
    // Reset all game variables
    scores[0] = 0;
    scores[1] = 0;
    currentScores[0] = 0;
    currentScores[1] = 0;
    activePlayer = 0;
    playing = true;

    // Remove winner styling
    document
      .querySelectorAll(".player")
      .forEach((p) => p.classList.remove("player--winner"));

    // Update the UI to reset the game
    updateUI();
  });

  // Initial UI update
  updateUI();
});
