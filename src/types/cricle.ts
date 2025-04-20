import type { Color } from "./color";

export type Cricle = {
  color: Color;
  length: number;
};

export type FixedCricle = {
  x: number;
  y: number;
} & Cricle;
