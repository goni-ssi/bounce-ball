export class Car {
  constructor() {}

  draw({ ctx, x, y }: { ctx: CanvasRenderingContext2D; x: number; y: number }) {
    const wheelRadius = 10;
    const wheelGap = 30;
    const wheelY = y - wheelRadius;
    const wheelLeftCx = x - wheelGap / 2 - wheelRadius;
    const wheelRightCx = x + wheelGap / 2 + wheelRadius;
    const bodyWidth = 80;
    const bodyHeight = 25;
    const bodyBottomY = y - wheelRadius;
    const bodyTopY = bodyBottomY - bodyHeight;
    const bodyLeftX = x - bodyWidth / 2;
    const bodyRightX = x + bodyWidth / 2;
    const bodyLeftCx = x - bodyWidth / 2 - 10;
    const bodyBottomCy = bodyBottomY - 5;
    const bodyTopCy = bodyBottomY - bodyHeight + 5;
    const bodyRightCx = x + bodyWidth / 2 + 10;
    const roofBottomWidth = 60;
    const roofTopWidth = 40;
    const roofTopY = bodyBottomY - 35;
    const roofLeftBottomX = x - roofBottomWidth / 2;
    const roofRightBottomX = x + roofBottomWidth / 2;
    const roofLeftTopX = x - roofTopWidth / 2;
    const roofRightTopX = x + roofTopWidth / 2;
    const roofTopLeftCX = roofLeftTopX + 10;
    const roofTopRightCX = roofRightTopX - 10;
    const roofTopCY = roofTopY - 10;
    const headLightRadius = 4;
    const headLightX = bodyRightX;
    const headLightY = (bodyBottomY + roofTopY) / 2 + headLightRadius - 2;

    // 자동차 본체 그리기
    ctx.beginPath();
    ctx.moveTo(x, bodyBottomY);
    ctx.lineTo(bodyLeftX, bodyBottomY);
    ctx.bezierCurveTo(
      bodyLeftCx,
      bodyBottomCy,
      bodyLeftCx,
      bodyTopCy,
      bodyLeftX,
      bodyTopY
    );
    ctx.lineTo(roofLeftBottomX, bodyTopY);
    ctx.lineTo(roofLeftTopX, roofTopY);
    ctx.bezierCurveTo(
      roofTopLeftCX,
      roofTopCY,
      roofTopRightCX,
      roofTopCY,
      roofRightTopX,
      roofTopY
    );
    ctx.lineTo(roofRightBottomX, bodyTopY);
    ctx.lineTo(bodyRightX, bodyTopY);
    ctx.bezierCurveTo(
      bodyRightCx,
      bodyTopCy,
      bodyRightCx,
      bodyBottomCy,
      bodyRightX,
      bodyBottomY
    );
    ctx.lineTo(x, bodyBottomY);
    ctx.fillStyle = "#3498db"; // 파란색
    ctx.fill();
    ctx.closePath();

    // 바퀴 그리기
    ctx.fillStyle = "#333"; // 검은색
    ctx.beginPath();
    ctx.arc(wheelLeftCx, wheelY, wheelRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(wheelRightCx, wheelY, wheelRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // 헤드 라이트
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(
      headLightX,
      headLightY,
      headLightRadius,
      (-Math.PI * 3) / 5,
      (Math.PI * 3) / 5
    );
    ctx.fill();
    ctx.closePath();

    // 헤드 라이트 불빛
    // ctx.fillStyle = "rgb(255,255,0, 0.6)";
    // ctx.beginPath();
    // ctx.moveTo(headLightX, headLightY);
    // ctx.lineTo(headLightX + 60, headLightY - 5);
    // ctx.arc(headLightX + 60, headLightY + 5, 10, -Math.PI / 2, Math.PI / 2);
    // ctx.lineTo(headLightX, headLightY);
    // ctx.fill();
    // ctx.closePath();
  }
}
