import React from "react";

export default function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "lime" | "black";
}) {
  const cls =
    tone === "lime"
      ? "bg-[color-mix(in_srgb,var(--lumen-lime)_18%,transparent)] border-[color-mix(in_srgb,var(--lumen-lime)_45%,transparent)]"
      : tone === "black"
      ? "bg-black/5 border-black/15"
      : "bg-white/35 border-[var(--lumen-border)]";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}
