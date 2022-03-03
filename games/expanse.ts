export class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  scenes: DisplayScene[];
  renders: number;
  currentScene?: DisplayScene;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = canvas.width;
    this.height = canvas.height;
    this.scenes = [];
    this.renders = 0;
    requestAnimationFrame(this.#render.bind(this));
  }
  #render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.currentScene) {
      this.currentScene.render(this.ctx);
    } else {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.width, this.height);
      // write text to the center of the screen
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText("No scene selected", this.width / 2, this.height / 2);
    }
    this.renders++;
  }
  addScene(scene: DisplayScene) {
    this.scenes.push(scene);
    return this;
  }
  setScene(scene: DisplayScene) {
    this.currentScene = scene;
    return this;
  }
  getScene(name: string) {
    return this.scenes.find(scene => scene.id === name);
  }
  removeScene(scene: DisplayScene) {
    this.scenes = this.scenes.filter(s => s !== scene);
    return this;
  }
}

export class DisplayScene {
  children: DisplayObject[];
  id: string;
  constructor(name: string) {
    this.children = [];
    this.id = name;
    return this;
  }
  render(ctx: CanvasRenderingContext2D) {
    this.children.forEach(child => child.render(ctx));
  }
  addChild(child: DisplayObject) {
    this.children.push(child);
    return this;
  }
  removeChild(child: DisplayObject) {
    this.children = this.children.filter(c => c !== child);
    return this;
  }
  listChildren() {
    return this.children;
  }
  childContext(id: string) {
    return this.children.find(c => c.id === id);
  }
}

export class DisplayObject {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    return this;
  }
  render(ctx: CanvasRenderingContext2D) {
    return null;
  }
}

export class Rect extends DisplayObject {
  backgroundColor: string;
  constructor() {
    super();
    this.backgroundColor = "red";
    return this;
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return null;
  }
}