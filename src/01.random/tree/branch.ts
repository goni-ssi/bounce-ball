export class Branch {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "brown";
    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + 10, this.y + 10);
    ctx.lineTo(this.x + 10, this.y - 10);
    ctx.lineTo(this.x, this.y);

    ctx.fill();
    ctx.closePath();
  }
}
