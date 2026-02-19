import type { Skill } from "@/lib/skillTypes";
import Chip from "./Chip";

export default function SkillCard({
  skill,
  onOpen,
}: {
  skill: Skill;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="text-left rounded-[24px] border border-[var(--lumen-border)] bg-[var(--lumen-surface)] p-6 shadow-sm hover:shadow-md transition"
    >
      <div className="text-sm font-extrabold tracking-tight">{skill.title}</div>
      <div className="mt-1 text-xs text-[var(--lumen-muted)]">
        {(skill.tools || []).join(" • ")} • {skill.level}
      </div>

      <div className="mt-3 text-sm text-[var(--lumen-muted)] line-clamp-3">
        {skill.summary}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(skill.tags || []).slice(0, 5).map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </button>
  );
}
