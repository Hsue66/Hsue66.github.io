(() => {
  const canvas = document.querySelector("#game-board");
  const startButton = document.querySelector("#start-game");
  const pauseButton = document.querySelector("#pause-game");
  const restartButton = document.querySelector("#restart-game");
  const scoreElement = document.querySelector("#score");
  const highScoreElement = document.querySelector("#high-score");
  const statusElement = document.querySelector("#game-status");
  const messageElement = document.querySelector("#game-message");
  const touchButtons = document.querySelectorAll("[data-direction]");

  if (!canvas || !startButton || !pauseButton || !restartButton) return;

  const context = canvas.getContext("2d");
  const gridSize = 20;
  const cellSize = canvas.width / gridSize;
  const tickSpeed = 125;
  const directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  const state = {
    worm: [],
    direction: directions.right,
    nextDirection: directions.right,
    dotling: { x: 5, y: 5, danger: false },
    score: 0,
    highScore: readHighScore(),
    status: "ready",
    timerId: null,
    tickCount: 0
  };

  function readHighScore() {
    try { return Number(window.localStorage.getItem("worm-high-score")) || 0; } catch { return 0; }
  }

  function saveHighScore() {
    try { window.localStorage.setItem("worm-high-score", String(state.highScore)); } catch { /* Storage is optional. */ }
  }

  function resetState() {
    stopTimer();
    state.worm = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    state.direction = directions.right;
    state.nextDirection = directions.right;
    state.dotling = { x: 5, y: 5, danger: false };
    state.score = 0;
    state.status = "ready";
    state.tickCount = 0;
    updateHud("READY", "Press Start when you’re ready.");
    draw();
  }

  function startGame() {
    if (state.status === "playing") return;
    stopTimer();
    if (state.status === "gameover") resetState();
    state.status = "playing";
    state.timerId = window.setInterval(tick, tickSpeed);
    updateHud("RUNNING", "Collect the Dotling when it is friendly.");
  }

  function stopTimer() {
    if (state.timerId !== null) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function pauseGame() {
    if (state.status !== "playing") return;
    stopTimer();
    state.status = "paused";
    updateHud("PAUSED", "Press Pause again or Space to continue.");
  }

  function togglePause() {
    if (state.status === "playing") pauseGame();
    else if (state.status === "paused") startGame();
  }

  function setDirection(name) {
    const next = directions[name];
    if (!next || state.status === "gameover") return;
    const reversing = next.x + state.direction.x === 0 && next.y + state.direction.y === 0;
    if (!reversing) state.nextDirection = next;
  }

  function tick() {
    state.direction = state.nextDirection;
    const head = state.worm[0];
    const nextHead = { x: head.x + state.direction.x, y: head.y + state.direction.y };
    state.tickCount += 1;
    state.dotling.danger = Math.floor(state.tickCount / 18) % 2 === 1;

    if (hitsWall(nextHead) || hitsWorm(nextHead)) {
      endGame("GAME OVER — your trail got you.");
      return;
    }

    state.worm.unshift(nextHead);
    if (sameCell(nextHead, state.dotling)) {
      if (state.dotling.danger) shrinkWorm();
      else growWorm();
      placeDotling();
    } else {
      state.worm.pop();
    }
    draw();
  }

  function hitsWall(cell) { return cell.x < 0 || cell.y < 0 || cell.x >= gridSize || cell.y >= gridSize; }
  function hitsWorm(cell) { return state.worm.some((segment) => sameCell(segment, cell)); }
  function sameCell(first, second) { return first.x === second.x && first.y === second.y; }

  function growWorm() {
    state.score += 10;
    updateBestScore();
    updateHud("RUNNING", "Dotling eaten — worm extended!");
  }

  function shrinkWorm() {
    state.score = Math.max(0, state.score - 5);
    state.worm.splice(Math.max(1, state.worm.length - 2), 2);
    updateHud("RUNNING", "Dotling bite — worm shortened!");
  }

  function updateBestScore() {
    if (state.score > state.highScore) {
      state.highScore = state.score;
      saveHighScore();
    }
  }

  function placeDotling() {
    const openCells = [];
    for (let y = 0; y < gridSize; y += 1) {
      for (let x = 0; x < gridSize; x += 1) {
        const cell = { x, y };
        if (!state.worm.some((segment) => sameCell(segment, cell))) openCells.push(cell);
      }
    }
    state.dotling = openCells[(state.score + state.tickCount) % openCells.length] || { x: 5, y: 5, danger: false };
    state.dotling.danger = Math.floor(state.tickCount / 18) % 2 === 1;
  }

  function endGame(message) {
    stopTimer();
    state.status = "gameover";
    updateBestScore();
    updateHud("GAME OVER", `${message} Press Restart to try again.`);
  }

  function updateHud(status, message) {
    scoreElement.textContent = String(state.score);
    highScoreElement.textContent = String(state.highScore);
    statusElement.textContent = status;
    messageElement.textContent = message;
    pauseButton.disabled = state.status !== "playing" && state.status !== "paused";
    pauseButton.textContent = state.status === "paused" ? "Resume" : "Pause";
    startButton.disabled = state.status === "playing";
  }

  function draw() {
    context.fillStyle = "#0b170d";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#17351c";
    context.lineWidth = 1;
    for (let i = 0; i <= gridSize; i += 1) {
      context.beginPath(); context.moveTo(i * cellSize, 0); context.lineTo(i * cellSize, canvas.height); context.stroke();
      context.beginPath(); context.moveTo(0, i * cellSize); context.lineTo(canvas.width, i * cellSize); context.stroke();
    }
    drawDotling();
    state.worm.forEach((segment, index) => {
      context.fillStyle = index === 0 ? "#d8ff4f" : "#85b84b";
      context.fillRect(segment.x * cellSize + 2, segment.y * cellSize + 2, cellSize - 4, cellSize - 4);
    });
  }

  function drawDotling() {
    const x = state.dotling.x * cellSize;
    const y = state.dotling.y * cellSize;
    context.fillStyle = state.dotling.danger ? "#ff8848" : "#ffd43b";
    context.fillRect(x + 3, y + 3, cellSize - 6, cellSize - 6);
    context.fillStyle = "#0d140f";
    context.fillRect(x + 7, y + 7, 3, 3);
    context.fillRect(x + cellSize - 10, y + 7, 3, 3);
    context.fillRect(x + 8, y + cellSize - 9, cellSize - 16, 3);
  }

  const keyDirections = { ArrowUp: "up", w: "up", W: "up", ArrowDown: "down", s: "down", S: "down", ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right" };
  document.addEventListener("keydown", (event) => {
    if (keyDirections[event.key]) { event.preventDefault(); setDirection(keyDirections[event.key]); }
    if (event.key === " ") { event.preventDefault(); togglePause(); }
  });
  touchButtons.forEach((button) => button.addEventListener("click", () => setDirection(button.dataset.direction)));
  startButton.addEventListener("click", startGame);
  pauseButton.addEventListener("click", togglePause);
  restartButton.addEventListener("click", () => { resetState(); startGame(); });
  highScoreElement.textContent = String(state.highScore);
  resetState();
})();
