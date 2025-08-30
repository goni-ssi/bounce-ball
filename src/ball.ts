export class Ball {
  stageWidth: number;
  stageHeight: number;
  radius: number;
  speed: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  diameter: number;

  constructor({
    stageWidth,
    stageHeight,
    radius,
    speed,
  }: {
    stageWidth: number;
    stageHeight: number;
    radius: number;
    speed: number;
  }) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.radius = radius;
    this.speed = speed;

    this.diameter = radius * 2;
    this.x = radius + (Math.random() * stageWidth - radius);
    this.y = radius + (Math.random() * stageHeight - radius);

    this.vx = speed;
    this.vy = speed;

    this.draw = this.draw.bind(this);
    this.bounceWindow = this.bounceWindow.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = "#ff3d00";
    ctx.fill();
    ctx.closePath();

    this.bounceWindow();

    this.x += this.vx;
    this.y += this.vy;
  }

  bounceWindow() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= this.stageWidth) {
      this.vx = -this.vx;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= this.stageHeight) {
      this.vy = -this.vy;
    }
  }
}
