import Link from "next/link";

export default function HomePage() {
  return (
    <main className="px-6 md:px-10 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[28px] border border-[var(--lumen-border)] bg-[var(--lumen-surface)] p-8 md:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lumen-border)] bg-white/40 px-4 py-2 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-[var(--lumen-lime)]" />
            Phase 0 — Foundation
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            LUMEN
          </h1>
          <p className="mt-3 text-base md:text-lg text-[var(--lumen-muted)] max-w-2xl">
            Principal Motion Intelligence System. Build a reusable motion skill library and generate structured motion specs
            (web-first) from prompts + files.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/skill-library"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--lumen-black)] px-5 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Open Skill Library
            </Link>
            <Link
              href="/motion-builder"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--lumen-border)] bg-white/40 px-5 py-3 font-semibold hover:bg-white/60 transition"
            >
              Open Motion Builder
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-5">
              <div className="text-sm font-semibold">Skill Library</div>
              <div className="mt-1 text-sm text-[var(--lumen-muted)]">
                Create, edit, tag, and reuse motion skills (LocalStorage MVP).
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-5">
              <div className="text-sm font-semibold">Motion Builder</div>
              <div className="mt-1 text-sm text-[var(--lumen-muted)]">
                Chat + upload files, generate structured motion outputs (mock engine in Phase 0).
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-5">
              <div className="text-sm font-semibold">Structured Output</div>
              <div className="mt-1 text-sm text-[var(--lumen-muted)]">
                Render principles, tokens, and component specs from JSON.
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-[var(--lumen-muted)]">
          Tip: Deploy on Vercel by importing your GitHub repo.
        </p>
      </div>
    </main>
  );
}
