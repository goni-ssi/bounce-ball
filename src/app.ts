import { Ball } from "./ball";

class App {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #pixelRatio: number;
  #stageWidth: number;
  #stageHeight: number;
  #ball: Ball;

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
      speed: 10,
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
    this.#ball.draw(this.#ctx);

    requestAnimationFrame(this.animate);
  }
}

window.onload = () => {
  new App();
};
