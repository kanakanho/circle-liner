import p5 from "p5";
import { StartAndGoal } from "./StartAndGoal";
import { type ColorYellow, Yellow } from "./types/color";
import mouseStalker from "./util/mousestoker";

// start と goal の色が同じであることを型で保証
const startAndGoal: StartAndGoal<ColorYellow> = {
  start: {
    x: 300,
    y: 400,
    color: Yellow,
  },
  goal: {
    x: 600,
    y: 600,
    color: Yellow,
  },
};

const mouseStalkerColor = Yellow;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
    p.background(36);
  };

  p.draw = () => {
    p.background(36);
    StartAndGoal({ startAndGoal, p });

    // マウスストーカーを描画
    mouseStalker(p, mouseStalkerColor, 300);
  };

  // 画面幅が変更されたときにキャンバスのサイズを変更する
  p.windowResized = () => {
    console.log("window resized");
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

new p5(sketch);
