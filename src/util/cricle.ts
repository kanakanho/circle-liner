import type p5 from "p5";
import type { Cricle } from "../types/cricle";

let stalkerX = 0;
let stalkerY = 0;
const easing = 0.5; // スムーズな追従のためのイージング係数
let s = 0;
let verticals = 0;
let alpha = 0;

export type CricleProps = {
  p: p5;
} & Cricle;

export default function cricle({ p, color, length }: CricleProps) {
  const maxLangth = length;
  const minLength = length * 0.2;
  s = p.cos(p.frameCount / 43) * (maxLangth - minLength) + minLength;
  verticals = p.sin(p.frameCount / 71) * (maxLangth - minLength) + minLength;
  // 透明度の変化 ただし、透明度は128~255の範囲
  alpha = p.map(p.sin(p.frameCount / 20), -1, 1, 128, 200);
  const targetX = p.mouseX;
  const targetY = p.mouseY;

  // イージングを使って追従
  stalkerX += (targetX - stalkerX) * easing;
  stalkerY += (targetY - stalkerY) * easing;

  // マウスストーカー（円の線）
  p.push();
  p.stroke(color[0], color[1], color[2], alpha);
  p.strokeWeight(2);
  p.fill(0, 0, 0, 0);

  p.ellipse(stalkerX, stalkerY, s, s);
  p.ellipse(stalkerX, stalkerY, verticals, verticals);
  p.ellipse(stalkerX, stalkerY, maxLangth, maxLangth);
  p.pop();
}
