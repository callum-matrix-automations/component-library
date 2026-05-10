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
| [AnimatedCounter](components/ui/animated-counter/) | Scroll-triggered number counter with prefix/suffix/decimals | react-countup |
| [AnimatedGrid](components/ui/animated-grid/) | Staggered grid animation container with customizable stagger/delay timing | framer-motion |
| [AnimatedHeading](components/ui/animated-heading/) | Scroll-triggered heading animation with configurable delay, tag level (h1-h6), and threshold | framer-motion |
| [AnimatedSection](components/ui/animated-section/) | Directional scroll-triggered section animation (up/down/left/right/scale) | framer-motion |
| [AvatarChip](components/ui/avatar-chip/) | Pill-shaped badge with avatar/icon, label, and color variants (includes ChipRow container) | (none) |
| [AvatarStack](components/ui/avatar-stack/) | Overlapping avatar row with hover scale, status dots, tooltips, and overflow indicator | motion, lucide-react |
| [CinematicGallery](components/ui/cinematic-gallery/) | Infinite horizontal scroll gallery with auto-play and manual navigation | framer-motion |
| [FeatureBadge](components/ui/feature-badge/) | Small badge with style variants (default/popular/new) | (none) |
| [ImageGallery](components/ui/image-gallery/) | Responsive grid gallery with built-in lightbox (2 or 3 columns) | lucide-react |
| [ImageLightbox](components/ui/image-lightbox/) | Full-screen image viewer with zoom (1-3x), navigation, and keyboard support | @headlessui/react, @heroicons/react |
| [ImageWithLoading](components/ui/image-with-loading/) | Image with skeleton loading, blur placeholder, and error fallback | framer-motion |
| [KpiCard](components/ui/kpi-card/) | Metric card with label, value, trend indicator, delta, icon, and 8 color tones | lucide-react |
| [MagneticButton](components/ui/magnetic-button/) | Button with magnetic cursor-follow effect and spring physics | framer-motion |
| [MagneticButtonWrapper](components/ui/magnetic-button-wrapper/) | HOC wrapper that adds magnetic effect to any button or div element | framer-motion |
| [PageLoader](components/ui/page-loader/) | Full-height centered loading spinner with customizable colors | (none) |
| [PageTransition](components/ui/page-transition/) | Route-level opacity fade transition wrapper | framer-motion |
| [ProfileCard](components/ui/profile-card/) | Glass-morphism profile card with avatar/full-body modes, plus GlassCard, GlassHighlight, and GlassLinkRow primitives | motion, lucide-react |
| [ProgressPillars](components/ui/progress-pillars/) | Animated column chart showing segment completion with staggered fill animation | motion |
| [ScrollProgress](components/ui/scroll-progress/) | Fixed progress bar tracking page scroll position | framer-motion |
| [SkeletonCard](components/ui/skeleton-card/) | Card loading skeleton with shimmer animation | framer-motion |
| [SkeletonText](components/ui/skeleton-text/) | Text loading skeleton with configurable line count and shimmer | framer-motion |
| [TabbedInterface](components/ui/tabbed-interface/) | Tab component with animated underline indicator and customizable colors | (none) |
| [ToastSystem](components/ui/toast-system/) | Toast notification system with 5 types, auto-dismiss, slide animation, and trigger panel | lucide-react |

### Layout Components

| Component | Description | Dependencies |
|---|---|---|
| [SidebarNav](components/layout/sidebar-nav/) | Collapsible sidebar navigation with grouped items, active indicator, tooltips, and expand/collapse animation | motion, lucide-react |

### Section Components

| Component | Description | Dependencies |
|---|---|---|
| [CaseStudyHero](components/sections/case-study-hero/) | Full-width hero with background image, gradient overlay, and stat badges | motion |
| [CaseStudyModal](components/sections/case-study-modal/) | Slideout modal for case study detail with image, stats, and body content | motion, @headlessui/react |
| [DealCardCascade](components/sections/deal-card-cascade/) | Cascading animated deal cards with price, features, and CTA | motion |
| [HorizontalCardScroll](components/sections/horizontal-card-scroll/) | Horizontally scrolling card row with snap points and navigation arrows | motion |
| [PortfolioGallery](components/sections/portfolio-gallery/) | Expandable hover gallery with vertical titles, gradient overlays, and mobile card fallback | motion |
| [ProcessSection](components/sections/process-section/) | Numbered step-by-step process layout with icons and connecting lines | motion |
| [ScrollingTestimonials](components/sections/scrolling-testimonials/) | Auto-scrolling marquee of review cards with star ratings, gradient fade edges, and pause-on-hover | react-fast-marquee |
| [ScrollVideoHero](components/sections/scroll-video-hero/) | Scroll-driven two-video hero with scroll-synced playback, animated stat counters, testimonials, and trust badges | (none) |
| [ShuffleHero](components/sections/shuffle-hero/) | Hero with animated shuffling image grid and headline | motion |
| [SplitPanelHero](components/sections/split-panel-hero/) | Full-screen hero with left headline and right 2x2 quadrant grid with metrics | motion |
| [StakeholderPanels](components/sections/stakeholder-panels/) | Three expanding hover panels for role-based navigation with gradient backgrounds | motion, react-icons |
| [StickyNarrativeSections](components/sections/sticky-narrative-sections/) | Sticky scroll sections with narrative text and paired visuals | motion |
| [TrustBar](components/sections/trust-bar/) | Logo trust bar / social proof strip | (none) |
| [VideoHero](components/sections/video-hero/) | Full-screen video hero with parallax scroll, custom controls, play overlay, and optional timed CTA cutoff | motion, lucide-react |

### Form Components
_No components yet._

### Pattern Components

| Component | Description | Dependencies |
|---|---|---|
| [Accordion](components/patterns/accordion/) | Expandable FAQ/accordion item with smooth height animation and active highlight | framer-motion, lucide-react |
| [CatalogCard](components/patterns/catalog-card/) | Product card with image carousel, specs, and click-to-open detail modal with tabs and side-by-side comparison | motion, lucide-react, @headlessui/react, @heroicons/react |
| [ComparisonColumns](components/patterns/comparison-columns/) | Two-column don't/do comparison with dark gradient, staggered animations, and optional closing anchor card | motion, lucide-react |
| [CookieConsent](components/patterns/cookie-consent/) | GDPR cookie consent banner with animated cookie icon, localStorage persistence | framer-motion, lucide-react |
| [CostOfInactionCard](components/patterns/cost-of-inaction-card/) | Full-width warning card with red gradient, diagonal stripes, icon, and bold message | motion, lucide-react |
| [DetailModal](components/patterns/detail-modal/) | Full-screen detail modal with portrait, categorized field rows, stat bars, and glass-morphism styling | lucide-react |
| [FounderQuoteCard](components/patterns/founder-quote-card/) | Pull-quote card with dark gradient, diagonal stripe texture, and colored attribution | motion |
| [HoverRevealCard](components/patterns/hover-reveal-card/) | Card with hover-triggered detail reveal, animated progress bars, and swappable footer text | motion, lucide-react |
| [IssueCard](components/patterns/issue-card/) | Numbered problem/issue card with gradient border, corner glow hover, and index marker | motion |
| [ModelCard](components/patterns/model-card/) | Product card with swipeable image carousel, specs, price, and click-to-open detail modal with features and floor plans | (none) |
| [NetworkGraph](components/patterns/network-graph/) | Interactive force-directed graph modal with canvas rendering, node popups, group legend, and zoom/pan | react-force-graph-2d |
| [NextStepCard](components/patterns/next-step-card/) | CTA card with image panel, diagonal stripes, stat strip, and horizontal/vertical layout options | motion |
| [ProductModal](components/patterns/product-modal/) | Product detail modal with image, tier badges, highlights, specs, and add-to-cart action | motion, lucide-react |
| [ServiceAreaCard](components/patterns/service-area-card/) | Image card with gradient overlay and hover zoom for location/service areas | (none) |
| [StepCard](components/patterns/step-card/) | Numbered process card with accent rule, callout box, benefits grid, ghost number, and cascading indent | motion |
| [TestimonialCard](components/patterns/testimonial-card/) | Written testimonial card with headline, body, attribution; includes carousel and video card variants | motion, lucide-react |
| [Timeline](components/patterns/timeline/) | Vertical timeline with scroll-triggered animations, active dot indicators, and gradient progress line | framer-motion |
| [ToastProvider](components/patterns/toast-provider/) | Styled toast notification provider with success/error/loading themes | react-hot-toast |
| [VideoFeatureCard](components/patterns/video-feature-card/) | Dark gradient card with embedded autoplay video, stat hero, headline, and 2x2 benefits grid with custom SVG icons | motion |

### Hooks

| Hook | Description | Dependencies |
|---|---|---|
| [useIntersectionObserver](hooks/use-intersection-observer/) | Viewport visibility detection with triggerOnce option — returns ref, isVisible | (none) |
| [useMagneticEffect](hooks/use-magnetic-effect/) | Magnetic cursor-follow effect with spring physics — returns ref, x, y, isHovered | framer-motion |
| [useRecaptcha](hooks/use-recaptcha/) | Google reCAPTCHA v3 token generation with loading state | (none — external script) |

### Utilities

| Utility | Description | Dependencies |
|---|---|---|
| [animationVariants](utils/animation-variants/) | 11 Framer Motion variant presets: fadeIn (4 directions), scaleIn, stagger, heading, blurFade, slideIn | framer-motion |
| [iconAnimations](utils/icon-animations/) | 13 icon animation presets: pulse, bounce, spin, hover, wiggle, glow, float, shake, click, badge, fade, colorShift | framer-motion |
