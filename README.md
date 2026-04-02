# Component Library

A personal collection of reusable components extracted from previous builds. Browse, copy, paste, and restyle as needed.

## Structure

```
components/
  ui/           Atomic UI elements (buttons, inputs, badges, toggles, etc.)
  layout/       Layout components (navbars, sidebars, headers, footers, grids)
  sections/     Page sections (hero, pricing, testimonials, CTA, features)
  forms/        Form patterns (contact, login, signup, checkout)
  patterns/     Composite patterns (modals, cards, tables, accordions, tabs)
hooks/          Reusable React hooks
utils/          Helper functions (cn, formatters, validators)
styles/         Shared styles, Tailwind config snippets
assets/         Icons, images, fonts
```

## How to use

1. Browse the [Component Catalog](#component-catalog) below
2. Find the component you need
3. Copy the file(s) into your project
4. Install any listed dependencies
5. Restyle to fit your project

## Adding components from a previous build

When importing components from a completed project, place them in the appropriate category folder. Each component should have:

- Its own folder named after the component (kebab-case)
- An `index.ts` barrel export
- Dependencies listed in a comment at the top of the file

Example:
```
components/ui/button/
  button.tsx        # The component
  index.ts          # export { Button } from './button'
```

### Dependency comment format

Add this to the top of each component file:

```tsx
// Dependencies: framer-motion, clsx, tailwind-merge
// Source: project-name (optional, for your reference)
```

---

## Component Catalog

> This catalog is updated each time new components are added.

### UI Components
_No components yet._

### Layout Components
_No components yet._

### Section Components
_No components yet._

### Form Components
_No components yet._

### Pattern Components
_No components yet._

### Hooks
_No hooks yet._

### Utilities
_No utilities yet._
