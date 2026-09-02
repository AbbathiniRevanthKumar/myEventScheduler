// src/theme.js
export const COLORS = {
  bg: "#0B0D0A", // page background — near-black, slight green tint (terminal feel)
  panel: "#12150F", // card/section background — one step lighter than bg
  border: "#262B1D", // hairline borders — subtle, low contrast
  text: "#E8ECE0", // primary text — warm off-white, not pure white
  textDim: "#7C8570", // secondary/muted text — dim olive-gray

  waiting: "#E8A33D", // amber
  active: "#9FEF7A", // phosphor green — the "live" accent
  completed: "#6B9955", // dim green — done, no longer needs attention
  failed: "#E8574A", // warm red
};

export const statusColorClass = {
  RUNNING: "text-active",
  PENDING: "text-waiting",
  COMPLETED: "text-completed",
  FAILED: "text-failed",
  DEAD_LETTER: "text-failed",
};

export const statusBgClass = {
  RUNNING: "bg-active",
  PENDING: "bg-waiting",
  COMPLETED: "bg-completed",
  FAILED: "bg-failed",
  DEAD_LETTER: "bg-failed",
};