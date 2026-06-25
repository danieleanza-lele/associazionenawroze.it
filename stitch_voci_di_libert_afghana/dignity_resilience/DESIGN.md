---
name: Dignity & Resilience
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e7bdb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ad8882'
  outline-variant: '#5d3f3b'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#bd0000'
  on-primary-container: '#ffc9c1'
  inverse-primary: '#c00402'
  secondary: '#d7c3b0'
  on-secondary: '#3a2e21'
  secondary-container: '#544738'
  on-secondary-container: '#c8b5a3'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#5b5d5d'
  on-tertiary-container: '#d5d6d6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930000'
  secondary-fixed: '#f4dfcb'
  secondary-fixed-dim: '#d7c3b0'
  on-secondary-fixed: '#241a0e'
  on-secondary-fixed-variant: '#524436'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The brand personality is rooted in **urgent dignity**. It seeks to honor the strength of Afghan women while sounding a clarion call for human rights. The target audience includes global policy-makers, activists, and the general public.

The design style is **High-Contrast Modernism**. It leverages purposeful whitespace to provide "breathing room" for heavy subject matter, ensuring the message is never cluttered. The aesthetic is raw and editorial, avoiding decorative flourishes in favor of stark, impactful layouts that evoke an emotional and authoritative response.

## Colors
The palette is built on extreme contrast to mirror the gravity of the cause. 
- **Deep Charcoal (#121212):** The primary canvas, providing a serious, cinematic backdrop.
- **Crisp White (#FFFFFF):** Used for maximum legibility and "truth" in messaging.
- **Deep Blood Red (#BD0000):** Reserved exclusively for urgency, calls to action, and highlighting critical data or human rights violations.
- **Warm Sand (#D9C5B2):** Introduces a human element, used for background sections or secondary elements to soften the technical starkness.
- **Warm Gray (#2A2A2A):** Utilized for UI depth, such as input fields and card backgrounds.

## Typography
The typography system balances classical authority with modern accessibility. 
- **Headlines:** *Libre Caslon Text* provides a literary, historical, and dignified weight. It should be used for large emotional statements and section headers.
- **Body & Interface:** *Atkinson Hyperlegible Next* is selected for its mission-critical clarity. It ensures that complex information regarding human rights is readable by all, including those with visual impairments.
- **Styling:** Use `label-caps` for eyebrows and small metadata to maintain an organized, editorial feel.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain an editorial, magazine-like structure. 
- **Grid:** A 12-column grid with generous 24px gutters. 
- **Whitespace:** Use aggressive vertical spacing (`section-gap`) to separate distinct narratives or data points, allowing the user to process the weight of the information.
- **Responsive Behavior:** On mobile, margins shrink to 20px, and the 12-column grid collapses to a single column. Information density should remain low to preserve the sense of "dignity."

## Elevation & Depth
This design system avoids traditional shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.
- **Surface Strategy:** Depth is created by placing `warm-gray` containers on top of the `deep-charcoal` base.
- **Borders:** Use subtle 1px borders in `warm-gray` (or low-opacity white) to define structural boundaries without adding visual clutter.
- **Focus:** No blur or glassmorphism is used, as the brand requires a grounded, "uncensored" feel. Visual hierarchy is achieved through scale and color contrast (Red vs. Charcoal) rather than simulated light sources.

## Shapes
The shape language is **Sharp (0)**. 
- All buttons, cards, and input fields feature 90-degree corners. 
- This lack of roundedness communicates a sense of structural integrity, seriousness, and non-negotiable facts. 
- Images should be cropped in strict rectangular or square ratios to maintain the architectural feel of the layout.

## Components
- **Buttons:** Primary CTAs are solid `Deep Blood Red` with `White` text. Secondary buttons are `Transparent` with a `White` 2px border. Use large padding (16px 32px) and sharp corners.
- **Impact Cards:** Backgrounds in `Warm Gray`. Use `Libre Caslon Text` for the title and a large `Deep Blood Red` accent line at the top to indicate importance.
- **Clean Forms:** Inputs use `Warm Gray` backgrounds with `White` bottom-only borders for a minimalist, "signature" feel. Error states use the `Deep Blood Red`.
- **Chips/Tags:** Use `Warm Sand` background with `Deep Charcoal` text to categorize stories or regions, providing a soft human contrast against the dark UI.
- **Data Visualizations:** Use `Deep Blood Red` for the most critical data points, contrasted against `Warm Gray` or `White` for baseline data.
- **Prominent CTAs:** Full-width sections with `Warm Sand` backgrounds and `Deep Charcoal` typography to create an "interruptive" moment of humanity and action.