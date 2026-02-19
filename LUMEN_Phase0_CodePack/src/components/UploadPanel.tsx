import { useRef } from "react";
import Chip from "./Chip";

export type UploadFile = {
  name: string;
  size: number;
  type: string;
};

const ACCEPT = [
  "image/png",
  "image/jpeg",
  "video/mp4",
  "application/json",
  "text/plain",
];

export default function UploadPanel({
  files,
  onAdd,
  onRemove,
}: {
  files: UploadFile[];
  onAdd: (files: FileList) => void;
  onRemove: (name: string) => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="rounded-[28px] border border-[var(--lumen-border)] bg-[var(--lumen-surface)] p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold tracking-tight">Files</div>
          <div className="text-sm text-[var(--lumen-muted)]">
            Upload screens/videos/spec notes for context (Phase 0 keeps metadata only).
          </div>
        </div>
        <button
          onClick={() => ref.current?.click()}
          className="rounded-full bg-[var(--lumen-black)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Upload
        </button>
        <input
          ref={ref}
          type="file"
          accept=".png,.jpg,.jpeg,.mp4,.json,.txt"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) onAdd(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Chip tone="neutral">PNG</Chip>
        <Chip tone="neutral">JPG</Chip>
        <Chip tone="neutral">MP4</Chip>
        <Chip tone="neutral">JSON</Chip>
        <Chip tone="neutral">TXT</Chip>
      </div>

      <div className="mt-6 space-y-2">
        {files.length ? (
          files.map((f) => (
            <div
              key={f.name}
              className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-3"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{f.name}</div>
                <div className="text-xs text-[var(--lumen-muted)]">
                  {f.type || "unknown"} • {Math.round(f.size / 1024)} KB
                </div>
              </div>
              <button
                onClick={() => onRemove(f.name)}
                className="rounded-full border border-[var(--lumen-border)] bg-white/35 px-3 py-1 text-xs font-semibold hover:bg-white/60 transition"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-sm text-[var(--lumen-muted)]">
            No files uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
