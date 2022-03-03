export {};
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const START_LENGTH = 5;
const STARTPOS = { x: 4, y: 8 };
const STARTAPPLEPOS = { x: 12, y: 8 };

class Game {
  gridScale!: number;
  x!: number;
  y!: number;
  trail!: Array<{
    x: number;
    y: number;
    facing: "up" | "down" | "left" | "right";
  }>;
  direction: "up" | "down" | "left" | "right" = "right";
  gridSize!: number;
  score: number = 0;
  applePos!: Array<{ x: number; y: number }>;
  currentSubTick: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 0;
  tickInterval!: number;
  constructor(firstRun: boolean) {
    this.start(firstRun);
  }
  start(firstRun: boolean) {
    this.trail = [
      { x: STARTPOS.x, y: STARTPOS.y, facing: "right" },
      { x: STARTPOS.x - 1, y: STARTPOS.y, facing: "right" },
      { x: STARTPOS.x - 2, y: STARTPOS.y, facing: "right" },
    ];
    this.direction = "right";
    this.gridSize = 16;
    this.gridScale = canvas.width / this.gridSize;
    this.score = 0;
    this.applePos = [];
    this.x = STARTPOS.x;
    this.y = STARTPOS.y;
    this.applePos.push(STARTAPPLEPOS);
    if (firstRun === true) {
      this.render();
      this.tickInterval = setInterval(this.handleSubTick.bind(this), 10);
    }
  }
  handleSubTick() {
    this.currentSubTick++;
    if (this.currentSubTick === 10) {
      this.currentSubTick = 0;
      this.tick();
    }
  }
  reset() {
    this.start(false);
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
    ctx.fillStyle = "#008800";
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
    // draw apple
    ctx.fillStyle = "yellow";
    for (let i = 0; i < this.applePos.length; i++) {
      ctx.fillRect(
        this.applePos[i].x * this.gridScale + this.gridScale / 5,
        this.applePos[i].y * this.gridScale + this.gridScale / 5,
        this.gridScale - (this.gridScale / 5) * 2,
        this.gridScale - (this.gridScale / 5) * 2
      );
    }
    // draw snake trail with the sub tick added as an offset in the direction the segment is facing
    ctx.fillStyle = "red";
    for (let i = 0; i < this.trail.length; i++) {
      switch (this.trail[i].facing) {
        case "up":
          ctx.fillRect(
            this.trail[i].x * this.gridScale,
            this.trail[i].y * this.gridScale -
              (this.currentSubTick * this.gridScale) / 10,
            this.gridScale,
            this.gridScale
          );
          break;
        case "down":
          ctx.fillRect(
            this.trail[i].x * this.gridScale,
            this.trail[i].y * this.gridScale +
              (this.currentSubTick * this.gridScale) / 10,
            this.gridScale,
            this.gridScale
          );
          break;
        case "left":
          ctx.fillRect(
            this.trail[i].x * this.gridScale -
              (this.currentSubTick * this.gridScale) / 10,
            this.trail[i].y * this.gridScale,
            this.gridScale,
            this.gridScale
          );
          break;
        case "right":
          ctx.fillRect(
            this.trail[i].x * this.gridScale +
              (this.currentSubTick * this.gridScale) / 10,
            this.trail[i].y * this.gridScale,
            this.gridScale,
            this.gridScale
          );
          break;
      }
    }
    // draw snake head
    ctx.fillStyle = "black";
    switch (this.direction) {
      case "right":
        ctx.fillRect(
          this.x * this.gridScale + (this.currentSubTick * this.gridScale) / 10,
          this.y * this.gridScale,
          this.gridScale,
          this.gridScale
        );
        ctx.fillRect(
          this.x * this.gridScale +
            (this.currentSubTick * this.gridScale) / 10 +
            this.gridScale / 2,
          this.y * this.gridScale + this.gridScale / 2 - this.gridScale / 20,
          this.gridScale,
          this.gridScale / 10
        );
        break;
      case "left":
        ctx.fillRect(
          this.x * this.gridScale - (this.currentSubTick * this.gridScale) / 10,
          this.y * this.gridScale,
          this.gridScale,
          this.gridScale
        );
        ctx.fillRect(
          this.x * this.gridScale -
            (this.currentSubTick * this.gridScale) / 10 -
            this.gridScale / 2,
          this.y * this.gridScale + this.gridScale / 2 - this.gridScale / 20,
          this.gridScale,
          this.gridScale / 10
        );
        break;
      case "up":
        ctx.fillRect(
          this.x * this.gridScale,
          this.y * this.gridScale - (this.currentSubTick * this.gridScale) / 10,
          this.gridScale,
          this.gridScale
        );
        ctx.fillRect(
          this.x * this.gridScale + this.gridScale / 2 - this.gridScale / 20,
          this.y * this.gridScale -
            (this.currentSubTick * this.gridScale) / 10 -
            this.gridScale / 2,
          this.gridScale / 10,
          this.gridScale
        );
        break;
      case "down":
        ctx.fillRect(
          this.x * this.gridScale,
          this.y * this.gridScale + (this.currentSubTick * this.gridScale) / 10,
          this.gridScale,
          this.gridScale
        );
        ctx.fillRect(
          this.x * this.gridScale + this.gridScale / 2 - this.gridScale / 20,
          this.y * this.gridScale +
            (this.currentSubTick * this.gridScale) / 10 +
            this.gridScale / 2,
          this.gridScale / 10,
          this.gridScale
        );
        break;
    }
    // render  white text and all the values in the game class
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + this.score, 10, 30);
    ctx.fillText("Grid Size: " + this.gridSize, 10, 50);
    ctx.fillText("Grid Scale: " + this.gridScale, 10, 70);
    ctx.fillText("Direction: " + this.direction, 10, 90);
    ctx.fillText("Tick: " + this.tickInterval, 10, 110);
    ctx.fillText("SubTick: " + this.currentSubTick, 10, 130);
    ctx.fillText("Snake Length: " + this.trail.length, 10, 150);
    ctx.fillText("Snake Pos: " + this.x + "," + this.y, 10, 170);
    // snake segment positions
    ctx.fillText("Segment Pos: ", 10, 190);
    for (let i = 0; i < this.trail.length; i++) {
      ctx.fillText(this.trail[i].x + "," + this.trail[i].y, 10, 210 + i * 20);
    }
    requestAnimationFrame(this.render.bind(this));
  }
  tick() {
    if (this.direction !== this.trail[0].facing) {
      this.trail[0].facing = this.direction;
    }
    for (let i = this.trail.length; i > 1; i--) {
      // set the segment positions to the previous segment positions
      if (
        this.trail[i - 2].x > this.trail[i - 1].x &&
        this.trail[i - 2].x - 1 !== this.trail[i - 1].x
      )
        this.trail[i - 1].x++;
      if (
        this.trail[i - 2].x < this.trail[i - 1].x &&
        this.trail[i - 2].x + 1 !== this.trail[i - 1].x
      )
        this.trail[i - 1].x--;
      if (
        this.trail[i - 2].y > this.trail[i - 1].y &&
        this.trail[i - 2].y + 1 !== this.trail[i - 1].y
      )
        this.trail[i - 1].y++;
      if (
        this.trail[i - 2].y < this.trail[i - 1].y &&
        this.trail[i - 2].y - 1 !== this.trail[i - 1].y
      )
        this.trail[i - 1].y--;
      this.trail[i - 1].facing = this.trail[i - 2].facing;
    }

    this.applePos.forEach(apple => {
      if (this.x === apple.x && this.y === apple.y) {
        // remove apple
        this.applePos.splice(this.applePos.indexOf(apple), 1);
        this.score++;
        // add new apple at a random position where there is no snake
        let newApple = () => {
          return {
            x: Math.floor(Math.random() * this.gridSize),
            y: Math.floor(Math.random() * this.gridSize),
          };
        };
        while (
          this.trail.some(
            segment => segment.x === newApple().x && segment.y === newApple().y
          )
        ) {
          newApple();
        }
        this.applePos.push(newApple());
        // add a segment to the end of the snake's current last trail segment
        switch (this.trail[this.trail.length - 1].facing) {
          case "right":
            this.trail.push({
              x: this.trail[this.trail.length - 1].x - 1,
              y: this.trail[this.trail.length - 1].y,
              facing: this.trail[this.trail.length - 1].facing,
            });
            break;
          case "left":
            this.trail.push({
              x: this.trail[this.trail.length - 1].x + 1,
              y: this.trail[this.trail.length - 1].y,
              facing: this.trail[this.trail.length - 1].facing,
            });
            break;
          case "up":
            this.trail.push({
              x: this.trail[this.trail.length - 1].x,
              y: this.trail[this.trail.length - 1].y - 1,
              facing: this.trail[this.trail.length - 1].facing,
            });
            break;
          case "down":
            this.trail.push({
              x: this.trail[this.trail.length - 1].x,
              y: this.trail[this.trail.length - 1].y + 1,
              facing: this.trail[this.trail.length - 1].facing,
            });
            break;
        }
      }
    });
    switch (this.direction) {
      case "right":
        // check if snake is 2 grid tile away from wall
        if (this.x === this.gridSize - 2) {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 20);
        } else {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 10);
        }
        this.x++;
        // for all the segments in the trail increment their x value by 1
        for (let i = 0; i < this.trail.length; i++) {
          this.trail[i].x++;
        }
        break;
      case "left":
        // check if snake is 2 grid tile away from wall
        if (this.x === 1) {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 20);
        } else {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 10);
        }
        this.x--;
        // for all the segments in the trail decrement their x value by 1
        for (let i = 0; i < this.trail.length; i++) {
          this.trail[i].x--;
        }
        break;
      case "up":
        // check if snake is 2 grid tile away from wall
        if (this.y === 1) {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 20);
        } else {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 10);
        }
        this.y--;
        // for all the segments in the trail decrement their y value by 1
        for (let i = 0; i < this.trail.length; i++) {
          this.trail[i].y--;
        }
        break;
      case "down":
        // check if snake is 1 grid tile away from wall
        if (this.y === this.gridSize - 2) {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 20);
        } else {
          clearInterval(this.tickInterval);
          this.tickInterval = setInterval(this.handleSubTick.bind(this), 10);
        }
        this.y++;
        // for all the segments in the trail increment their y value by 1
        for (let i = 0; i < this.trail.length; i++) {
          this.trail[i].y++;
        }
        break;
      default:
        break;
    }
    if (this.isSnakeOutOfGameWalls()) {
      this.reset();
    }
    // check if snake hit itself
    for (let i = 1; i < this.trail.length; i++) {
      // if snake head hits a part of its body
      if (this.trail[i].x === this.x && this.trail[i].y === this.y) {
        this.reset();
      }
    }
  }
}

let game = new Game(true);

window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      // if the snake is not going down
      if (game.direction !== "down") {
        game.direction = "up";
      }
      break;
    case "ArrowDown":
      // if the snake is not going up
      if (game.direction !== "up") {
        game.direction = "down";
      }
      break;
    case "ArrowLeft":
      // if the snake is not going right
      if (game.direction !== "right") {
        game.direction = "left";
      }
      break;
    case "ArrowRight":
      // if the snake is not going left
      if (game.direction !== "left") {
        game.direction = "right";
      }
      break;
  }
});
