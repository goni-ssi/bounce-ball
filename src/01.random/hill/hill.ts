export class Hill {
  #stageWidth: number;
  #stageHeight: number;
  #points: { x: number; y: number }[];
  #curvePoints: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    cx: number;
    cy: number;
  }[];
  #speed: number;
  #fillColor: string;
  #gap: number;

  constructor({
    stageWidth,
    stageHeight,
    pointsCount,
    speed,
    fillColor,
  }: {
    stageWidth: number;
    stageHeight: number;
    pointsCount: number;
    speed: number;
    fillColor: string;
  }) {
    this.#stageWidth = stageWidth;
    this.#stageHeight = stageHeight;
    this.#speed = speed;
    this.#fillColor = fillColor;
    this.#points = [];
    this.#curvePoints = [];
    this.#gap = Math.floor(this.#stageWidth / (pointsCount + 2));

    for (let i = -1; i < pointsCount + 1; i++) {
      const y = this.getRandomY();

      this.#points.push({ x: i * this.#gap, y });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#fillColor;

    ctx.beginPath();

    ctx.moveTo(this.#points[0].x, this.#points[0].y);

    if (this.#points[0].x < -this.#gap * 2) {
      this.#points.shift();
    }

    if (
      this.#points[this.#points.length - 1].x <
      this.#stageWidth + this.#gap
    ) {
      this.#points.push({
        x: this.#points[this.#points.length - 1].x + this.#gap,
        y: this.getRandomY(),
      });
    }

    this.#curvePoints = [];
    let prevCx = 0;
    let prevCy = 0;
    for (let i = 0; i < this.#points.length - 1; i++) {
      const { x, y } = this.#points[i];

      const nextX = this.#points[i + 1].x;
      const nextY = this.#points[i + 1].y;

      const cx = (x + nextX) / 2;
      const cy = (y + nextY) / 2;

      this.#curvePoints.push({
        x1: prevCx,
        y1: prevCy,
        x2: cx,
        y2: cy,
        cx: x,
        cy: y,
      });

      prevCx = cx;
      prevCy = cy;

      ctx.quadraticCurveTo(x, y, cx, cy);
    }

    ctx.lineTo(this.#points[this.#points.length - 1].x, this.#stageHeight);
    ctx.lineTo(this.#points[0].x, this.#stageHeight);
    ctx.lineTo(this.#points[0].x, this.#points[0].y);
    ctx.fill();
    ctx.closePath();

    this.#points.forEach((_, index) => {
      this.#points[index].x -= this.#speed;
    });
  }

  getRandomY() {
    const min = Math.floor(this.#stageHeight * 0.5);
    const max = Math.floor(this.#stageHeight * 0.9);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getCurvePoints() {
    return this.#curvePoints;
  }
}
