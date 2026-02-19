import { useMemo, useState } from "react";
import type { Skill, SkillTool } from "@/lib/skillTypes";
import Chip from "./Chip";

const TOOL_OPTIONS: SkillTool[] = ["Principle", "After Effects", "Web"];

export default function SkillForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Skill;
  onCancel: () => void;
  onSave: (next: Skill) => void;
}) {
  const [draft, setDraft] = useState<Skill>(initial);

  const tagText = useMemo(() => (draft.tags || []).join(", "), [draft.tags]);
  const stepsText = useMemo(() => (draft.steps || []).join("\n"), [draft.steps]);

  function set<K extends keyof Skill>(key: K, value: Skill[K]) {
    setDraft((d) => ({ ...d, [key]: value, updatedAt: Date.now() }));
  }

  function toggleTool(tool: SkillTool) {
    const setTools = new Set(draft.tools || []);
    if (setTools.has(tool)) setTools.delete(tool);
    else setTools.add(tool);
    set("tools", Array.from(setTools));
  }

  function submit() {
    if (!draft.title.trim()) return alert("Title is required.");
    if (!draft.summary.trim()) return alert("Summary is required.");
    onSave(draft);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <div className="text-xs font-semibold text-[var(--lumen-muted)]">Title</div>
          <input
            className="w-full rounded-xl border border-[var(--lumen-border)] bg-white/40 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--lumen-lime)_35%,transparent)]"
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g., Drawer open/close — calm authority"
          />
        </label>

        <label className="space-y-1">
          <div className="text-xs font-semibold text-[var(--lumen-muted)]">Level</div>
          <select
            className="w-full rounded-xl border border-[var(--lumen-border)] bg-white/40 px-4 py-3 text-sm outline-none"
            value={draft.level}
            onChange={(e) => set("level", e.target.value as Skill["level"])}
          >
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>
        </label>
      </div>

      <label className="space-y-1">
        <div className="text-xs font-semibold text-[var(--lumen-muted)]">Summary</div>
        <textarea
          className="w-full min-h-[92px] rounded-xl border border-[var(--lumen-border)] bg-white/40 px-4 py-3 text-sm outline-none"
          value={draft.summary}
          onChange={(e) => set("summary", e.target.value)}
          placeholder="One or two sentences: what the skill achieves and when to use it."
        />
      </label>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-[var(--lumen-muted)]">Tools</div>
        <div className="flex flex-wrap gap-2">
          {TOOL_OPTIONS.map((t) => {
            const on = draft.tools?.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTool(t)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  on
                    ? "border-[color-mix(in_srgb,var(--lumen-lime)_45%,transparent)] bg-[color-mix(in_srgb,var(--lumen-lime)_18%,transparent)]"
                    : "border-[var(--lumen-border)] bg-white/35 hover:bg-white/60"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <label className="space-y-1">
        <div className="text-xs font-semibold text-[var(--lumen-muted)]">Tags (comma-separated)</div>
        <input
          className="w-full rounded-xl border border-[var(--lumen-border)] bg-white/40 px-4 py-3 text-sm outline-none"
          value={tagText}
          onChange={(e) => set("tags", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))}
          placeholder="parallax, easing, drawer, chips"
        />
        <div className="flex flex-wrap gap-2 pt-2">
          {(draft.tags || []).slice(0, 8).map((t) => (
            <Chip key={t} tone="neutral">{t}</Chip>
          ))}
        </div>
      </label>

      <label className="space-y-1">
        <div className="text-xs font-semibold text-[var(--lumen-muted)]">Steps (one per line)</div>
        <textarea
          className="w-full min-h-[160px] rounded-xl border border-[var(--lumen-border)] bg-white/40 px-4 py-3 text-sm outline-none font-mono"
          value={stepsText}
          onChange={(e) => set("steps", e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))}
          placeholder={"1) Define states\n2) Set easing\n3) Map distance→duration\n..."}
        />
      </label>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-[var(--lumen-muted)]">Parameters (Phase 0: simple defaults)</div>
        <div className="grid gap-3 md:grid-cols-3">
          <ParamField
            label="duration.standard"
            value={String(draft.parameters?.["duration.standard"] ?? 220)}
            onChange={(v) => set("parameters", { ...draft.parameters, ["duration.standard"]: Number(v) })}
          />
          <ParamField
            label="easing.primary"
            value={String(draft.parameters?.["easing.primary"] ?? "cubic-bezier(0.16, 1, 0.3, 1)")}
            onChange={(v) => set("parameters", { ...draft.parameters, ["easing.primary"]: v })}
          />
          <ParamField
            label="fps"
            value={String(draft.parameters?.["fps"] ?? 60)}
            onChange={(v) => set("parameters", { ...draft.parameters, ["fps"]: Number(v) })}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[var(--lumen-border)] bg-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/60 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submit}
          className="rounded-xl bg-[var(--lumen-black)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Save Skill
        </button>
      </div>
    </div>
  );
}

function ParamField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="space-y-1">
      <div className="text-xs font-semibold text-[var(--lumen-muted)]">{label}</div>
      <input
        className="w-full rounded-xl border border-[var(--lumen-border)] bg-white/40 px-4 py-2 text-sm outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
