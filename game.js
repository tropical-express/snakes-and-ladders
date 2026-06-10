const diceImg = document.getElementById("diceImg");
const log = document.getElementById("log");
const rollBtn = document.getElementById("rollBtn");
const restartBtn = document.getElementById("restartBtn");

const positions = {};

const jumps = {
  3: 22,
  5: 8,
  11: 26,
  20: 29,

  17: 4,
  19: 7,
  21: 9,
  27: 1,

  52: 72,
  57: 96,
  60: 83,

  98: 78
};

let p1 = 1;
let p2 = 1;
let turn = 1;
let rolling = false;
let gameOver = false;

function generatePositions() {

  const squareSize = 80;

  for (let row = 0; row < 10; row++) {

    for (let col = 0; col < 10; col++) {

      let number;

      if (row % 2 === 0) {
        number = row * 10 + col + 1;
      } else {
        number = row * 10 + (9 - col) + 1;
      }

      positions[number] = {
        x: col * squareSize + 24,
        y: (9 - row) * squareSize + 24
      };
    }
  }
}

function drawPlayers() {

  const red = document.getElementById("p1");
  const blue = document.getElementById("p2");

  red.style.left = positions[p1].x + "px";
  red.style.top = positions[p1].y + "px";

  blue.style.left = positions[p2].x + 20 + "px";
  blue.style.top = positions[p2].y + "px";
}

function setDice(number) {
  diceImg.src = `assets/dice-${number}.png`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateMove(player, steps) {

  for (let i = 0; i < steps; i++) {

    await sleep(150);

    if (player === 1) {
      p1 = Math.min(100, p1 + 1);
    } else {
      p2 = Math.min(100, p2 + 1);
    }

    drawPlayers();
  }
}

async function rollDice() {

  if (rolling) return;
  if (gameOver) return;

  rolling = true;

  const dice = Math.floor(Math.random() * 6) + 1;

  setDice(dice);

  log.textContent = `Player ${turn} rolled ${dice}`;

  await animateMove(turn, dice);

  let position = turn === 1 ? p1 : p2;

  if (jumps[position]) {

    const oldPosition = position;
    position = jumps[position];

    if (position > oldPosition) {
      log.textContent =
        `Player ${turn} climbed a ladder! ${oldPosition} → ${position}`;
    } else {
      log.textContent =
        `Player ${turn} slid down a snake! ${oldPosition} → ${position}`;
    }

    await sleep(500);

    if (turn === 1) {
      p1 = position;
    } else {
      p2 = position;
    }

    drawPlayers();
  }

  if (position === 100) {

    gameOver = true;

    log.textContent = `🎉 Player ${turn} wins!`;

    restartBtn.style.display = "inline-block";

    rolling = false;
    return;
  }

  turn = turn === 1 ? 2 : 1;

  log.textContent += ` | Player ${turn}'s turn`;

  rolling = false;
}

function restartGame() {

  p1 = 1;
  p2 = 1;
  turn = 1;

  rolling = false;
  gameOver = false;

  setDice(1);

  drawPlayers();

  restartBtn.style.display = "none";

  log.textContent = "Player 1 starts";
}

rollBtn.addEventListener("click", rollDice);
restartBtn.addEventListener("click", restartGame);

generatePositions();
drawPlayers();