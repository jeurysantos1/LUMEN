import type { MotionOutput } from "./motionSchema";

export function mockGenerate(prompt: string): MotionOutput {
  const easing = "cubic-bezier(0.16, 1, 0.3, 1)";
  const base = 220;

  return {
    principles: [
      "Clarity over spectacle — motion should guide attention, not entertain.",
      "Distance-based duration — larger travel gets more time (capped).",
      "Two easing curves maximum — consistent feel across the system.",
      "Reduce Motion safe — avoid continuous or large parallax by default.",
    ],
    tokens: {
      "duration.micro": 120,
      "duration.standard": base,
      "duration.panel": 340,
      "easing.primary": easing,
      "easing.secondary": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
    componentSpecs: [
      {
        component: "Drawer",
        trigger: "Click FAB / Close button / ESC",
        properties: ["transform: translateY", "opacity (scrim)"],
        durationMs: 340,
        easing,
        keyframes: [
          "0%: drawer translateY(16px), opacity 0",
          "100%: drawer translateY(0), opacity 1",
        ],
        reducedMotion:
          "Disable translate motion; use opacity fade 140ms and instant position.",
      },
      {
        component: "Chip (M3 expressive)",
        trigger: "Appear (save/approve)",
        properties: ["opacity", "transform: scale"],
        durationMs: base,
        easing,
        keyframes: [
          "0%: opacity 0, scale(0.96)",
          "100%: opacity 1, scale(1)",
        ],
        reducedMotion: "Opacity only 120ms; no scale.",
      },
    ],
    implementation: {
      css: `:root{
  --duration-standard:${base}ms;
  --easing-primary:${easing};
}
.drawer-enter{
  transform: translateY(16px);
  opacity:0;
}
.drawer-enter-active{
  transform: translateY(0);
  opacity:1;
  transition: transform 340ms var(--easing-primary), opacity 340ms var(--easing-primary);
}`,
      js: `export const motion = {
  duration: { micro:120, standard:${base}, panel:340 },
  easing: { primary:"${easing}" }
};`,
      react: `// Example: apply classes on open
// <div className={open ? "drawer-enter-active" : "drawer-enter"} />`,
    },
    notes: [
      `Prompt received: ${prompt}`,
      "Phase 0 uses a mock generator. Phase 1 will call /api/generate.",
    ],
  };
}
