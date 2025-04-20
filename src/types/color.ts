export type Color =
  | [number, number, number, number]
  | ColorRed
  | ColorGreen
  | ColorBlue
  | ColorYellow
  | ColorCyan
  | ColorMagenta
  | ColorBlack
  | ColorWhite
  | ColorGray
  | ColorOrange
  | ColorPurple
  | ColorPink
  | ColorBrown;

export type ColorRed = typeof Red;
export type ColorGreen = typeof Green;
export type ColorBlue = typeof Blue;
export type ColorYellow = typeof Yellow;
export type ColorCyan = typeof Cyan;
export type ColorMagenta = typeof Magenta;
export type ColorBlack = typeof Black;
export type ColorWhite = typeof White;
export type ColorGray = typeof Gray;
export type ColorOrange = typeof Orange;
export type ColorPurple = typeof Purple;
export type ColorPink = typeof Pink;
export type ColorBrown = typeof Brown;

export const Red = [255, 0, 0, 255];
export const Green = [0, 255, 0, 255];
export const Blue = [0, 0, 255, 255];
export const Yellow = [255, 255, 0, 255];
export const Cyan = [0, 255, 255, 255];
export const Magenta = [255, 0, 255, 255];
export const Black = [0, 0, 0, 255];
export const White = [255, 255, 255, 255];
export const Gray = [128, 128, 128, 255];
export const Orange = [255, 165, 0, 255];
export const Purple = [128, 0, 128, 255];
export const Pink = [255, 192, 203, 255];
export const Brown = [165, 42, 42, 255];
