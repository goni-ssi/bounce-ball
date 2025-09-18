export class Tree {
  #x: number;
  #y: number;

  constructor() {
    this.#x = 0;
    this.#y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "brown";

    ctx.fillRect(this.#x, this.#y, 10, 10);
  }
}
