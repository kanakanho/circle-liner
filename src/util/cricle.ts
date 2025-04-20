import type p5 from "p5";
import type { Cricle } from "../types/cricle";

let s = 0;
let verticals = 0;
let alpha = 0;

export type CricleProps = {
  p: p5;
} & Cricle;

export default function cricle({ p, x, y, color, length, firstAngle }: CricleProps) {
  const maxLength = length;
  const minLength = length * 0.2;

  s = p.cos(p.frameCount / 43) * (maxLength - minLength) + minLength;
  verticals = p.sin(p.frameCount / 71) * (maxLength - minLength) + minLength;

  // 透明度の変化 ただし、透明度は128~255の範囲
  if (!firstAngle) {
    alpha = p.map(p.sin(p.frameCount / 20), -1, 1, 20, 100);
  } else {
    alpha = p.map(p.sin(p.frameCount / 20), -1, 1, 10, 20);
  }
  // マウスストーカー（円の線）
  p.push();
  p.stroke(color[0], color[1], color[2], alpha);
  p.strokeWeight(2);
  p.fill(0, 0, 0, 0);

  p.ellipse(x, y, s, s);
  p.ellipse(x, y, verticals, verticals);
  p.ellipse(x, y, maxLength, maxLength);
  p.pop();
}
