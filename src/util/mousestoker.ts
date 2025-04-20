import type p5 from "p5";
import type { Color } from "../types/color";
import cricle from "./cricle";

let stalkerX = 0;
let stalkerY = 0;
const easing = 0.5; // スムーズな追従のためのイージング係数

export default function mouseStalker(p: p5, color: Color, length: number) {
  const targetX = p.mouseX;
  const targetY = p.mouseY;
  // イージングを使って追従
  stalkerX += (targetX - stalkerX) * easing;
  stalkerY += (targetY - stalkerY) * easing;
  cricle({ p, id: "", x: stalkerX, y: stalkerY, color, length });
}
