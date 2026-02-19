export default function JsonViewer({ value }: { value: unknown }) {
  return (
    <pre className="whitespace-pre-wrap rounded-2xl border border-[var(--lumen-border)] bg-white/40 p-4 text-xs leading-relaxed overflow-auto">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
