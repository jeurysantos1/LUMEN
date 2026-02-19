import type { Skill } from "./skillTypes";

const KEY = "lumen_skill_library_v1";

export function loadSkills(): Skill[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Skill[];
  } catch {
    return [];
  }
}

export function saveSkills(skills: Skill[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(skills));
}

export function upsertSkill(skill: Skill): Skill[] {
  const list = loadSkills();
  const idx = list.findIndex((s) => s.id === skill.id);
  const next = idx >= 0 ? [...list.slice(0, idx), skill, ...list.slice(idx + 1)] : [skill, ...list];
  saveSkills(next);
  return next;
}

export function deleteSkill(id: string): Skill[] {
  const next = loadSkills().filter((s) => s.id !== id);
  saveSkills(next);
  return next;
}
