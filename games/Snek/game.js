"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const START_LENGTH = 5;
const STARTPOS = { x: 4, y: 8 };
const STARTAPPLEPOS = { x: 3, y: 0 };
class Game {
    constructor(firstRun) {
        this.direction = "right";
        this.score = 0;
        this.currentSubTick = 0;
        this.start(firstRun);
    }
    start(firstRun) {
        this.trail = [];
        this.direction = "right";
        this.gridSize = 16;
        this.gridScale = canvas.width / this.gridSize;
        this.score = 0;
        this.applePos = [];
        this.x = STARTPOS.x;
        this.y = STARTPOS.y;
        this.applePos.push(STARTAPPLEPOS);
        console.log(this);
        if (firstRun === true) {
            this.render();
            setInterval(this.handleSubTick.bind(this), 10);
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
        if (this.x < 0 ||
            this.x > this.gridSize - 1 ||
            this.y < 0 ||
            this.y > this.gridSize - 1) {
            return true;
        }
        return false;
    }
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#008800";
        ctx.fillRect(0, 0, this.gridSize * this.gridScale, this.gridSize * this.gridScale);
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
            ctx.fillRect(this.trail[i].x * this.gridScale, this.trail[i].y * this.gridScale, this.gridScale, this.gridScale);
        }
        // ctx.fillRect(this.x * this.gridScale, this.y * this.gridScale, this.gridScale, this.gridScale);
        // draw snake head
        ctx.fillStyle = "black";
        switch (this.direction) {
            case "right":
                ctx.fillRect(this.x * this.gridScale + (this.currentSubTick * this.gridScale) / 10, this.y * this.gridScale, this.gridScale, this.gridScale);
                ctx.fillRect(this.x * this.gridScale +
                    (this.currentSubTick * this.gridScale) / 10 +
                    this.gridScale / 2, this.y * this.gridScale + this.gridScale / 2 - this.gridScale / 20, this.gridScale, this.gridScale / 10);
                break;
            case "left":
                ctx.fillRect(this.x * this.gridScale - (this.currentSubTick * this.gridScale) / 10, this.y * this.gridScale, this.gridScale, this.gridScale);
                ctx.fillRect(this.x * this.gridScale -
                    (this.currentSubTick * this.gridScale) / 10 -
                    this.gridScale / 2, this.y * this.gridScale + this.gridScale / 2 - this.gridScale / 20, this.gridScale, this.gridScale / 10);
                break;
            case "up":
                ctx.fillRect(this.x * this.gridScale, this.y * this.gridScale - (this.currentSubTick * this.gridScale) / 10, this.gridScale, this.gridScale);
                ctx.fillRect(this.x * this.gridScale + this.gridScale / 2 - this.gridScale / 20, this.y * this.gridScale -
                    (this.currentSubTick * this.gridScale) / 10 -
                    this.gridScale / 2, this.gridScale / 10, this.gridScale);
                break;
            case "down":
                ctx.fillRect(this.x * this.gridScale, this.y * this.gridScale + (this.currentSubTick * this.gridScale) / 10, this.gridScale, this.gridScale);
                ctx.fillRect(this.x * this.gridScale + this.gridScale / 2 - this.gridScale / 20, this.y * this.gridScale +
                    (this.currentSubTick * this.gridScale) / 10 +
                    this.gridScale / 2, this.gridScale / 10, this.gridScale);
                break;
        }
        // draw apple
        ctx.fillStyle = "yellow";
        for (let i = 0; i < this.applePos.length; i++) {
            ctx.fillRect(this.applePos[i].x * this.gridScale, this.applePos[i].y * this.gridScale, this.gridScale, this.gridScale);
        }
        requestAnimationFrame(this.render.bind(this));
    }
    tick() {
        this.applePos.forEach(apple => {
            if (this.x === apple.x && this.y === apple.y) {
                // remove apple
                this.applePos.splice(this.applePos.indexOf(apple), 1);
                this.score++;
                this.applePos.push({
                    x: Math.floor(Math.random() * this.gridSize),
                    y: Math.floor(Math.random() * this.gridSize),
                });
            }
        });
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
        // check if snake hit itself
        for (let i = 0; i < this.trail.length; i++) {
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
