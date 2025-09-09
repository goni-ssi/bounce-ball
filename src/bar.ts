export class Bar {
  x: number;
  y: number;
  width: number;
  height: number;
  stageWidth: number;
  stageHeight: number;

  constructor({
    x,
    stageWidth,
    stageHeight,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    stageWidth: number;
    stageHeight: number;
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.draw = this.draw.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#9d0919";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(x: number, y: number) {
    this.x = Math.min(Math.max(0, x), this.stageWidth - this.width);
    this.y = y;
  }
}
