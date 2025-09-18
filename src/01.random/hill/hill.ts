export class Hill {
  #stageWidth: number;
  #stageHeight: number;
  #points: { x: number; y: number }[];
  #pointsCount: number;
  #speed: number;

  constructor({
    stageWidth,
    stageHeight,
    pointsCount,
    speed,
  }: {
    stageWidth: number;
    stageHeight: number;
    pointsCount: number;
    speed: number;
  }) {
    this.#stageWidth = stageWidth;
    this.#stageHeight = stageHeight;
    this.#pointsCount = pointsCount;
    this.#speed = speed;
    this.#points = [];

    for (let i = 0; i < this.#pointsCount; i++) {
      const gap = Math.floor(this.#stageWidth / (this.#pointsCount - 2));

      const y = this.getRandomY();

      this.#points.push({ x: i * gap, y });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "green";

    ctx.beginPath();

    ctx.moveTo(this.#points[0].x, this.#points[0].y);

    for (let i = 0; i < this.#points.length - 1; i++) {
      const { x, y } = this.#points[i];

      const nextX = this.#points[i + 1].x;
      const nextY = this.#points[i + 1].y;

      const cx = (x + nextX) / 2;
      const cy = (y + nextY) / 2;

      ctx.quadraticCurveTo(x, y, cx, cy);
    }

    ctx.lineTo(this.#points[this.#points.length - 1].x, this.#stageHeight);
    ctx.lineTo(this.#points[0].x, this.#stageHeight);
    ctx.lineTo(this.#points[0].x, this.#points[0].y);
    ctx.fill();
    ctx.closePath();
  }

  getRandomY() {
    const min = Math.floor(this.#stageHeight * 0.45);
    const max = Math.floor(this.#stageHeight * 0.8);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
