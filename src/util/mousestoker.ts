import type p5 from "p5";
import type { Color } from "../types/color";
import cricle from "./cricle";

export default function mouseStalker(p: p5, color: Color, length: number) {
  cricle({ p, color, length });
}
