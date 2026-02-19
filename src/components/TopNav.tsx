import Link from "next/link";

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="rounded-full border border-[var(--lumen-border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/60 transition"
  >
    {label}
  </Link>
);

export default function TopNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-[var(--lumen-border)] bg-[var(--lumen-cream)]/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="font-extrabold tracking-tight">
          LUMEN
        </Link>
        <div className="flex items-center gap-2">
          <NavLink href="/skill-library" label="Skill Library" />
          <NavLink href="/motion-builder" label="Motion Builder" />
        </div>
      </div>
    </div>
  );
}
