import { Ball } from "./ball";
import { Block } from "./block";
import { KeyboardManager } from "./keyboard-manager";

class App {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #pixelRatio: number;
  #stageWidth: number;
  #stageHeight: number;
  #ball: Ball;
  #block: Block;

  constructor() {
    this.#canvas = document.createElement("canvas");

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
    this.#ball = new Ball({
      stageWidth: this.#stageWidth,
      stageHeight: this.#stageHeight,
      radius: 60,
      speed: 25,
    });
    this.#block = new Block({
      x: 300,
      y: 450,
      width: 700,
      height: 30,
    });

    const keyboardManager = new KeyboardManager({ interval: 10 });
    const KEYBOARD_MOVE_SPEED = 20;
    keyboardManager.subscribe((keys) => {
      keys.forEach((key) => {
        if (key === "ArrowUp") {
          this.#block.move(this.#block.x, this.#block.y - KEYBOARD_MOVE_SPEED);
        }

        if (key === "ArrowDown") {
          this.#block.move(this.#block.x, this.#block.y + KEYBOARD_MOVE_SPEED);
        }

        if (key === "ArrowLeft") {
          this.#block.move(this.#block.x - KEYBOARD_MOVE_SPEED, this.#block.y);
        }

        if (key === "ArrowRight") {
          this.#block.move(this.#block.x + KEYBOARD_MOVE_SPEED, this.#block.y);
        }
      });
    });
  }

  resize() {
    this.#stageWidth = document.body.clientWidth;
    this.#stageHeight = document.body.clientHeight;

    this.#canvas.width = this.#stageWidth * this.#pixelRatio;
    this.#canvas.height = this.#stageHeight * this.#pixelRatio;

    this.#ctx.scale(this.#pixelRatio, this.#pixelRatio);
  }

  animate() {
    this.#ctx.clearRect(0, 0, this.#stageWidth, this.#stageHeight);
    this.#block.draw(this.#ctx);
    this.#ball.draw(this.#ctx, this.#block);
    requestAnimationFrame(this.animate);
  }
}

window.onload = () => {
  new App();
};
