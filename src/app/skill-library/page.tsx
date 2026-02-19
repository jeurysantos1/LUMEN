"use client";

import { useMemo, useState } from "react";
import type { Skill } from "@/lib/skillTypes";
import { loadSkills, deleteSkill, upsertSkill } from "@/lib/skillStore";
import { makeId } from "@/lib/id";
import SkillCard from "@/components/SkillCard";
import Drawer from "@/components/Drawer";
import Modal from "@/components/Modal";
import SkillForm from "@/components/SkillForm";
import Chip from "@/components/Chip";

function blankSkill(): Skill {
  const now = Date.now();
  return {
    id: makeId("skill"),
    title: "",
    summary: "",
    tools: ["Web"],
    level: "intermediate",
    tags: [],
    steps: [],
    parameters: {
      "duration.standard": 220,
      "easing.primary": "cubic-bezier(0.16, 1, 0.3, 1)",
      fps: 60,
    },
    createdAt: now,
    updatedAt: now,
  };
}

export default function SkillLibraryPage() {
  const [skills, setSkills] = useState<Skill[]>(() => loadSkills());
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Skill | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editSkill, setEditSkill] = useState<Skill>(blankSkill());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter((s) =>
      [s.title, s.summary, (s.tags || []).join(" "), (s.tools || []).join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [skills, query]);

  function openSkill(s: Skill) {
    setSelected(s);
    setDrawerOpen(true);
  }

  function startCreate() {
    setEditSkill(blankSkill());
    setEditOpen(true);
  }

  function startEdit() {
    if (!selected) return;
    setEditSkill(selected);
    setEditOpen(true);
  }

  function handleSave(next: Skill) {
    const list = upsertSkill(next);
    setSkills(list);
    setSelected(next);
    setEditOpen(false);
  }

  function handleDelete() {
    if (!selected) return;
    if (!confirm("Delete this skill?")) return;
    const list = deleteSkill(selected.id);
    setSkills(list);
    setDrawerOpen(false);
    setSelected(null);
  }

  return (
    <main className="px-6 md:px-10 py-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Skill Library
            </h1>
            <p className="mt-2 text-[var(--lumen-muted)] max-w-2xl">
              Store reusable motion skills with steps, parameters, and web-first token outputs. (Phase 0: LocalStorage)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              className="w-full sm:w-[320px] rounded-full border border-[var(--lumen-border)] bg-white/40 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--lumen-lime)_35%,transparent)]"
              placeholder="Search skills…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={startCreate}
              className="rounded-full bg-[var(--lumen-black)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              + New Skill
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {filtered.length ? (
            filtered.map((s) => (
              <SkillCard key={s.id} skill={s} onOpen={() => openSkill(s)} />
            ))
          ) : (
            <div className="md:col-span-3 rounded-[28px] border border-[var(--lumen-border)] bg-[var(--lumen-surface)] p-10 text-center">
              <div className="text-lg font-extrabold tracking-tight">No skills yet</div>
              <div className="mt-2 text-sm text-[var(--lumen-muted)]">
                Create your first motion skill to build a reusable library.
              </div>
              <button
                onClick={startCreate}
                className="mt-5 rounded-full bg-[var(--lumen-black)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Create a Skill
              </button>
            </div>
          )}
        </div>

        <Drawer
          open={drawerOpen}
          title={selected?.title || "Skill"}
          onClose={() => setDrawerOpen(false)}
          footer={
            <div className="flex w-full items-center justify-between">
              <button
                onClick={handleDelete}
                className="rounded-xl border border-[var(--lumen-border)] bg-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/60 transition"
              >
                Delete
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={startEdit}
                  className="rounded-xl border border-[var(--lumen-border)] bg-white/35 px-4 py-2 text-sm font-semibold hover:bg-white/60 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          }
        >
          {selected ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {(selected.tools || []).map((t) => (
                  <Chip key={t} tone={t === "Web" ? "lime" : "neutral"}>{t}</Chip>
                ))}
                <Chip tone="black">{selected.level}</Chip>
              </div>

              <section className="space-y-2">
                <div className="text-sm font-extrabold tracking-tight">Summary</div>
                <div className="text-sm text-[var(--lumen-muted)]">{selected.summary}</div>
              </section>

              <section className="space-y-2">
                <div className="text-sm font-extrabold tracking-tight">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {(selected.tags || []).length ? (
                    selected.tags.map((t) => <Chip key={t}>{t}</Chip>)
                  ) : (
                    <div className="text-sm text-[var(--lumen-muted)]">No tags</div>
                  )}
                </div>
              </section>

              <section className="space-y-2">
                <div className="text-sm font-extrabold tracking-tight">Steps</div>
                {(selected.steps || []).length ? (
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    {selected.steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ol>
                ) : (
                  <div className="text-sm text-[var(--lumen-muted)]">No steps</div>
                )}
              </section>

              <section className="space-y-2">
                <div className="text-sm font-extrabold tracking-tight">Parameters</div>
                <pre className="rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-4 text-xs overflow-auto">
                  {JSON.stringify(selected.parameters || {}, null, 2)}
                </pre>
              </section>
            </div>
          ) : null}
        </Drawer>

        <Modal
          open={editOpen}
          title={editSkill.title ? "Edit Skill" : "New Skill"}
          onClose={() => setEditOpen(false)}
          footer={null}
        >
          <SkillForm
            initial={editSkill}
            onCancel={() => setEditOpen(false)}
            onSave={handleSave}
          />
        </Modal>
      </div>
    </main>
  );
}
