---
name: Hoi An Heritage Hub — Codebase Edition
colors:
  surface: '#fff8ef'
  surface-dim: '#e1d9ca'
  surface-bright: '#fff8ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf3e3'
  surface-container: '#f5eddd'
  surface-container-high: '#efe7d8'
  surface-container-highest: '#e9e2d2'
  on-surface: '#1e1b12'
  on-surface-variant: '#4c4634'
  inverse-surface: '#343026'
  inverse-on-surface: '#f8f0e0'
  outline: '#837567'
  outline-variant: '#cfc6ae'
  surface-tint: '#705d00'
  primary: '#705d00'
  on-primary: '#ffffff'
  primary-container: '#f4d03f'
  on-primary-container: '#6c5900'
  inverse-primary: '#e7c433'
  secondary: '#006b5d'
  on-secondary: '#ffffff'
  secondary-container: '#90f1dd'
  on-secondary-container: '#006f61'
  tertiary: '#865300'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffc98b'
  on-tertiary-container: '#815000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe174'
  primary-fixed-dim: '#e7c433'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#554500'
  secondary-fixed: '#93f4e0'
  secondary-fixed-dim: '#76d7c4'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#005046'
  tertiary-fixed: '#ffddb9'
  tertiary-fixed-dim: '#ffb961'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#663e00'
  background: '#fff8ef'
  on-background: '#1e1b12'
  surface-variant: '#e9e2d2'
  surface-warm: '#f5f0e8'
  surface-cool: '#f0f7f5'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  display-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  body:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 8px
  margin-mobile: 24px
  margin-desktop: 80px
  gutter: 24px
  section-gap: 120px
---

# Design System: Hoi An Heritage Hub — Codebase Edition

## 1. Visual Theme & Atmosphere

**"Where Time Breathes"**

Hoi An is not a museum piece behind glass — it is a living town where ancient yellow walls house creative cafes, where the Thu Bon River carries both fishing boats and modern dreams. This design captures that duality through a warm, editorial aesthetic that feels simultaneously ancient and fresh.

The overall mood is airy, warm, and inviting. The palette draws from the ochre walls of the Ancient Town at golden hour, the cool mint of river water, and the spice-orange glow of silk lanterns. Generous whitespace lets the content breathe, while asymmetric layouts break rigid grids to mimic the organic, lived-in character of the town itself.

## 2. Color Palette & Roles

### Primary Foundation
- **Warm Cream Surface** (`#fff8ef`) — The dominant background, evoking aged rice paper and sun-washed walls. Used for body background and primary surfaces.
- **Deep Brown-Black** (`#1e1b12`) — Primary text color. Softer than pure black to maintain the "aged paper" warmth.
- **Muted Olive-Gray** (`#4c4634`) — Secondary text, captions, and metadata. Earthy and understated.

### Accent & Interactive
- **Sunlit Ochre** (`#705d00`) — Primary brand color. The color of Hoi An's famous walls. Used for primary CTAs, active navigation states, and heritage category tags.
- **Tropical Mint** (`#006b5d`) — Secondary accent. The color of river water and new leaves. Used for nature sections, secondary buttons, and "explore" actions.
- **Spice Orange** (`#865300`) — Tertiary accent. The color of lanterns and spice markets. Used for food sections, social links, and tertiary CTAs.

### Typography & Text Hierarchy
- **On-Primary** (`#ffffff`) — Text on ochre backgrounds.
- **On-Secondary** (`#ffffff`) — Text on mint backgrounds.
- **On-Tertiary** (`#ffffff`) — Text on orange backgrounds.
- **On-Primary-Container** (`#6c5900`) — Text on sunlit yellow containers.
- **On-Secondary-Container** (`#006f61`) — Text on mint containers.
- **On-Tertiary-Container** (`#815000`) — Text on orange containers.

### Functional States
- **Error** (`#ba1a1a`) — Destructive actions and validation errors.
- **Error Container** (`#ffdad6`) — Error message backgrounds.
- **Outline** (`#837567`) — Subtle borders and dividers at low opacity.
- **Outline Variant** (`#cfc6ae`) — Ghost borders for inputs and cards.

### Surface Hierarchy
- **Surface Bright** (`#fff8ef`) — Primary page background.
- **Surface Container Low** (`#fbf3e3`) — Subtle section differentiation.
- **Surface Container** (`#f5eddd`) — Card backgrounds and elevated sections.
- **Surface Container High** (`#efe7d8`) — Footer and prominent elevated areas.
- **Surface Container Highest** (`#e9e2d2`) — Dense information modules.
- **Surface Warm** (`#f5f0e8`) — Warm-toned card backgrounds.
- **Surface Cool** (`#f0f7f5`) — Cool-toned card backgrounds for nature sections.

## 3. Typography Rules

### Font Families
- **Noto Serif** — The "Historical Voice." Used for all headlines, hero text, and display typography. Its elegant serifs evoke vintage travel journals and handwritten scrolls. Character: authoritative yet poetic, with generous breathing room.
- **Manrope** — The "Modern Guide." Used for body text, labels, navigation, and UI elements. Character: geometric sans-serif, clean and structural, providing clarity for travel logistics and practical information.

### Hierarchy & Weights
- **Display Large** — 48px, Noto Serif, weight 700, line-height 1.1. Hero headlines. Mobile: 36px.
- **Headline** — 32px, Noto Serif, weight 600, line-height 1.2. Section titles and prominent headings.
- **Body** — 16px, Manrope, weight 400, line-height 1.5. Paragraphs, descriptions, and general content.
- **Label** — 12px, Manrope, weight 600, uppercase, letter-spacing 0.1em. Category tags, overlines, and metadata. Scholarly, curated feel.

### Spacing Principles
- Display text uses tight line-height (1.1–1.2) for impact.
- Body text uses generous line-height (1.5) for readability.
- Labels use wide letter-spacing (0.1em) for elegance and scanability.
- Headlines pair with sans-serif labels for contrast and hierarchy.

## 4. Component Stylings

### Buttons
- **Primary (Ochre)** — Solid `#f4d03f` background with `#221b00` text. `rounded-lg` (8px). Bold weight. Hover: shifts to `#e7c433` with subtle scale transform.
- **Secondary (Mint)** — Solid `#76d7c4` background with `#00201b` text. `rounded-lg`. Bold weight. Hover: shifts to `#93f4e0`.
- **Tertiary (Orange)** — Solid `#f39c12` background with `#ffffff` text. Used for special CTAs.
- **Ghost** — Transparent with 2px border in ochre, dark text. Hover: fills with ochre.
- **Category Pills** — `rounded-full` (pill shape). Active state: ochre fill. Inactive: white/20% background with white text.
- **Transition** — All buttons use `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for hover states.

### Cards & Containers
- **Standard Cards** — White (`#ffffff`) background, `rounded-2xl` (16px), subtle shadow (`0 4px 20px rgba(27,28,26,0.06)`).
- **Featured Cards** — Larger, image-dominant with text overlay. `rounded-2xl`.
- **Hover State** — Cards lift with `translateY(-4px)` and softer shadow on hover.
- **Image Treatment** — Images inside cards use `rounded-xl` (12px) to soften photography against the UI.
- **No hard borders** — Cards are defined by background color shifts and shadows, not lines.

### Navigation
- **Floating Glass Bar** — Fixed position, `backdrop-blur-md` (20px blur), semi-transparent white (`bg-white/95` or `bg-[#faf9f5]/95`), subtle shadow.
- **Logo** — Noto Serif, 3xl, bold, in tertiary orange (`#815000`). Hover darkens to `#5a3a00`.
- **Links** — Manrope, medium weight, 18px. Active: ochre with bottom border. Inactive: gray, hover to ochre.
- **Search** — `rounded-full` input with gray background, focus ring in ochre at 20% opacity.
- **CTA Button** — Ochre (`#815000`) with white text, `rounded-sm`, semibold. Hover darkens.

### Inputs & Forms
- **Search Overlay** — Glassmorphism container: `bg-white/10`, `backdrop-blur-md`, `rounded-2xl`, `border-white/20`.
- **Text Inputs** — Transparent background, white text with white/50 placeholder. Focus: outline-none.
- **Ghost Border Fallback** — For accessibility, `outline-variant` (`#cfc6ae`) at 20% opacity.

### Tags & Chips
- **Heritage Tags** — Pill-shaped, ochre at 15% opacity background with `#705d00` text.
- **Nature Tags** — Mint at 15% opacity background with `#006b5d` text.
- **Food Tags** — Orange at 15% opacity background with `#865300` text.
- **Footer Tags** — White background, `rounded-full`, hover transitions to tertiary color.

## 5. Layout Principles

### Grid & Structure
- **Max Content Width** — Centered containers with max-width constraints (max-w-5xl, max-w-7xl).
- **Page Margins** — 24px on mobile (`px-margin-mobile`), 80px on desktop (`px-margin-desktop`).
- **Section Spacing** — 120px gap between major sections (`mt-section-gap`).
- **Gutter** — 24px between grid columns (`gap-gutter`).

### Whitespace Strategy
- **Generous breathing room** — If a section feels cramped, add more margin. Whitespace is a core design value.
- **Base unit** — 8px spacing grid (`spacing-base-unit`).
- **Hero padding** — Large bottom padding (32px/128px) to create cinematic negative space.

### Alignment & Visual Balance
- **Asymmetry by design** — Large headlines left-aligned, descriptive paragraphs offset right.
- **Text alignment** — Hero text centered for impact; body content left-aligned for readability.
- **Image-to-text ratios** — Cards often feature full-bleed images with overlaid text gradients.

### Responsive Behavior
- **Mobile-first** approach with Tailwind breakpoints.
- **Navigation** — Hidden on mobile, full horizontal on md+.
- **Hero** — Display text scales from 36px (mobile) to 64px (desktop).
- **Grid** — Single column on mobile, multi-column on md+.
- **Touch targets** — All interactive elements meet 44px minimum.

## 6. Animation & Motion

### Core Animations
- **Breath** — 20s ease-in-out infinite scale (1.05 to 1.1) on hero background image. Creates a slow, living zoom effect.
- **Lantern Glow** — 3s ease-in-out infinite opacity and drop-shadow pulse on decorative elements. Mimics flickering lantern light.
- **Scroll Reveal** — Elements fade in (`opacity: 0 → 1`) and slide up (`translateY(30px → 0)`) over 1s with `cubic-bezier(0.22, 1, 0.36, 1)` easing. Staggered delays (0.2s, 0.4s, 0.6s) for hero elements.
- **Button Hover** — `0.3s cubic-bezier(0.4, 0, 0.2, 1)` with `scale(1.03)` transform.

### Accessibility
- **Prefers-reduced-motion** — All animations disable when the user prefers reduced motion.

## 7. Design System Notes for Stitch Generation

### Language to Use
- Describe the design as "editorial," "airy," "warm," and "organic."
- Reference Hoi An's visual identity: ochre walls, river mint, lantern orange.
- Emphasize "generous whitespace" and "asymmetric layouts."
- Use "glassmorphism" for navigation and overlays.

### Color References
- Primary: Sunlit Ochre `#f4d03f` (yellow-gold)
- Secondary: Tropical Mint `#76d7c4` (teal-green)
- Tertiary: Spice Orange `#f39c12` (warm amber)
- Surface: Warm Cream `#fff8ef`
- Text: Deep Brown `#1e1b12`

### Component Prompts
1. **Hero Section** — "Full-screen hero with slow-zooming background image, centered serif headline in white, glassmorphism search overlay with category pills and search input, two CTA buttons (ochre and mint)."
2. **Navigation** — "Floating glass navigation bar with backdrop blur, serif logo in spice orange, horizontal link menu with ochre active state, rounded search input, and ochre 'Plan a Trip' CTA button."
3. **Content Cards** — "White cards with 16px rounded corners, subtle shadow, full-bleed image with 12px inner radius, title in Noto Serif, metadata in Manrope label style. Hover lifts card with softer shadow."
4. **Footer** — "Large rounded-top container (40px radius) in warm cream, multi-column grid with serif brand name, tag cloud of rounded pills, social icon circles, and app store badges."

### Incremental Iteration
- Start with the color palette and typography to establish the mood.
- Add glassmorphism navigation as the first component.
- Build the hero section to anchor the visual identity.
- Iterate on card designs to ensure consistent elevation and shadow language.
- Finally, refine spacing and whitespace across all sections.

## 8. Do's and Don'ts

### Do:
- Use generous white space — let the warm colors breathe.
- Let one accent color dominate per section.
- Pair bold color with elegant serif typography.
- Use high-quality photography with warm, golden tones.
- Apply glassmorphism subtly for modern polish.
- Use asymmetric layouts to break rigid grids.

### Don't:
- Use all three accent colors at full strength in one small space.
- Add heavy borders or dividers — use tonal layering instead.
- Use generic stock photos — prioritize authentic Hoi An imagery.
- Make it feel like a template — embrace editorial asymmetry.
- Use pure black (`#000000`) — always use the warm `#1e1b12`.
