import { Block } from "./block";

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
    this.x = radius + Math.random() * (stageWidth - radius);
    this.y = radius + Math.random() * (stageHeight - radius);

    this.vx = speed;
    this.vy = speed;

    this.draw = this.draw.bind(this);
    this.bounceWindow = this.bounceWindow.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D, block: Block) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = "#ff3d00";
    ctx.fill();
    ctx.closePath();

    this.bounceWindow();
    this.bounceBlock(block);

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

  bounceBlock(block: Block) {
    const centerMinX = block.x - this.radius;
    const centerMaxX = block.x + block.width + this.radius;
    const centerMinY = block.y - this.radius;
    const centerMaxY = block.y + block.height + this.radius;

    const isBlockHit =
      centerMinX <= this.x &&
      this.x <= centerMaxX &&
      centerMinY <= this.y &&
      this.y <= centerMaxY;

    if (!isBlockHit) {
      return;
    }

    const minDistanceX = Math.min(
      Math.abs(centerMinX - this.x),
      Math.abs(centerMaxX - this.x)
    );
    const minDistanceY = Math.min(
      Math.abs(centerMinY - this.y),
      Math.abs(centerMaxY - this.y)
    );

    if (minDistanceX < minDistanceY) {
      this.vx = -this.vx;
    } else {
      this.vy = -this.vy;
    }
  }
}
