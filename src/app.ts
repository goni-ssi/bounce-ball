import { Ball } from "./ball";
import { Bar } from "./bar";
import { BlockMap } from "./block";
import { KeyboardManager } from "./keyboard-manager";

const WIDTH = 600;

class App {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #pixelRatio: number;
  #stageWidth: number;
  #stageHeight: number;
  #ball: Ball;
  #bar: Bar;
  #blockMap: BlockMap;

  constructor() {
    this.#canvas = document.createElement("canvas");

    this.#canvas.style.margin = "0 auto";
    this.#canvas.style.width = `${WIDTH}px`;

    document.body.style = "display: flex";
    document.body.appendChild(this.#canvas);
    const context = this.#canvas.getContext("2d");

    if (context) {
      this.#ctx = context;
    }

    this.#pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);

    window.addEventListener("resize", this.resize);

    requestAnimationFrame(this.animate);

    this.resize();
    this.#bar = new Bar({
      x: Math.floor(this.#stageWidth * 0.5) - Math.floor(WIDTH / 3 / 2),
      y: Math.floor(this.#stageHeight * 0.85),
      width: Math.floor(WIDTH / 3),
      height: 30,
      stageWidth: this.#stageWidth,
      stageHeight: this.#stageHeight,
    });
    this.#blockMap = new BlockMap({
      stageWidth: this.#stageWidth,
      stageHeight: this.#stageHeight,
      blockWidth: 80,
      blockHeight: 80,
    });
    this.#ball = new Ball({
      stageWidth: this.#stageWidth,
      stageHeight: this.#stageHeight,
      radius: 30,
      speed: 5,
      x: Math.floor(this.#stageWidth * 0.5),
      y: Math.floor(this.#stageHeight * 0.5),
      bar: this.#bar,
      blockMap: this.#blockMap,
    });

    const keyboardManager = new KeyboardManager({ interval: 10 });
    const KEYBOARD_MOVE_SPEED = 20;
    keyboardManager.subscribe((keys) => {
      keys.forEach((key) => {
        if (key === "ArrowLeft") {
          this.#bar.move(this.#bar.x - KEYBOARD_MOVE_SPEED, this.#bar.y);
        }

        if (key === "ArrowRight") {
          this.#bar.move(this.#bar.x + KEYBOARD_MOVE_SPEED, this.#bar.y);
        }
      });
    });
  }

  resize() {
    this.#stageWidth = WIDTH;
    this.#stageHeight = document.body.clientHeight;

    this.#canvas.width = this.#stageWidth * this.#pixelRatio;
    this.#canvas.height = this.#stageHeight * this.#pixelRatio;

    this.#ctx.scale(this.#pixelRatio, this.#pixelRatio);
  }

  animate() {
    this.#ctx.clearRect(0, 0, this.#stageWidth, this.#stageHeight);
    this.#bar.draw(this.#ctx);
    this.#ball.draw(this.#ctx);
    this.#blockMap.draw(this.#ctx);
    requestAnimationFrame(this.animate);
  }
}

window.onload = () => {
  new App();
};
