export {};
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const START_LENGTH = 5;
const STARTPOS = { x: 4, y: 8 };
const STARTAPPLEPOS = { x: 12, y: 8 };

class Game {
  snake!: Snake;
  tileScale!: number;
  constructor() {
    this.startGame();
  }
  assignGameListeners() {
    // add event listeners
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      this.snake.keyPress(e.key);
    });
    setInterval(() => {
      this.tick();
    }, 10);
  }
  startGame() {
    this.tileScale = canvas.width / 25;
    this.snake = new Snake(this.tileScale);
    this.assignGameListeners();
  }
  tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.snake.move();
    this.snake.render();
  }
}

class Snake {
  x: number;
  y: number;
  tileScale: number;
  trail: Array<{ x: number; y: number }> = [];
  direction: string;
  constructor(tileScale: number) {
    this.x = STARTPOS.x;
    this.y = STARTPOS.y;
    this.tileScale = tileScale;
    this.direction = "right";
  }
  keyPress(key: string) {
    switch (key) {
      case "ArrowUp":
        this.direction = "up";
        break;
      case "ArrowDown":
        this.direction = "down";
        break;
      case "ArrowLeft":
        this.direction = "left";
        break;
      case "ArrowRight":
        this.direction = "right";
        break;
      default:
        break;
    }
  }
  render() {
    // draw snake head
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(
      this.x * this.tileScale,
      this.y * this.tileScale,
      this.tileScale,
      this.tileScale
    );
    // draw snake trail
    ctx.fillStyle = "green";
    this.trail.forEach(pos => {
      ctx.fillRect(
        pos.x * this.tileScale,
        pos.y * this.tileScale,
        this.tileScale,
        this.tileScale
      );
    });
    // draw a grid based on the tile scale
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += this.tileScale) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
    }
    for (let i = 0; i < canvas.height; i += this.tileScale) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();
  }
  move() {
    console.log(this);
    // move snake
    switch (this.direction) {
      case "up":
        this.y -= 0.1;
        if (this.x > nearestMultiple(this.x, this.tileScale)) {
          if (this.x - nearestMultiple(this.x, this.tileScale) > 0.1) {
            this.x += 0.1;
          } else {
            this.x = nearestMultiple(this.x, this.tileScale);
          }
        } else if (this.x < nearestMultiple(this.x, this.tileScale)) {
          if (nearestMultiple(this.x, this.tileScale) - this.x > 0.1) {
            this.x -= 0.1;
          } else {
            this.x = nearestMultiple(this.x, this.tileScale);
          }
        }
        break;
      case "down":
        this.y += 0.1;
        if (this.x > nearestMultiple(this.x, this.tileScale)) {
          if (this.x - nearestMultiple(this.x, this.tileScale) > 0.1) {
            this.x += 0.1;
          } else {
            this.x = nearestMultiple(this.x, this.tileScale);
          }
        } else if (this.x < nearestMultiple(this.x, this.tileScale)) {
          if (nearestMultiple(this.x, this.tileScale) - this.x > 0.1) {
            this.x -= 0.1;
          } else {
            this.x = nearestMultiple(this.x, this.tileScale);
          }
        }
        break;
      case "left":
        this.x -= 0.1;
        if (this.y > nearestMultiple(this.y, this.tileScale)) {
          if (this.y - nearestMultiple(this.y, this.tileScale) > 0.1) {
            this.y += 0.1;
          } else {
            this.y = nearestMultiple(this.y, this.tileScale);
          }
        } else if (this.y < nearestMultiple(this.y, this.tileScale)) {
          if (nearestMultiple(this.y, this.tileScale) - this.y > 0.1) {
            this.y -= 0.1;
          } else {
            this.y = nearestMultiple(this.y, this.tileScale);
          }
        }
        break;
      case "right":
        this.x += 0.1;
        if (this.y > nearestMultiple(this.y, this.tileScale)) {
          if (this.y - nearestMultiple(this.y, this.tileScale) > 0.1) {
            this.y += 0.1;
          } else {
            this.y = nearestMultiple(this.y, this.tileScale);
          }
        } else if (this.y < nearestMultiple(this.y, this.tileScale)) {
          if (nearestMultiple(this.y, this.tileScale) - this.y > 0.1) {
            this.y -= 0.1;
          } else {
            this.y = nearestMultiple(this.y, this.tileScale);
          }
        }
        break;
      default:
        break;
    }
    // add new head to trail
    this.trail.push({ x: this.x, y: this.y });
    // remove tail
    this.trail.shift();
  }
}

new Game();

function nearestMultiple(input: number, multiple: number) {
  return Math.ceil(input / multiple) * multiple;
}
