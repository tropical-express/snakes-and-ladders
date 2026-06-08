const board = document.getElementById("board");
const log = document.getElementById("log");
const diceImg = document.getElementById("diceImg");

// Snakes & ladders
const jumps = {
  3: 22, 5: 8, 11: 26, 20: 29,
  27: 1, 21: 9, 17: 4, 19: 7,
  52: 72, 57: 96, 60: 83,
  98: 78
};

let p1 = 1;
let p2 = 1;
let turn = 1;
let rolling = false;

// build zig-zag board
function createBoard() {
  let nums = [];
  let left = true;

  for (let r = 0; r < 10; r++) {
    let row = [];
    for (let c = 0; c < 10; c++) {
      row.push(r * 10 + c + 1);
    }
    if (!left) row.reverse();
    nums = nums.concat(row);
    left = !left;
  }

  nums.reverse();

  nums.forEach(n => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = "cell-" + n;
    cell.innerText = n;
    board.appendChild(cell);
  });

  draw();
}

function draw() {
  document.querySelectorAll(".token").forEach(t => t.remove());

  addToken(p1, "assets/red.png");
  addToken(p2, "assets/blue.png");
}

function addToken(pos, img) {
  const cell = document.getElementById("cell-" + pos);

  const token = document.createElement("img");
  token.src = img;
  token.className = "token";

  cell.appendChild(token);
}

function setDice(n) {
  diceImg.src = `assets/dice-${n}.png`;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function move(player, steps) {
  for (let i = 0; i < steps; i++) {
    await sleep(120);

    if (player === 1) {
      p1 = Math.min(100, p1 + 1);
    } else {
      p2 = Math.min(100, p2 + 1);
    }

    draw();
  }
}

async function rollDice() {
  if (rolling) return;
  rolling = true;

  const dice = Math.floor(Math.random() * 6) + 1;
  setDice(dice);

  log.innerText = `Player ${turn} rolled ${dice}`;

  await move(turn, dice);

  let pos = turn === 1 ? p1 : p2;

  if (jumps[pos]) {
    const old = pos;
    pos = jumps[pos];

    log.innerText += ` → ${old} → ${pos}`;

    if (turn === 1) p1 = pos;
    else p2 = pos;

    draw();
  }

  if (pos === 100) {
    log.innerText = `🎉 Player ${turn} wins!`;
    rolling = false;
    return;
  }

  turn = turn === 1 ? 2 : 1;
  rolling = false;
}

createBoard();