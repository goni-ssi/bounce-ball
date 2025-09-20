import { Car } from "./car";
import { Hill } from "./hill";
import { getSlopeAtPoint, getYValuesFromX } from "./util/bezier";

class App {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #pixelRatio: number;
  #stageWidth: number;
  #stageHeight: number;
  #hills: Hill[];
  #car: Car;

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
        pointsCount: 7,
        fillColor: "#fd6bea",
        speed: 2,
      }),
      new Hill({
        stageWidth: this.#stageWidth,
        stageHeight: this.#stageHeight,
        pointsCount: 6,
        fillColor: "#ff59c2",
        speed: 3,
      }),
      new Hill({
        stageWidth: this.#stageWidth,
        stageHeight: this.#stageHeight,
        pointsCount: 5,
        fillColor: "#ff4674",
        speed: 4,
      }),
    ];
    this.#car = new Car();
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

    const carX = 300;
    const curvePoints = this.#hills[2].getCurvePoints();
    const closestCurvePointIndex = this.#hills[2]
      .getCurvePoints()
      .reduce((closestIndex, point, index) => {
        if (
          Math.abs(point.x1 - carX) <
          Math.abs(curvePoints[closestIndex].x1 - carX)
        ) {
          return index - 1;
        }

        return closestIndex;
      }, 0);
    const closestCurvePoint = curvePoints[closestCurvePointIndex];

    const safeYValue = getYValuesFromX({
      xTarget: 300,
      p0: {
        x: closestCurvePoint.x1,
        y: closestCurvePoint.y1,
      },
      p1: {
        x: closestCurvePoint.cx,
        y: closestCurvePoint.cy,
      },
      p2: {
        x: closestCurvePoint.x2,
        y: closestCurvePoint.y2,
      },
    })[0];

    const slope = getSlopeAtPoint({
      targetX: carX,
      targetY: safeYValue,
      p0: {
        x: closestCurvePoint.x1,
        y: closestCurvePoint.y1,
      },
      p1: {
        x: closestCurvePoint.cx,
        y: closestCurvePoint.cy,
      },
      p2: {
        x: closestCurvePoint.x2,
        y: closestCurvePoint.y2,
      },
    })[0];

    const rotation = Math.atan(slope) * (180 / Math.PI);

    this.#car.draw({
      ctx: this.#ctx,
      x: carX,
      y: safeYValue,
      rotate: rotation,
    });

    requestAnimationFrame(this.animate);
  }
}

window.onload = () => {
  new App();
};
