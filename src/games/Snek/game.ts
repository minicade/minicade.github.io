const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const START_LENGTH = 5;
const STARTPOS = { x: -4, y: 0 };
const STARTAPPLEPOS = { x: -3, y: 0 };

class Game {
  gridScale: number;
  x: number;
  y: number;
  trail: Array<{ x: number; y: number }>;
  direction: string;
  gridSize: number;
  score: number;
  applePos: Array<{ x: number; y: number }>;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.trail = [];
    this.direction = "right";
    this.gridSize = 20;
    this.gridScale = canvas.width / this.gridSize;
    this.score = 0;
    this.applePos = [];
    this.render();
    setInterval(this.tick.bind(this), 250);
  }
  reset() {
    this.x = 0;
    this.y = 0;
    this.trail = [];
    this.direction = "right";
    this.gridSize = 20;
    this.gridScale = canvas.width / this.gridSize;
    this.score = 0;
    this.applePos = [];
    this.render();
  }
  isSnakeOutOfGameWalls() {
    if (
      this.x < 0 ||
      this.x > this.gridSize - 1 ||
      this.y < 0 ||
      this.y > this.gridSize - 1
    ) {
      return true;
    }
    return false;
  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(
      0,
      0,
      this.gridSize * this.gridScale,
      this.gridSize * this.gridScale
    );
    for (let i = 0; i < this.gridSize; i++) {
      // draw grid
      ctx.fillStyle = "#00000033";
      ctx.lineWidth = 0.25;
      ctx.beginPath();
      ctx.moveTo(i * this.gridScale, 0);
      ctx.lineTo(i * this.gridScale, this.gridSize * this.gridScale);
      ctx.moveTo(0, i * this.gridScale);
      ctx.lineTo(this.gridSize * this.gridScale, i * this.gridScale);
      ctx.stroke();
    }
    // draw snake
    ctx.fillStyle = "red";
    for (let i = 0; i < this.trail.length; i++) {
      ctx.fillRect(
        this.trail[i].x * this.gridScale,
        this.trail[i].y * this.gridScale,
        this.gridScale,
        this.gridScale
      );
    }
    // draw snake head
    ctx.fillStyle = "black";
    ctx.fillRect(
      this.x * this.gridScale,
      this.y * this.gridScale,
      this.gridScale,
      this.gridScale
    );

    // draw apple
    ctx.fillStyle = "yellow";
    for (let i = 0; i < this.applePos.length; i++) {
      ctx.fillRect(
        this.applePos[i].x * this.gridScale,
        this.applePos[i].y * this.gridScale,
        this.gridScale,
        this.gridScale
      );
    }
    requestAnimationFrame(this.render.bind(this));
  }
  tick() {
    switch (this.direction) {
      case "right":
        this.x++;
        break;
      case "left":
        this.x--;
        break;
      case "up":
        this.y--;
        break;
      case "down":
        this.y++;
        break;
      default:
        break;
    }
    if (this.isSnakeOutOfGameWalls()) {
      this.reset();
    }
  }
}

let game = new Game();

window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      game.direction = "up";
      break;
    case "ArrowDown":
      game.direction = "down";
      break;
    case "ArrowLeft":
      game.direction = "left";
      break;
    case "ArrowRight":
      game.direction = "right";
      break;
  }
});
