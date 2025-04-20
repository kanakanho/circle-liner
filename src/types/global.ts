import type { Color } from "./color";

export type EventPoint<TColor extends Color> = {
  x: number;
  y: number;
  color: TColor;
};
