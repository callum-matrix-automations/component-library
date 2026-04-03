# Component Library

A personal collection of reusable components extracted from previous builds. Browse, copy, paste, and restyle as needed.

## Structure

```
components/
  ui/           Atomic UI elements (buttons, inputs, badges, toggles)
  layout/       Layout components (navbars, sidebars, headers, footers)
  sections/     Page sections (hero, pricing, testimonials, CTA)
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

| Component | Description | Dependencies |
|---|---|---|
| [AnimatedHeading](components/ui/animated-heading/) | Scroll-triggered heading animation with configurable delay, tag level (h1-h6), and threshold | framer-motion |
| [AnimatedSection](components/ui/animated-section/) | Directional scroll-triggered section animation (up/down/left/right/scale) | framer-motion |
| [AnimatedGrid](components/ui/animated-grid/) | Staggered grid animation container with customizable stagger/delay timing | framer-motion |
| [PageTransition](components/ui/page-transition/) | Route-level opacity fade transition wrapper | framer-motion |
| [MagneticButton](components/ui/magnetic-button/) | Button with magnetic cursor-follow effect and spring physics | framer-motion |
| [MagneticButtonWrapper](components/ui/magnetic-button-wrapper/) | HOC wrapper that adds magnetic effect to any button or div element | framer-motion |
| [TabbedInterface](components/ui/tabbed-interface/) | Tab component with animated underline indicator and customizable colors | (none) |
| [FeatureBadge](components/ui/feature-badge/) | Small badge with style variants (default/popular/new) | (none) |
| [SkeletonCard](components/ui/skeleton-card/) | Card loading skeleton with shimmer animation | framer-motion |
| [SkeletonText](components/ui/skeleton-text/) | Text loading skeleton with configurable line count and shimmer | framer-motion |
| [ScrollProgress](components/ui/scroll-progress/) | Fixed progress bar tracking page scroll position | framer-motion |
| [PageLoader](components/ui/page-loader/) | Full-height centered loading spinner with customizable colors | (none) |
| [AnimatedCounter](components/ui/animated-counter/) | Scroll-triggered number counter with prefix/suffix/decimals | react-countup |
| [ImageWithLoading](components/ui/image-with-loading/) | Image with skeleton loading, blur placeholder, and error fallback | framer-motion |
| [ImageGallery](components/ui/image-gallery/) | Responsive grid gallery with built-in lightbox (2 or 3 columns) | lucide-react |
| [CinematicGallery](components/ui/cinematic-gallery/) | Infinite horizontal scroll gallery with auto-play and manual navigation | framer-motion |
| [ImageLightbox](components/ui/image-lightbox/) | Full-screen image viewer with zoom (1-3x), navigation, and keyboard support | @headlessui/react, @heroicons/react |

### Layout Components
_No components yet._

### Section Components
_No components yet._

### Form Components
_No components yet._

### Pattern Components

| Component | Description | Dependencies |
|---|---|---|
| [Accordion](components/patterns/accordion/) | Expandable FAQ/accordion item with smooth height animation and active highlight | framer-motion, lucide-react |
| [Timeline](components/patterns/timeline/) | Vertical timeline with scroll-triggered animations, active dot indicators, and gradient progress line | framer-motion |
| [CookieConsent](components/patterns/cookie-consent/) | GDPR cookie consent banner with animated cookie icon, localStorage persistence | framer-motion, lucide-react |
| [ToastProvider](components/patterns/toast-provider/) | Styled toast notification provider with success/error/loading themes | react-hot-toast |

### Hooks

| Hook | Description | Dependencies |
|---|---|---|
| [useMagneticEffect](hooks/use-magnetic-effect/) | Magnetic cursor-follow effect with spring physics — returns ref, x, y, isHovered | framer-motion |
| [useIntersectionObserver](hooks/use-intersection-observer/) | Viewport visibility detection with triggerOnce option — returns ref, isVisible | (none) |
| [useRecaptcha](hooks/use-recaptcha/) | Google reCAPTCHA v3 token generation with loading state | (none — external script) |

### Utilities

| Utility | Description | Dependencies |
|---|---|---|
| [animationVariants](utils/animation-variants/) | 11 Framer Motion variant presets: fadeIn (4 directions), scaleIn, stagger, heading, blurFade, slideIn | framer-motion |
| [iconAnimations](utils/icon-animations/) | 13 icon animation presets: pulse, bounce, spin, hover, wiggle, glow, float, shake, click, badge, fade, colorShift | framer-motion |
