import React, { useEffect } from "react";

export default function Drawer({
  open,
  title,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      <div
        className="absolute right-0 top-0 h-full w-full max-w-xl border-l border-[var(--lumen-border)] bg-[var(--lumen-cream)] shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[var(--lumen-border)] flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-extrabold tracking-tight">{title}</div>
            <div className="text-sm text-[var(--lumen-muted)]">Details</div>
          </div>
          <button
            className="rounded-full border border-[var(--lumen-border)] bg-white/40 px-3 py-1 text-sm font-semibold hover:bg-white/60 transition"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-auto h-[calc(100%-140px)]">{children}</div>

        {footer ? (
          <div className="p-6 border-t border-[var(--lumen-border)] flex items-center justify-end gap-2">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
