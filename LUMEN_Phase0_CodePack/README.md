# LUMEN — Phase 0 (UI + Skill Library + Motion Builder) — Code Pack

This zip contains the **Phase 0 feature code** (Skill Library CRUD, Motion Builder chat + uploads, structured output viewer)
for a **Next.js App Router + TypeScript + Tailwind** project.

## How to use

1) Create a Next.js app:

```bash
npx create-next-app@latest lumen
cd lumen
```

Choose:
- TypeScript: Yes
- Tailwind: Yes
- App Router: Yes
- ESLint: Yes
- src directory: Yes

2) Copy the contents of this zip into your project root, **merging** with existing files.
It will replace:
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

And add:
- `src/app/skill-library/*`
- `src/app/motion-builder/*`
- `src/components/*`
- `src/lib/*`

3) Run:

```bash
npm run dev
```

## Routes

- `/` Home
- `/skill-library` Skill Library CRUD
- `/motion-builder` Motion Builder (chat + uploads + structured output)

## Storage

Phase 0 uses **LocalStorage** (no backend).
