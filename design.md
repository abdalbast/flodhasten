# Flodhästen redesign design system inspired by Vocabulary

## Visual identity

### Core vibe
A calm editorial learning tool that feels like a printed notebook mixed with a modern iOS utility. Warm paper surfaces, soft shadows, generous white space, and confident typography. The interface should feel premium, quiet, and collectible.

### Keywords
Warm, minimal, editorial, tactile, airy, calm, crafted, modern classic.

### Design principles
1. Content first. One primary message per screen.
2. Soft structure. Use cards and rounded containers instead of hard dividers.
3. Touch friendly targets. Large tap areas and forgiving spacing.
4. Subtle delight. Micro animations and gentle shadows, never loud gradients.
5. Consistent rhythm. Reuse the same padding, corner radii, and type scale everywhere.
6. Calm colour. Use accent colour sparingly as a cue, not decoration.

## Layout and spacing

### Grid and safe areas
* Mobile first with a single column layout.
* Respect iOS safe areas and keep primary actions above the home indicator.
* Prefer centred content blocks for key learning moments such as the word card.

### Spacing scale
Use an eight point system, then add a few signature sizes for this style.
1. 4 for hairline gaps and icon to label spacing
2. 8 for tight clusters inside cards
3. 12 for standard spacing between elements
4. 16 for card padding and section spacing
5. 24 for major section breaks
6. 32 for hero breathing room and modal top spacing
7. 40 for onboarding hero layouts

### Corner radius
* Small elements such as chips and badges: 10 to 12
* Cards and list containers: 16 to 20
* Primary buttons and large inputs: 18 to 24
* Bottom sheets and full width panels: 24 to 28

### Elevation and shadow language
Shadows are soft and slightly warm, like paper lifted from a desk.
* Low elevation for cards: subtle blur, low opacity, short offset
* Medium elevation for floating buttons and bottom navigation: a touch stronger
* High elevation for modals and sheets: layered shadow plus slight background dim

Avoid harsh drop shadows or neon glows.

## Colour system

### Palette
These are the core colours observed in the reference screens. Treat them as starting tokens and adjust slightly for accessibility.

* Paper background: #F0EBE1
* Surface white: #FFFFFF
* Ink primary: #1A1A1A
* Ink secondary: #5A5A5A
* Ink muted: #8B8B8B
* Border subtle: #E7E1D8
* Border strong: #CFC7BC

Accent colours
* Teal accent: #93BFBE
* Coral accent: #ED9382

Status colours
* Success: deep green with soft fill for selected states
* Danger: deep red with soft fill for incorrect states
* Warning: warm amber for attention

### Usage rules
1. Default background is paper. Use white surfaces for cards, sheets, and grouped lists.
2. Teal is the primary brand accent for actions, icons, and highlights.
3. Coral is used for illustration moments, playful highlights, and occasional emphasis.
4. Borders are preferred over heavy dividers. Use subtle borders on paper.
5. Filled colour backgrounds should be rare and soft, never saturated.

### Gradients
If used, keep them extremely subtle and blurred, mostly as background ambience in onboarding. Never use gradients behind body text.

## Typography

### Typeface pairing
Use a two font system with clear roles.
1. Editorial serif for words, titles, and key learning content.
2. Clean sans for UI labels, buttons, navigation, and helper text.

Practical options
* Serif: New York, Georgia, or a modern book serif
* Sans: SF Pro, Inter, or another neutral grotesk

### Type scale
All sizes are in iOS points.
* Display word: 40 to 48, serif, tight line height
* Screen title: 24 to 28, serif
* Section title: 18 to 20, sans or serif depending on hierarchy
* Body: 16 to 17, sans
* Caption: 13 to 14, sans
* Micro label: 11 to 12, sans, used sparingly

### Weight and colour
* Headlines use regular or medium, not heavy bold
* Body uses regular
* Secondary uses reduced opacity or secondary ink colour

### Text style rules
1. Prefer sentence case.
2. Keep copy concise, calm, and friendly.
3. Avoid long paragraphs inside cards. Break into short lines.

## Iconography and illustration

### Icons
* Use simple rounded line icons with medium stroke weight.
* Icons often sit inside circular or rounded square containers with a soft background.
* Default icon colour is teal or ink secondary.

### Illustrations
* Flat, playful, slightly retro shapes.
* Colours align with teal, coral, and warm neutrals.
* Keep illustration density low so screens remain airy.

## Core components

### App background
* Paper colour background across most screens.
* Optional faint texture, extremely subtle, no visible noise pattern.

### Top navigation bar
* Minimal iOS style header.
* Title centred or left aligned depending on screen importance.
* Light background, no heavy blur.
* Trailing actions as simple text buttons or icon buttons.

States
1. Default
2. With search field
3. With segmented control under the title

### Bottom navigation
A floating pill dock rather than a full height tab bar.
* Rounded container with white surface and soft shadow.
* Icons only or icon plus small label.
* Active state uses teal and slightly stronger weight.

Spacing
* Keep dock padding generous so it feels like an object.

### Primary word card
The hero learning surface.
* White rounded card centred on paper background.
* Large serif word at top.
* Supporting definition and meta content below in smaller sizes.
* Action row with icon buttons such as save, audio, share, info.

Card rules
1. One hero card per screen whenever possible.
2. Keep internal padding at 16 to 20.
3. Use subtle border or shadow, not both heavily.

### Buttons

Primary button
* Full width pill button.
* Teal fill with white label.
* Soft shadow for lift.
* Height around 52 to 56.

Secondary button
* White or paper background with border.
* Ink label.
* Same height and radius as primary.

Tertiary button
* Text only, used in nav bars and inline actions.

Icon button
* Circular or rounded square.
* White surface with subtle border or shadow.
* Teal icon for primary actions.

Disabled
* Reduced opacity, no shadow, muted text.

Pressed
* Slight scale down and shadow reduction.

### List rows
Used for settings, collections, and pickers.
* Grouped inside a white rounded container.
* Row has icon on left, title, optional subtitle, chevron or toggle on right.
* Dividers are very subtle and do not reach full width.

Row sizes
* Standard: 56 to 60 height
* Compact: 48 to 52 height

### Chips and segmented controls
Two styles are used.
1. iOS segmented control for short mode toggles.
2. Custom pill chips for categories and filters.

Chip rules
* White surface on paper with border
* Selected uses teal tint and teal text
* Padding around 10 vertical and 14 horizontal

### Inputs

Text field
* Rounded rectangle, light grey fill on white surfaces or white fill on paper.
* Clear label above, helper text below.
* Height around 52.

Search field
* Rounded pill, icon on left, placeholder in muted ink.
* Clear button appears when typing.

Dropdown and picker
* Use bottom sheet selection lists with large tap targets.

### Toggles and switches
* Use native iOS switch styling where possible.
* If custom, keep thumb round and track soft.

### Progress and streak indicators
* Thin progress bar with rounded ends.
* Background track in subtle border colour.
* Fill in teal.
* Streak badge as a small pill with icon and number.

### Quiz components

Question header
* Title in serif or large sans.
* Progress indicator under header.

Answer options
* Large rounded pills stacked vertically.
* Default: white surface, border.
* Selected: teal tint.
* Correct: success tint and icon.
* Incorrect: danger tint and icon.

Feedback sheet
* Bottom sheet that slides up with result, short explanation, and next button.

Results list
* Stacked cards with per item status icon, short explanation, and a subtle divider between items.

### Toasts and snackbars
* Top aligned floating toast with rounded corners.
* White surface, soft shadow, short message.
* Optional leading icon in teal.

### Modals and bottom sheets
* Sheet background is white.
* Top grab handle is subtle.
* Title uses serif, actions use pill buttons.
* Background dim is light, keep context visible.

### Cards
General purpose card used across the system.
* White surface on paper background.
* Radius 16 to 20.
* Shadow low, border optional.
* Internal padding 16.

### Badges
* Small pill badges for status and tags.
* Soft tinted background and matching text.
* Use for premium, new, streak, correct, incorrect.

### Dividers
Prefer spacing. When needed, use hairline divider with low contrast.

### Empty states
* Small illustration or icon.
* One sentence explanation.
* One primary call to action.
Keep it minimal.

### Paywall and upsell surfaces
If used, keep it calm and consistent.
* White card with feature list as rows.
* One primary plan highlighted with teal border or subtle teal tint.
* CTA is primary teal pill button.
* Legal text in small caption.

## Motion and interaction

### Transitions
* Screen transitions feel native iOS.
* Sheets slide from bottom.
* Modals fade and scale subtly.

### Micro interactions
1. Button press: scale down slightly then return.
2. Selection: quick colour tint transition.
3. Toast: slide down and fade.
4. Card hover in web: gentle lift, optional.

Timing
* Fast: 120 to 160 ms
* Standard: 180 to 240 ms
* Slow: 280 to 360 ms for onboarding ambience

Easing
Use ease out for entrances and ease in for exits.

## Content and copy guidelines

### Voice
Warm, confident, concise. More like a well edited book than a chatty app.

### Formatting
* Prefer short sentences.
* Use line breaks for rhythm.
* Avoid excessive punctuation.

### Vocabulary content layout
For each word entry, keep a consistent structure.
1. Word
2. Pronunciation and part of speech
3. Short definition
4. Example sentence
5. Origin or note

## Accessibility

1. Ensure text contrast on paper meets WCAG for body text.
2. Minimum tap target 44 by 44.
3. Support Dynamic Type. Allow word card to grow vertically.
4. Provide clear focus states for web and keyboard support if applicable.
5. Do not rely on colour alone for quiz correctness. Use icons and labels.

## Implementation notes for Cursor context

1. Treat paper background as the default app theme.
2. Create design tokens for colour, radius, spacing, shadow, and type styles.
3. Build components as primitives first: Button, Card, ListRow, Sheet, Chip, Input, Toast.
4. Compose screens from primitives with consistent padding.
5. Keep the system calm. If a new component feels loud, simplify it.

