var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Display_instances, _Display_render;
export class Display {
    constructor(canvas) {
        _Display_instances.add(this);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.scenes = [];
        this.renders = 0;
        requestAnimationFrame(__classPrivateFieldGet(this, _Display_instances, "m", _Display_render).bind(this));
    }
    addScene(scene) {
        this.scenes.push(scene);
        return this;
    }
    setScene(scene) {
        this.currentScene = scene;
        return this;
    }
    getScene(name) {
        return this.scenes.find(scene => scene.id === name);
    }
    removeScene(scene) {
        this.scenes = this.scenes.filter(s => s !== scene);
        return this;
    }
}
_Display_instances = new WeakSet(), _Display_render = function _Display_render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.currentScene) {
        this.currentScene.render(this.ctx);
    }
    else {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        // write text to the center of the screen
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("No scene selected", this.width / 2, this.height / 2);
    }
    this.renders++;
};
export class DisplayScene {
    constructor(name) {
        this.children = [];
        this.id = name;
        return this;
    }
    render(ctx) {
        this.children.forEach(child => child.render(ctx));
    }
    addChild(child) {
        this.children.push(child);
        return this;
    }
    removeChild(child) {
        this.children = this.children.filter(c => c !== child);
        return this;
    }
    listChildren() {
        return this.children;
    }
    childContext(id) {
        return this.children.find(c => c.id === id);
    }
}
export class DisplayObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        return this;
    }
    render(ctx) {
        return null;
    }
}
export class Rect extends DisplayObject {
    constructor() {
        super();
        this.backgroundColor = "red";
        return this;
    }
    render(ctx) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        return null;
    }
}
