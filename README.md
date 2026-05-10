# Component Library

A copy-paste component library built with React, TypeScript, and Tailwind CSS. Every component is self-contained, documented in Storybook, and designed to be dropped into any project and restyled.

**[Live Storybook](https://lambent-mochi-00fb7f.netlify.app/)** — browse all components with interactive previews.

## Quick Start

```bash
# 1. Find the component you need in Storybook or the catalog below
# 2. Copy the component folder into your project
cp -r components/patterns/hover-reveal-card ./src/components/

# 3. Install its dependencies (listed at the top of each .tsx file)
npm install motion lucide-react

# 4. Import and use
import { HoverRevealCard } from './components/hover-reveal-card'
```

Every component file starts with a dependency comment:
```tsx
// Dependencies: motion, lucide-react
// Source: project-name
```

Install whatever is listed. If it says `(none)`, the component only needs React.

## Project Structure

```
components/
  ui/           Atomic elements — cards, badges, avatars, loaders, toasts
  layout/       Structural components — sidebars, navbars
  sections/     Full page sections — heroes, galleries, testimonials
  patterns/     Composite patterns — modals, reveal cards, comparison layouts
  forms/        Form patterns (contact, login, checkout)
hooks/          Reusable React hooks
utils/          Animation presets and helper functions
styles/         Tailwind config and shared styles
public/         Static assets served by Storybook (videos, images)
```

### Component folder convention

Each component lives in its own folder:
```
components/patterns/hover-reveal-card/
  hover-reveal-card.tsx           # The component
  hover-reveal-card.stories.tsx   # Storybook stories
  index.ts                        # Barrel export
```

## Working With AI

This library is designed for AI-assisted development. Here are the most useful prompts:

**To use a component:**
> Copy the HoverRevealCard component into my project at src/components/ and show me how to use it with my data. Here's what I need to display: [your data shape]

**To restyle a component:**
> Take the KpiCard component and change it to match my design system. My brand colors are [colors], I use [font], and my cards have [border radius/shadow style].

**To adapt a component:**
> I want to use the TestimonialCarousel but I need it to show 3 cards per page instead of 2, and I want to remove the auto-rotate. Show me the changes.

**To combine components:**
> Build me a dashboard layout using SidebarNav on the left, a grid of KpiCards at the top, and HoverRevealCards below for my client list.

### AI context tips

- Point your AI at the specific `.tsx` file — each component is fully self-contained
- The `.stories.tsx` file shows every prop and usage pattern — feed it to your AI for context
- Components use inline styles rather than CSS variables, so they work without any theme setup
- `motion` and `framer-motion` are interchangeable — this library uses both (motion is the newer package name)

## Running Storybook Locally

```bash
npm install
npm run storybook        # starts on http://localhost:6006
npm run build-storybook  # builds static site to storybook-static/
```

## Editing Components

### Changing colors and styling

Most components use inline `style` props with hex colors rather than CSS variables. To restyle:

1. Open the `.tsx` file
2. Search for hex colors (e.g. `#C8A44E`, `#0064B0`) and replace with your brand colors
3. Tailwind classes handle layout and spacing — edit those as normal

Some components accept `accentColor` or `gradient` props — use those first before editing the source.

### Changing content

All story files use generic placeholder data. When you copy a component into your project, you'll pass your own data through props. The stories show you the exact data shape each component expects.

### Adding a new component

1. Create a folder: `components/[category]/your-component/`
2. Add three files:
   - `your-component.tsx` — with `// Dependencies:` comment at the top
   - `your-component.stories.tsx` — at least one story
   - `index.ts` — barrel export
3. Update the catalog table in this README

### Dependencies across the library

| Package | Used by | Purpose |
|---|---|---|
| `motion` / `framer-motion` | Most components | Animations, transitions, scroll effects |
| `lucide-react` | Cards, modals, nav | Icons |
| `@headlessui/react` | CatalogCard, CaseStudyModal | Accessible dialogs and tabs |
| `@heroicons/react` | CatalogCard, ImageLightbox | Icons |
| `react-fast-marquee` | ScrollingTestimonials | Auto-scrolling ticker |
| `react-force-graph-2d` | NetworkGraph | Force-directed graph visualization |
| `react-icons` | StakeholderPanels | Tabler icons |
| `react-countup` | AnimatedCounter | Number animation |
| `react-hot-toast` | ToastProvider | Toast notifications |

## Deployment

This Storybook is configured for Netlify deployment via `netlify.toml`. Any push to `main` triggers a rebuild.

To deploy elsewhere, run `npm run build-storybook` and serve the `storybook-static/` directory.

---

## Component Catalog

> 60+ components across 6 categories. Click any name to browse its source.

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
