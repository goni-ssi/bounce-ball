import { Hill } from "./hill";

class App {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #pixelRatio: number;
  #stageWidth: number;
  #stageHeight: number;
  #hills: Hill[];

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
    this.#hills = [
      new Hill({
        stageWidth: this.#stageWidth,
        stageHeight: this.#stageHeight,
        pointsCount: 6,
        speed: 1,
      }),
    ];
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

    for (let i = 0; i < this.#hills.length; i++) {
      this.#hills[i].draw(this.#ctx);
    }

    requestAnimationFrame(this.animate);
  }
}

window.onload = () => {
  new App();
};
