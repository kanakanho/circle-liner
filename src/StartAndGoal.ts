import type p5 from "p5";
import type { Color } from "./types/color";
import type { Cricle } from "./types/cricle";
import type { EventPoint } from "./types/global";
import star from "./util/star";

type Hold = {
  cricle: Cricle;
};

export type StartAndGoal<TColor extends Color> = {
  pointA: { hold: Hold | undefined } & EventPoint<TColor>;
  pointB: { hold: Hold | undefined } & EventPoint<TColor>;
};

export type StartAndGoalProps<TColor extends Color> = {
  p: p5;
} & StartAndGoal<TColor>;

export function StartAndGoal<TColor extends Color>({
  pointA,
  pointB,
  p,
}: StartAndGoalProps<TColor>) {
  const frameCount = p.frameCount;

  if (pointA.hold) {
    const { pointX, pointY } = holdPoint({
      p,
      x: pointA.x,
      y: pointA.y,
      color: pointA.color,
      frameCount,
      cricle: pointA.hold.cricle,
    });
    pointA.x = pointX;
    pointA.y = pointY;
  } else {
    point({
      p,
      x: pointA.x,
      y: pointA.y,
      color: pointA.color,
      frameCount,
    });
  }

  if (pointB.hold) {
    const { pointX, pointY } = holdPoint({
      p,
      x: pointB.x,
      y: pointB.y,
      color: pointB.color,
      frameCount,
      cricle: pointB.hold.cricle,
    });
    pointB.x = pointX;
    pointB.y = pointY;
  } else {
    point({
      p,
      x: pointB.x,
      y: pointB.y,
      color: pointB.color,
      frameCount,
    });
  }
}

function point({
  p,
  x,
  y,
  color,
  frameCount,
}: { p: p5; x: number; y: number; color: Color; frameCount: number }) {
  // スタート地点
  p.push();
  p.translate(x, y);
  p.rotate(frameCount / -300.0);
  star({
    x: 0,
    y: 0,
    color: color,
    radius1: 10,
    radius2: 20,
    npoints: 5,
    p,
  });
  p.fill(color[0], color[1], color[2]);
  p.noStroke();
  p.ellipse(0, 0, 10, 10);
  p.pop();
}

function holdPoint({
  p,
  x,
  y,
  color,
  frameCount,
  cricle,
}: {
  p: p5;
  x: number;
  y: number;
  color: Color;
  frameCount: number;
  cricle: Cricle;
}): { pointX: number; pointY: number } {
  // 円周上の位置を計算
  // 初期角度を保持するためのプロパティを追加
  if (cricle.firstAngle === undefined) {
    const shiftAngle = p.atan2(y - cricle.y, x - cricle.x); // 円の中心からの角度を計算
    cricle.firstAngle = frameCount / 100.0 + shiftAngle + p.TWO_PI / cricle.length;
  }
  const angle = cricle.firstAngle - frameCount / 100.0; // 円周上の角度を計算
  const pointX = cricle.x + (cricle.length / 2) * p.cos(angle); // 円周上のX座標
  const pointY = cricle.y + (cricle.length / 2) * p.sin(angle); // 円周上のY座標

  // 円周上のポイントを描画
  p.push();
  p.translate(pointX, pointY);
  p.rotate(frameCount / -300.0);
  star({
    x: 0,
    y: 0,
    color: color,
    radius1: 10,
    radius2: 20,
    npoints: 5,
    p,
  });
  p.fill(color[0], color[1], color[2]);
  p.noStroke();
  p.ellipse(0, 0, 10, 10);
  p.pop();

  return { pointX, pointY };
}
