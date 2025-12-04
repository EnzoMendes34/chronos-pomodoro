import type { TaskModel } from "../models/TaskModel";

export function getNextCycleTyple(currentCycle: number): TaskModel["type"] {
  if (currentCycle === 8) return "longBreakTime";
  return currentCycle % 2 === 1 ? "workTime" : "shortBreakTime";
}
