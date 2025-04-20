import p5 from "p5";
import { StartAndGoal } from "./StartAndGoal";
import { type ColorYellow, Yellow } from "./types/color";
import type { Cricle } from "./types/cricle";
import cricle from "./util/cricle";
import mouseStalker from "./util/mousestoker";

// start と goal の色が同じであることを型で保証
const startAndGoals: StartAndGoal<ColorYellow>[] = [];
startAndGoals.push(initStartAndGoal());

function initStartAndGoal(): StartAndGoal<ColorYellow> {
  let pointA: StartAndGoal<ColorYellow>["pointA"];
  let pointB: StartAndGoal<ColorYellow>["pointB"];
  const minDistance = 200; // スタートとゴールの最小距離

  do {
    // pointA の座標をランダムに生成
    pointA = {
      x: Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.1,
      y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.1,
      color: Yellow,
      hold: undefined,
    };

    // pointB の座標をランダムに生成
    pointB = {
      x: Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.1,
      y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.1,
      color: Yellow,
      hold: undefined,
    };
  } while (distance(pointA.x, pointA.y, pointB.x, pointB.y) < minDistance); // 最小距離を満たすまで繰り返す

  return { pointA, pointB };
}

// 2点間の距離を計算する関数
function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

const currentCricle: Cricle = {
  id: "",
  x: 0,
  y: 0,
  color: Yellow,
  length: 300,
};

const fixedCricles: Cricle[] = [];

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
    p.background(36);
  };

  p.draw = () => {
    p.background(36);
    for (const startAndGoal of startAndGoals) {
      StartAndGoal({ pointA: startAndGoal.pointA, pointB: startAndGoal.pointB, p });
    }

    // マウスストーカーを描画
    mouseStalker(p, currentCricle.color, 300);

    // 固定された円を描画
    for (const fixedCricle of fixedCricles) {
      cricle({ p, ...fixedCricle });
    }
  };

  p.mousePressed = () => {
    // クリックした地点にすでに円がある場合は円を消す
    let isDelete = false;
    for (let i = fixedCricles.length - 1; i >= 0; i--) {
      const fixedCricle = fixedCricles[i];
      const dist = p.dist(p.mouseX, p.mouseY, fixedCricle.x, fixedCricle.y);
      if (dist <= 5) {
        fixedCricles.splice(i, 1);
        // 関連を持つスタートとゴールを削除
        for (const startAndGoal of startAndGoals) {
          if (startAndGoal.pointA.hold?.cricle.id === fixedCricle.id) {
            startAndGoal.pointA.hold = undefined;
            console.log("delete pointA hold");
          }
          if (startAndGoal.pointB.hold?.cricle.id === fixedCricle.id) {
            startAndGoal.pointB.hold = undefined;
            console.log("delete pointB hold");
          }
        }
        isDelete = true;
      }
    }
    if (isDelete) {
      console.log("delete cricle");
      return;
    }

    // マウスが押されたときにcricleの位置を固定させる

    // 円周上にスタートかゴールがあるか
    for (const startAndGoal of startAndGoals) {
      const pointADist = p.dist(p.mouseX, p.mouseY, startAndGoal.pointA.x, startAndGoal.pointA.y);
      const pointBDist = p.dist(p.mouseX, p.mouseY, startAndGoal.pointB.x, startAndGoal.pointB.y);

      if (
        pointADist <= currentCricle.length / 2 + 10 &&
        pointADist >= currentCricle.length / 2 - 10 &&
        pointBDist <= currentCricle.length / 2 + 10 &&
        pointBDist >= currentCricle.length / 2 - 10
      ) {
        const fixedCricleA: Cricle = {
          id: crypto.randomUUID(),
          x: p.mouseX,
          y: p.mouseY,
          color: [
            currentCricle.color[0],
            currentCricle.color[1],
            currentCricle.color[2],
            currentCricle.color[3] / 2,
          ],
          length: currentCricle.length,
        };
        fixedCricles.push(fixedCricleA);
        const fixedCricleB: Cricle = {
          id: crypto.randomUUID(),
          x: p.mouseX,
          y: p.mouseY,
          color: [
            currentCricle.color[0],
            currentCricle.color[1],
            currentCricle.color[2],
            currentCricle.color[3] / 2,
          ],
          length: currentCricle.length,
        };
        fixedCricles.push(fixedCricleB);
        startAndGoal.pointA.hold = {
          cricle: fixedCricleA,
        };
        startAndGoal.pointB.hold = {
          cricle: fixedCricleB,
        };
        startAndGoals.push(initStartAndGoal());
      } else if (
        pointADist <= currentCricle.length / 2 + 10 &&
        pointADist >= currentCricle.length / 2 - 10
      ) {
        const fixedCricle: Cricle = {
          id: crypto.randomUUID(),
          x: p.mouseX,
          y: p.mouseY,
          color: currentCricle.color,
          length: currentCricle.length,
        };
        fixedCricles.push(fixedCricle);
        startAndGoal.pointA.hold = {
          cricle: fixedCricle,
        };
      } else if (
        pointBDist <= currentCricle.length / 2 + 10 &&
        pointBDist >= currentCricle.length / 2 - 10
      ) {
        const fixedCricle: Cricle = {
          id: crypto.randomUUID(),
          x: p.mouseX,
          y: p.mouseY,
          color: currentCricle.color,
          length: currentCricle.length,
        };
        fixedCricles.push(fixedCricle);
        startAndGoal.pointB.hold = {
          cricle: fixedCricle,
        };
      } else {
        const fixedCricle: Cricle = {
          id: crypto.randomUUID(),
          x: p.mouseX,
          y: p.mouseY,
          color: currentCricle.color,
          length: currentCricle.length,
        };
        fixedCricles.push(fixedCricle);
      }
    }

    // 円が5つを超えたら削除
    if (fixedCricles.length > 5) {
      // pointのholdを削除
      for (const startAndGoal of startAndGoals) {
        if (startAndGoal.pointA.hold?.cricle.id === fixedCricles[0].id) {
          startAndGoal.pointA.hold = undefined;
          console.log("delete pointA hold");
        }
        if (startAndGoal.pointB.hold?.cricle.id === fixedCricles[0].id) {
          startAndGoal.pointB.hold = undefined;
          console.log("delete pointB hold");
        }
      }
      fixedCricles.splice(0, 1);
    }
  };

  // 画面幅が変更されたときにキャンバスのサイズを変更する
  p.windowResized = () => {
    console.log("window resized");
    p.resizeCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
  };
};

new p5(sketch);
