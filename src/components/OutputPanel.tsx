import type { MotionOutput } from "@/lib/motionSchema";
import Chip from "./Chip";
import JsonViewer from "./JsonViewer";

export default function OutputPanel({ output }: { output: MotionOutput }) {
  return (
    <div className="rounded-[28px] border border-[var(--lumen-border)] bg-[var(--lumen-surface)] p-6 md:p-7 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold tracking-tight">Structured Output</div>
          <div className="text-sm text-[var(--lumen-muted)]">
            Principles • Tokens • Component Specs • Web Code Assets
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip tone="lime">Web-first</Chip>
          <Chip>Phase 0</Chip>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <Section title="Motion Principles">
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {output.principles.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </Section>

        <Section title="Motion Tokens">
          <JsonViewer value={output.tokens} />
        </Section>

        <Section title="Component Motion Specs">
          <div className="space-y-4">
            {output.componentSpecs.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-extrabold tracking-tight">{s.component}</div>
                  <div className="flex gap-2">
                    <Chip>{s.durationMs}ms</Chip>
                    <Chip>{s.easing}</Chip>
                  </div>
                </div>
                <div className="mt-2 text-sm text-[var(--lumen-muted)]">
                  <span className="font-semibold">Trigger:</span> {s.trigger}
                </div>
                <div className="mt-3 text-sm">
                  <div className="font-semibold">Properties</div>
                  <ul className="list-disc pl-5">
                    {s.properties.map((x, i) => <li key={i}>{x}</li>)}
                  </ul>
                </div>
                <div className="mt-3 text-sm">
                  <div className="font-semibold">Keyframes</div>
                  <ul className="list-disc pl-5">
                    {s.keyframes.map((x, i) => <li key={i}>{x}</li>)}
                  </ul>
                </div>
                <div className="mt-3 text-sm">
                  <div className="font-semibold">Reduce Motion</div>
                  <div className="text-[var(--lumen-muted)]">{s.reducedMotion}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Web Code Assets">
          <div className="grid gap-4 md:grid-cols-3">
            <CodeBlock title="CSS" code={output.implementation.css} />
            <CodeBlock title="JS" code={output.implementation.js} />
            <CodeBlock title="React" code={output.implementation.react} />
          </div>
        </Section>

        <Section title="Notes">
          <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--lumen-muted)]">
            {output.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <div className="text-sm font-extrabold tracking-tight">{title}</div>
      {children}
    </section>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-4">
      <div className="text-xs font-semibold text-[var(--lumen-muted)]">{title}</div>
      <pre className="mt-2 whitespace-pre-wrap text-xs overflow-auto">
        {code}
      </pre>
    </div>
  );
}
