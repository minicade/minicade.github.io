export {};
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

console.log("a");
const START_LENGTH = 5;
const START_POS = { x: 4, y: 8 };
const START_APPLE_POS = { x: 12, y: 8 };
const GRID_SCALE = canvas.width / 20;

window.setInterval(() => {
  gameTick();
}, 1000 / 60);

let Listeners: {
  type: string;
  listener: (e: any) => void;
}[] = [];

let Player: {
  x: number;
  y: number;
  length: number;
  direction: "up" | "down" | "left" | "right";
  tail: { x: number; y: number }[];
  score: number;
} = {
  x: START_POS.x,
  y: START_POS.y,
  length: START_LENGTH,
  direction: "right",
  tail: [],
  score: 0,
};

let Fruit = [
  {
    x: 10,
    y: 10,
    type: "apple",
  },
];

function generateFruit() {
  let fruit = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
    type: "apple",
  };
  Fruit.push(fruit);
}

function startGame() {
  Listeners.map(listener =>
    window.removeEventListener(listener.type, listener.listener)
  );
  Listeners = [];
  generateFruit();
  Player = {
    x: START_POS.x,
    y: START_POS.y,
    length: START_LENGTH,
    direction: "right",
    tail: [],
    score: 0,
  };
  Listeners.push({
    type: "keydown",
    listener: (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp" || "w":
          Player.direction = "up";
          break;
        case "ArrowDown" || "s":
          Player.direction = "down";
          break;
        case "ArrowLeft" || "a":
          Player.direction = "left";
          break;
        case "ArrowRight" || "d":
          Player.direction = "right";
          break;
      }
    },
  });
  Listeners.map(listener => {
    window.addEventListener(listener.type, listener.listener);
  });
}

function gameTick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${Player.score}`, 10, 20);
  ctx.fillText(`Length: ${Player.length}`, 10, 40);
  Player.tail.map(pos => {
    ctx.fillRect(pos.x * GRID_SCALE, pos.y * GRID_SCALE, GRID_SCALE, GRID_SCALE);
  });
  ctx.fillRect(
    Player.x * GRID_SCALE,
    Player.y * GRID_SCALE,
    GRID_SCALE,
    GRID_SCALE
  );
  Fruit.map(fruit => {
    ctx.fillStyle = "red";
    ctx.fillRect(fruit.x * GRID_SCALE, fruit.y * GRID_SCALE, GRID_SCALE, GRID_SCALE);
  });
  if (
    Player.x === Fruit[0].x &&
    Player.y === Fruit[0].y &&
    Fruit[0].type === "apple"
  ) {
    Player.score += 1;
    Player.length += 1;
    generateFruit();
  }
  switch (Player.direction) {
    case "up":
      Player.y -= 1;
      break;
    case "down":
      Player.y += 1;
      break;
    case "left":
      Player.x -= 1;
      break;
    case "right":
      Player.x += 1;
      break;
  }
  if (
    Player.x < 0 ||
    Player.x > 19 ||
    Player.y < 0 ||
    Player.y > 19 ||
    Player.tail.some(pos => pos.x === Player.x && pos.y === Player.y)
  ) {
    startGame();
  }
}
