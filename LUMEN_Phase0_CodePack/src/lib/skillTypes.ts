export type SkillTool = "Principle" | "After Effects" | "Web";

export type Skill = {
  id: string;
  title: string;
  summary: string;
  tools: SkillTool[];
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  steps: string[];
  parameters: Record<string, string | number | boolean>;
  createdAt: number;
  updatedAt: number;
};
