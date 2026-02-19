"use client";

import { useMemo, useState } from "react";
import ChatPanel, { ChatMessage } from "@/components/ChatPanel";
import UploadPanel, { UploadFile } from "@/components/UploadPanel";
import OutputPanel from "@/components/OutputPanel";
import { mockGenerate } from "@/lib/mockGenerate";
import type { MotionOutput } from "@/lib/motionSchema";

export default function MotionBuilderPage() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "Upload screens/videos + describe the motion. I’ll output structured motion principles, tokens, component specs, and web code assets. (Phase 0 uses mock generation.)",
      ts: Date.now(),
    },
  ]);

  const [output, setOutput] = useState<MotionOutput | null>(null);

  const canGenerate = useMemo(() => input.trim().length > 0, [input]);

  function addFiles(list: FileList) {
    const next: UploadFile[] = [];
    for (const f of Array.from(list)) {
      next.push({ name: f.name, size: f.size, type: f.type });
    }
    setFiles((prev) => {
      const byName = new Map(prev.map((x) => [x.name, x]));
      for (const f of next) byName.set(f.name, f);
      return Array.from(byName.values());
    });
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((x) => x.name !== name));
  }

  function send() {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { role: "user", content: text, ts: Date.now() }]);
    setInput("");

    // Phase 0: mock agent response + structured output
    const out = mockGenerate(text);
    setOutput(out);

    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content:
          "✅ Generated: motion principles + tokens + component specs + web assets. Review the structured output panel.",
        ts: Date.now(),
      },
    ]);
  }

  return (
    <main className="px-6 md:px-10 py-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Motion Builder
          </h1>
          <p className="mt-2 text-[var(--lumen-muted)] max-w-3xl">
            Phase 0 interface: chat + uploads + structured output viewer. Phase 1 will connect to a real agent via <span className="font-mono">/api/generate</span>.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChatPanel
            messages={messages}
            onSend={send}
            input={input}
            setInput={setInput}
          />
          <UploadPanel files={files} onAdd={addFiles} onRemove={removeFile} />
        </div>

        <div className="mt-6">
          {output ? (
            <OutputPanel output={output} />
          ) : (
            <div className="rounded-[28px] border border-[var(--lumen-border)] bg-[var(--lumen-surface)] p-10 text-center text-sm text-[var(--lumen-muted)]">
              No output yet — describe a motion goal and press <span className="font-semibold">Send</span>.
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            disabled={!canGenerate}
            onClick={() => {
              // export structured output as JSON (Phase 0 convenience)
              if (!output) return;
              const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "lumen_motion_output.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              output
                ? "bg-[var(--lumen-black)] text-white hover:opacity-90"
                : "bg-black/10 text-black/40 cursor-not-allowed"
            }`}
          >
            Export Output (JSON)
          </button>
        </div>
      </div>
    </main>
  );
}
