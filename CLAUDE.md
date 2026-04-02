# Component Library — Claude Instructions

## What this repo is
A personal copy-paste component library. No build step, no publishing. Just organized, documented code ready to drop into any project.

## Folder structure
- `components/ui/` — Atomic UI elements (buttons, inputs, badges, toggles)
- `components/layout/` — Layout components (navbars, sidebars, headers, footers)
- `components/sections/` — Page sections (hero, pricing, testimonials, CTA)
- `components/forms/` — Form patterns (contact, login, signup, checkout)
- `components/patterns/` — Composite patterns (modals, cards, tables, tabs)
- `hooks/` — Reusable React hooks
- `utils/` — Helper functions
- `styles/` — Shared styles / Tailwind snippets
- `assets/` — Icons, images, fonts

## Component format
Each component lives in its own folder (kebab-case) with:
- `component-name.tsx` — the component code
- `index.ts` — barrel export

Top of each component file must include:
```tsx
// Dependencies: package1, package2
// Source: project-name
```

## CRITICAL: Update catalog after every change
After adding, removing, or renaming any components, **always regenerate the Component Catalog section in README.md**. The catalog should list every component with:
- Component name
- One-line description
- Dependencies
- Source project (if noted)

This is the primary way the user browses available components. It must always be accurate and up to date.
