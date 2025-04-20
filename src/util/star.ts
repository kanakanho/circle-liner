import type p5 from "p5";
import type { Color } from "../types/color";

type StarProps = {
  x: number;
  y: number;
  color: Color;
  radius1: number;
  radius2: number;
  npoints: number;
  p: p5;
};

export default function star({ x, y, color, radius1, radius2, npoints, p }: StarProps) {
  const angle = p.TWO_PI / npoints;
  const halfAngle = angle / 2.0;
  p.beginShape();
  p.stroke(color);
  p.strokeWeight(2);
  for (let a = 0; a < p.TWO_PI; a += angle) {
    const sx = x + p.cos(a) * radius2;
    const sy = y + p.sin(a) * radius2;
    p.vertex(sx, sy);

    const sxInner = x + p.cos(a + halfAngle) * radius1;
    const syInner = y + p.sin(a + halfAngle) * radius1;
    p.vertex(sxInner, syInner);
  }
  p.noFill();
  p.endShape(p.CLOSE);
}
