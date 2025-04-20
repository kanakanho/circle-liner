import type p5 from "p5";
import type { Color } from "./types/color";
import type { EventPoint } from "./types/global";
import star from "./util/star";

export type StartAndGoal<TColor extends Color> = {
  start: EventPoint<TColor>;
  goal: EventPoint<TColor>;
};

export type StartAndGoalProps<TColor extends Color> = {
  startAndGoal: StartAndGoal<TColor>;
  p: p5;
};

export function StartAndGoal<TColor extends Color>({ startAndGoal, p }: StartAndGoalProps<TColor>) {
  const { start, goal } = startAndGoal;
  const frameCount = p.frameCount;
  // スタート地点
  p.push();
  p.translate(start.x, start.y);
  p.rotate(frameCount / -300.0);
  star({
    x: 0,
    y: 0,
    color: start.color,
    radius1: 10,
    radius2: 20,
    npoints: 5,
    p,
  });
  p.fill(start.color[0], start.color[1], start.color[2]);
  p.noStroke();
  p.ellipse(0, 0, 10, 10);
  p.pop();

  // ゴール地点
  p.push();
  p.translate(goal.x, goal.y);
  p.rotate(frameCount / 300.0);
  star({
    x: 0,
    y: 0,
    color: goal.color,
    radius1: 10,
    radius2: 20,
    npoints: 5,
    p,
  });
  p.fill(goal.color[0], goal.color[1], goal.color[2]);
  p.noStroke();
  p.ellipse(0, 0, 10, 10);
  p.pop();
}
