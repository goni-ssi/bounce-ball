type Point = {
  x: number;
  y: number;
};

/**
 * 2차 방정식의 해를 구하는 함수.
 * @param a - t^2의 계수
 * @param b - t의 계수
 * @param c - 상수항
 * @returns 0과 1 사이의 유효한 해 배열
 */
function solveQuadratic(a: number, b: number, c: number): number[] {
  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return []; // 해가 없습니다.
  }

  const sqrtD = Math.sqrt(discriminant);
  const t1 = (-b + sqrtD) / (2 * a);
  const t2 = (-b - sqrtD) / (2 * a);

  const results: number[] = [];
  if (t1 >= 0 && t1 <= 1) {
    results.push(t1);
  }
  if (t2 >= 0 && t2 <= 1 && t2 !== t1) {
    results.push(t2);
  }

  return results;
}

/**
 * 2차 베지어 곡선의 특정 x 값에 해당하는 t 값을 계산합니다.
 * @param xTarget - 찾고자 하는 x 값
 * @param p0 - 시작점
 * @param p1 - 제어점
 * @param p2 - 끝점
 * @returns 유효한 t 값의 배열
 */
function getTValuesFromX(
  xTarget: number,
  p0: Point,
  p1: Point,
  p2: Point
): number[] {
  // 2차 방정식 계수
  const a = p0.x - 2 * p1.x + p2.x;
  const b = 2 * (p1.x - p0.x);
  const c = p0.x - xTarget;

  if (a === 0) {
    // 1차 방정식인 경우
    if (b === 0) return [];
    const t = -c / b;
    return t >= 0 && t <= 1 ? [t] : [];
  }

  return solveQuadratic(a, b, c);
}

/**
 * 2차 베지어 곡선의 특정 t 값에 해당하는 y 값을 계산합니다.
 * @param t - 매개변수 t (0에서 1 사이)
 * @param p0 - 시작점
 * @param p1 - 제어점
 * @param p2 - 끝점
 * @returns 계산된 y 값
 */
function getYFromT(t: number, p0: Point, p1: Point, p2: Point): number {
  return (1 - t) ** 2 * p0.y + 2 * t * (1 - t) * p1.y + t ** 2 * p2.y;
}

/**
 * 2차 베지어 곡선에서 특정 x 값에 해당하는 모든 y 값을 찾습니다.
 * @param xTarget - 찾고자 하는 x 값
 * @param p0 - 시작점
 * @param p1 - 제어점
 * @param p2 - 끝점
 * @returns 계산된 y 값의 배열
 */
export function getYValuesFromX(
  xTarget: number,
  p0: Point,
  p1: Point,
  p2: Point
): number[] {
  const tValues = getTValuesFromX(xTarget, p0, p1, p2);
  return tValues.map((t) => getYFromT(t, p0, p1, p2));
}
