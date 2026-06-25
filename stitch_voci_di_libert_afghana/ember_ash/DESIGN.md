---
name: Ember & Ash
colors:
  surface: '#fdf8f6'
  surface-dim: '#ddd9d7'
  surface-bright: '#fdf8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f0'
  surface-container: '#f2edeb'
  surface-container-high: '#ece7e5'
  surface-container-highest: '#e6e2df'
  on-surface: '#1c1b1a'
  on-surface-variant: '#58413f'
  inverse-surface: '#31302f'
  inverse-on-surface: '#f4f0ee'
  outline: '#8c716e'
  outline-variant: '#e0bfbc'
  surface-tint: '#ac322e'
  primary: '#690008'
  on-primary: '#ffffff'
  primary-container: '#8b1a1a'
  on-primary-container: '#ff9a91'
  inverse-primary: '#ffb3ac'
  secondary: '#645e4f'
  on-secondary: '#ffffff'
  secondary-container: '#e8dfcc'
  on-secondary-container: '#696253'
  tertiary: '#373021'
  on-tertiary: '#ffffff'
  tertiary-container: '#4e4636'
  on-tertiary-container: '#bfb4a0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#8a1a1a'
  secondary-fixed: '#ebe1cf'
  secondary-fixed-dim: '#cfc6b3'
  on-secondary-fixed: '#1f1b10'
  on-secondary-fixed-variant: '#4c4638'
  tertiary-fixed: '#eee1cb'
  tertiary-fixed-dim: '#d1c5b0'
  on-tertiary-fixed: '#211b0e'
  on-tertiary-fixed-variant: '#4e4636'
  background: '#fdf8f6'
  on-background: '#1c1b1a'
  surface-variant: '#e6e2df'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 80px
  content-max-width: 680px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
This design system balances the weight of editorial authority with a warmth that suggests resilience and hope. It is designed for long-form narratives, investigative journalism, or cultural platforms where the gravity of the subject matter requires a sophisticated, "lived-in" aesthetic.

The style is **Modern Editorial with Tactile Warmth**. It avoids the sterility of pure digital interfaces by utilizing organic, paper-inspired tones. The atmosphere is contemplative and serious but intentionally avoids being oppressive by introducing a light-flooded "sand" palette that provides breathing room for the reader. The visual language uses high-contrast typography and intentional whitespace to create a rhythm that feels like a physical broadsheet.

## Colors
The palette shifts from a heavy dark mode to a balanced, parchment-inspired light mode. 

- **Primary (Deep Red):** Used strictly for high-emphasis actions, branding, and urgent pull-quotes. It represents the "struggle" and intensity.
- **Surface Bright (Warm Beige):** The default background for reading. It reduces eye strain compared to pure white and provides a sophisticated, organic feel.
- **Surface Container (Sand):** Used for UI secondary layers, sidebars, and navigation headers to create structural depth without using heavy borders.
- **Neutral (Charcoal):** Reserved for body text and primary icons to ensure maximum legibility against the sand tones.

## Typography
Typography is the core of this design system. We use a "Serif-on-Serif" pairing to maximize editorial authority.

- **Libre Caslon Text** is used for all headlines and display elements. Its high-contrast strokes and traditional serifs command attention and respect.
- **Source Serif 4** is utilized for body copy. It is optimized for screen readability while maintaining the classic character of the system.
- **Hanken Grotesk** serves as a functional utility font for labels, buttons, and navigation, providing a sharp, modern counterpoint to the traditional serifs.

Use tight tracking for large headlines and generous line-height (1.6x) for body text to ensure a comfortable reading experience.

## Layout & Spacing
The layout follows a **Fixed-Column Narrative** model. While the outer containers are fluid, the core reading experience is restricted to a 680px central column to prevent line lengths from becoming unreadable.

- **Desktop:** A 12-column grid with wide outer margins to focus the eye.
- **Mobile:** A single column with 16px margins.
- **Vertical Rhythm:** Use large gaps (80px+) between major sections to allow the warm sand background to act as visual "silence," giving the content room to breathe.

## Elevation & Depth
This design system rejects heavy shadows in favor of **Tonal Layering** and **Subtle Outlines**.

- **Layers:** Depth is created by placing `surface-bright` cards on `surface-container` backgrounds.
- **Outlines:** Use 0.5px or 1px strokes in a slightly darker shade of the background color (e.g., a dark sand border on a light sand surface) to define boundaries without adding visual clutter.
- **Interaction:** On hover, elements may transition to a slightly lighter tint or gain a very soft, ambient "paper shadow" (low opacity, large blur) to suggest tactility.

## Shapes
The shape language is **Soft and Structural**. 

We use a subtle `0.25rem` (4px) radius for most UI components (buttons, input fields, cards). This "Soft" setting removes the harshness of the "Struggle" (sharp corners) without making the interface feel overly playful or "bubbly." Larger containers and hero images should remain sharp (0px) to maintain a sense of formal editorial structure.

## Components
- **Buttons:** Primary buttons use the Deep Red background with White text. Secondary buttons are outlined in Charcoal with no fill. Always use Hanken Grotesk for button labels in all-caps.
- **Cards:** Use a flat style with a subtle `surface-container` fill. Avoid heavy shadows; use a 1px border that is 10% darker than the card fill.
- **Inputs:** Clean, bottom-border only or very light four-sided borders. When focused, the border transitions to Deep Red.
- **Chips/Tags:** Small, pill-shaped elements with a sand-toned background and Charcoal text. Used for categories and metadata.
- **Lists:** Separated by thin, 1px sand-colored dividers. Bullet points in the Primary Deep Red to draw the eye to key information.
- **Pull-quotes:** Large Libre Caslon Text, centered, with a Primary Deep Red vertical accent bar on the left.