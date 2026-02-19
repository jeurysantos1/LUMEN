export type MotionOutput = {
  principles: string[];
  tokens: Record<string, string | number>;
  componentSpecs: Array<{
    component: string;
    trigger: string;
    properties: string[];
    durationMs: number;
    easing: string;
    keyframes: string[];
    reducedMotion: string;
  }>;
  implementation: {
    css: string;
    js: string;
    react: string;
  };
  notes: string[];
};
