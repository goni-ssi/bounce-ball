export class Block {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = this.draw.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const xGap = 80;
    const yGap = 60;

    ctx.fillStyle = "#ff384e";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "#190f3a";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - xGap, this.y - yGap);
    ctx.lineTo(this.x + this.width - xGap, this.y - yGap);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#9d0919";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - xGap, this.y - yGap);
    ctx.lineTo(this.x - xGap, this.y + this.height - yGap);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.closePath();
    ctx.fill();
  }
}
