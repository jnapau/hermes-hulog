---
name: Hulog
description: Hermes Academy's daily money companion
colors:
  cream: "#FFF8EC"
  honey: "#F5A524"
  cocoa: "#4A2A12"
  ink: "#211F1C"
  muted: "#6E6963"
  hermes-blue: "#1B50D8"
  deep-amber: "#9B4B08"
typography:
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
rounded:
  field: "8px"
  dialog: "16px"
spacing:
  small: "8px"
  medium: "16px"
  large: "24px"
components:
  primary-button:
    backgroundColor: "{colors.honey}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.dialog}"
---

# Hulog design system

## Overview

Preserve the existing Hermes/Hestia identity: official flame-companion artwork, a bamboo coin bank, cream surfaces, honey actions, cocoa text, and a wooden collection cabinet. This records the interface extension; it does not replace the original brand.

## Colors

Cream is the main player surface. Honey carries the primary daily-drop action; cocoa provides legible text on that action. Hermes blue identifies the ecosystem brand. Deep amber is the darker text accent; bright flame orange is not suitable for small text on cream.

## Typography

Use bundled Plus Jakarta Sans regular, semibold and bold assets. Player controls mostly use 12–14px; admin forms use 14px. Headings use 20–30px with balanced wrapping. Numeric stats use tabular numerals.

## Layout

The daily-drop home is a compact centered column, maximum 448px. Collection expands to 672px; administration expands to 1152px. Mobile navigation appears below 640px. Forms stack on phones, tables scroll horizontally, and collection shelf controls scroll horizontally.

## Elevation & Depth

The bank and cabinet retain the brief's wooden and brass treatment. Native dialogs place focused tasks above a dark backdrop, with bounded viewport scrolling. Existing warm surface shadows remain inherited.

## Shapes

Inputs use 8px corners; dialogs use 16px. Existing player containers and collection shelves retain their incumbent rounded shapes.

## Components

Auth and collection detail dialogs use native modal behavior for focus containment and Escape dismissal. Inputs have visible labels. Focus uses a three-pixel amber outline with a three-pixel offset. Selected mobile navigation uses cocoa text on honey tint. Cloud errors offer Retry and Dismiss and sit above mobile navigation. Reduced-motion preferences suppress decorative animation.

Hestia uses the official local WebP poses; modular SVG clothing and mythology overlays attach to the same mascot component. Coin animation and synthesized audio accompany correct answers. No remote audio URLs are needed.

## Do's and Don'ts

Keep general navigation and controls in English. Preserve Filipino learning material and cultural names. Show account progress only after server confirmation. Never display demo credentials, unlock-all controls, or admin navigation to regular players.

Inherited emoji collection illustrations and compact decorative labels are not new system rules. Authenticated gameplay/admin screens still need live verification when project access is available.
