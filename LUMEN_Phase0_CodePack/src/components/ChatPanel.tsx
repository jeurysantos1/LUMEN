import { useEffect, useRef } from "react";
import Chip from "./Chip";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
  ts: number;
};

export default function ChatPanel({
  messages,
  onSend,
  input,
  setInput,
}: {
  messages: ChatMessage[];
  onSend: () => void;
  input: string;
  setInput: (v: string) => void;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="rounded-[28px] border border-[var(--lumen-border)] bg-[var(--lumen-surface)] p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold tracking-tight">Motion Builder</div>
          <div className="text-sm text-[var(--lumen-muted)]">
            Chat with LUMEN (Phase 0: mock responses).
          </div>
        </div>
        <div className="flex gap-2">
          <Chip tone="lime">Principal motion</Chip>
          <Chip>Web-first</Chip>
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-auto space-y-3 pr-1">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-black text-white border-black/20"
                  : m.role === "system"
                  ? "bg-white/35 border-[var(--lumen-border)]"
                  : "bg-white/60 border-[var(--lumen-border)]"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-full border border-[var(--lumen-border)] bg-white/40 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--lumen-lime)_35%,transparent)]"
          placeholder='Describe the motion goal… e.g., "Drawer open with effortless authority"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? onSend() : null)}
        />
        <button
          onClick={onSend}
          className="rounded-full bg-[var(--lumen-black)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
