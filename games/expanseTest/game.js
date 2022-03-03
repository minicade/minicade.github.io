const canvas = document.getElementById("canvas");
import { Display, DisplayScene, Rect } from "./../expanse.js";
let disp = new Display(canvas);
disp.addScene(new DisplayScene("test").addChild(new Rect().backgroundColor("blue")));
