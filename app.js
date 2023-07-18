// Variables:
let flippedCards = 0;
let pairs = 0;
let moves = 0;
let score = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;

// Point to HTML doc
let showMoves = document.getElementById('moves');
let showScores = document.getElementById('score');
let showTime = document.getElementById('t-left');

// Generate random numbers:
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(function() {
  return Math.random() - 0.5;
});
console.log(numbers);

// Functions:
function countTime() {
  timeRegresivo = setInterval(() => {
    showTime.innerHTML = `Time: ${timer} seconds`;
    timer--;
    if (timer < 0) {
      clearInterval(timeRegresivo);
      blockCards(numbers);
    }
  }, 1000);
}

function blockCards(numbers) {
  for (let i = 0; i <= 15; i++) {
    let cardBlocked = document.getElementById(i);
    cardBlocked.innerHTML = numbers[i];
    cardBlocked.disabled = true;
  }
}

// Main Function:
function flip(id) {
  if (temporizador === false) {
    countTime();
    temporizador = true;
  }

  if (flippedCards === 0) {
    // Show first number
    let card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = firstResult;
    // Disable first button
    card1.disabled = true;
    flippedCards++;
    console.log(flippedCards);

    firstId = id;
  } else if (flippedCards === 1) {
    // Show second number
    let card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = secondResult;
    // Disable second button
    card2.disabled = true;
    flippedCards++;

    secondId = id;

    // Add moves
    moves++;
    showMoves.innerHTML = `Moves: ${moves}`;

    if (firstResult == secondResult) {
      // Set counter flippedCards back to zero
      flippedCards = 0;
      pairs++;
      // Add score
      score++;
      showScores.innerHTML = `Score: ${score}`;
    } else {
      // Show momentarily values and hide again
      setTimeout(() => {
        card1 = document.getElementById(firstId);
        card2 = document.getElementById(secondId);
        card1.innerHTML = ' ';
        card2.innerHTML = ' ';
        card1.disabled = false;
        card2.disabled = false;
        flippedCards = 0;
      }, 500);
    }
  }

  if (pairs === 8) {
    clearInterval(timeRegresivo);
    showScores.innerHTML = `Score: ${score} matches 🎉`;
    showTime.innerHTML = `Awesome! You made it in ${timerInicial - timer - 1} seconds`;
    showMoves.innerHTML = `Moves: ${moves} 😎👍`;
  }
}