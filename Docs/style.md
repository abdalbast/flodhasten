# Flodhästen - Design System & Style Guide

## Overview
This document serves as the complete design system reference for Flodhästen, the Swedish learning application. It defines all visual elements, components, patterns, and guidelines needed to maintain consistency and replicate the design across the entire application.

## Design Philosophy

### Swedish-Inspired Aesthetic
- **Clean and minimal** design reflecting Scandinavian design principles
- **Swedish flag colours** as the primary colour palette (blue and yellow)
- **Natural gradients** inspired by Swedish landscapes
- **Elegant shadows** that provide depth without overwhelming
- **Smooth animations** that enhance user experience

### Accessibility First
- **High contrast ratios** meeting WCAG AA standards
- **Dark mode support** with proper colour adaptations
- **Keyboard navigation** support throughout
- **Screen reader compatibility** with semantic HTML

## Colour System

### Primary Palette

#### Light Theme
```css
/* Swedish Blue - Primary */
--primary: 213 100% 40%;           /* hsl(213, 100%, 40%) - #0066CC */
--primary-foreground: 0 0% 100%;   /* White text on primary */
--primary-glow: 213 100% 50%;      /* Brighter blue for glows */

/* Swedish Yellow - Secondary */
--secondary: 48 100% 50%;          /* hsl(48, 100%, 50%) - #FFCC00 */
--secondary-foreground: 220 15% 20%; /* Dark text on yellow */

/* Success Green */
--success: 142 76% 36%;            /* hsl(142, 76%, 36%) - #16A34A */
--success-foreground: 0 0% 100%;   /* White text on green */

/* Destructive Red */
--destructive: 0 84% 60%;          /* hsl(0, 84%, 60%) - #EF4444 */
--destructive-foreground: 0 0% 100%; /* White text on red */
```

#### Dark Theme
```css
/* Adjusted for dark mode */
--primary: 213 100% 50%;           /* Brighter blue for dark backgrounds */
--primary-glow: 213 100% 60%;      /* Even brighter glow */
--secondary: 48 100% 50%;          /* Same yellow works in dark */
--success: 142 76% 40%;            /* Slightly brighter green */
--destructive: 0 62% 50%;          /* Adjusted red for dark mode */
```

### Neutral Palette

#### Light Theme
```css
--background: 0 0% 100%;           /* Pure white */
--foreground: 220 15% 20%;         /* Dark grey text */
--card: 0 0% 100%;                 /* White cards */
--card-foreground: 220 15% 20%;    /* Dark text on cards */
--muted: 210 20% 96%;              /* Very light grey */
--muted-foreground: 220 15% 50%;   /* Medium grey text */
--border: 210 20% 90%;             /* Light grey borders */
--input: 210 20% 96%;              /* Light input backgrounds */
```

#### Dark Theme
```css
--background: 220 20% 8%;          /* Very dark blue-grey */
--foreground: 0 0% 95%;            /* Light text */
--card: 220 20% 10%;               /* Dark card backgrounds */
--card-foreground: 0 0% 95%;       /* Light text on cards */
--muted: 220 20% 15%;              /* Dark muted backgrounds */
--muted-foreground: 220 15% 65%;   /* Medium light text */
--border: 220 20% 20%;             /* Dark borders */
--input: 220 20% 15%;              /* Dark input backgrounds */
```

### Colour Usage Guidelines

#### Primary Blue (`--primary`)
- **Use for**: Main CTAs, navigation highlights, progress bars, links
- **Don't use for**: Large background areas, body text
- **Accessibility**: Always use with white foreground text

#### Secondary Yellow (`--secondary`)
- **Use for**: Accent elements, badges, highlights, secondary CTAs
- **Don't use for**: Primary navigation, body text
- **Accessibility**: Always use with dark foreground text

#### Success Green (`--success`)
- **Use for**: Achievement badges, success states, completed progress
- **Don't use for**: Warning or error states
- **Accessibility**: Always use with white foreground text

#### Destructive Red (`--destructive`)
- **Use for**: Error states, delete actions, warning badges
- **Don't use for**: Success states, primary actions
- **Accessibility**: Always use with white foreground text

## Typography

### Font System
The application uses the system font stack for optimal performance and native feel:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Typography Scale

#### Headings
```css
/* H1 - Main page titles */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }     /* 36px */
.text-6xl { font-size: 3.75rem; line-height: 1; }          /* 60px - Hero titles */

/* H2 - Section titles */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }   /* 30px */

/* H3 - Subsection titles */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }        /* 24px */

/* H4 - Card titles */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }     /* 20px */

/* H5 - Small titles */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }    /* 18px */
```

#### Body Text
```css
/* Regular body text */
.text-base { font-size: 1rem; line-height: 1.5rem; }       /* 16px */

/* Small text */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }    /* 14px */

/* Extra small text */
.text-xs { font-size: 0.75rem; line-height: 1rem; }        /* 12px */
```

#### Font Weights
```css
.font-normal { font-weight: 400; }      /* Regular text */
.font-medium { font-weight: 500; }      /* Slightly bold */
.font-semibold { font-weight: 600; }    /* Card titles, buttons */
.font-bold { font-weight: 700; }        /* Main headings */
```

### Typography Usage Guidelines

#### Headings Hierarchy
1. **H1 (text-4xl/text-6xl + font-bold)**: Page titles, hero headlines
2. **H2 (text-3xl + font-bold)**: Main section titles
3. **H3 (text-2xl + font-semibold)**: Subsection titles
4. **H4 (text-xl + font-semibold)**: Card titles
5. **H5 (text-lg + font-semibold)**: Component titles

#### Body Text Guidelines
- **Regular body**: `text-base font-normal text-foreground`
- **Secondary text**: `text-sm text-muted-foreground`
- **Metadata**: `text-xs text-muted-foreground`
- **Emphasis**: `font-medium` or `font-semibold`

## Gradient System

### Primary Gradients
```css
/* Primary Blue Gradient */
--gradient-primary: linear-gradient(135deg, hsl(213 100% 40%), hsl(213 100% 50%));

/* Secondary Yellow Gradient */
--gradient-secondary: linear-gradient(135deg, hsl(48 100% 50%), hsl(48 100% 60%));

/* Hero Multi-colour Gradient */
--gradient-hero: linear-gradient(135deg, hsl(213 100% 40%) 0%, hsl(213 100% 50%) 50%, hsl(48 100% 50%) 100%);

/* Card Background Gradient */
--gradient-card: linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(210 20% 98%) 100%);
```

### Gradient Usage
- **bg-gradient-primary**: Buttons, icons, accent elements
- **bg-gradient-secondary**: Secondary buttons, badges
- **bg-gradient-hero**: Hero CTAs, special buttons
- **bg-gradient-card**: Card backgrounds, subtle elevation

### Dark Mode Adaptations
```css
/* Dark theme gradients */
--gradient-primary: linear-gradient(135deg, hsl(213 100% 50%), hsl(213 100% 60%));
--gradient-secondary: linear-gradient(135deg, hsl(48 100% 50%), hsl(48 100% 60%));
--gradient-hero: linear-gradient(135deg, hsl(213 100% 50%) 0%, hsl(213 100% 60%) 50%, hsl(48 100% 50%) 100%);
--gradient-card: linear-gradient(135deg, hsl(220 20% 10%) 0%, hsl(220 20% 12%) 100%);
```

## Shadow System

### Shadow Definitions
```css
/* Elegant shadow for cards and buttons */
--shadow-elegant: 0 10px 30px -10px hsl(213 100% 40% / 0.2);

/* Glow effect for interactive elements */
--shadow-glow: 0 0 40px hsl(213 100% 50% / 0.3);

/* Card shadow for subtle elevation */
--shadow-card: 0 4px 20px -4px hsl(213 100% 40% / 0.15);
```

### Shadow Usage
- **shadow-elegant**: Primary buttons, important cards
- **shadow-glow**: Hover states, focus states, hero elements
- **shadow-card**: Regular cards, form elements
- **shadow-sm**: Minimal elevation (built-in Tailwind)

### Dark Mode Shadow Adjustments
```css
/* Stronger shadows for dark mode */
--shadow-elegant: 0 10px 30px -10px hsl(213 100% 50% / 0.3);
--shadow-glow: 0 0 40px hsl(213 100% 60% / 0.4);
--shadow-card: 0 4px 20px -4px hsl(213 100% 50% / 0.25);
```

## Animation System

### Transition Definitions
```css
/* Smooth transitions for most interactions */
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Bouncy transitions for playful elements */
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Usage
- **transition-smooth**: Default for hover states, colour changes
- **transition-bounce**: Buttons, game elements, achievement unlocks
- **Duration**: 0.2s for quick feedback, 0.3s for standard, 0.4s for emphasis

### Keyframe Animations
```css
/* Accordion animations */
@keyframes accordion-down {
  from { height: 0 }
  to { height: var(--radix-accordion-content-height) }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height) }
  to { height: 0 }
}
```

## Spacing System

### Container Spacing
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### Section Spacing
- **py-16**: Main section vertical padding (4rem = 64px)
- **py-12**: Secondary section padding (3rem = 48px)
- **py-8**: Component group padding (2rem = 32px)

### Component Spacing
- **space-x-2**: Small horizontal spacing (0.5rem = 8px)
- **space-x-4**: Medium horizontal spacing (1rem = 16px)
- **space-y-4**: Medium vertical spacing (1rem = 16px)
- **space-y-6**: Large vertical spacing (1.5rem = 24px)

### Padding Standards
- **p-4**: Card content padding (1rem = 16px)
- **p-6**: Card header/footer padding (1.5rem = 24px)
- **px-4**: Button horizontal padding (1rem = 16px)
- **py-2**: Button vertical padding (0.5rem = 8px)

## Border Radius System

### Radius Scale
```css
--radius: 0.5rem; /* 8px - Base radius */

/* Calculated radii */
.rounded-sm { border-radius: calc(var(--radius) - 4px); } /* 4px */
.rounded-md { border-radius: calc(var(--radius) - 2px); } /* 6px */
.rounded-lg { border-radius: var(--radius); }             /* 8px */
.rounded-xl { border-radius: calc(var(--radius) + 4px); } /* 12px */
.rounded-2xl { border-radius: calc(var(--radius) + 8px); } /* 16px */
.rounded-3xl { border-radius: calc(var(--radius) + 16px); } /* 24px */
```

### Radius Usage Guidelines
- **rounded-lg**: Default for cards, buttons, inputs
- **rounded-md**: Small components, badges
- **rounded-xl**: Large cards, modals
- **rounded-2xl**: Hero elements, feature cards
- **rounded-3xl**: Special elements, mascot images
- **rounded-full**: Circular elements, avatars, badges

## Component System

### Button Variants

#### Primary Button (`default`)
```tsx
<Button variant="default">
  // Styles: bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant
</Button>
```

#### Hero Button (`hero`)
```tsx
<Button variant="hero" size="lg">
  // Styles: bg-gradient-hero text-primary-foreground hover:shadow-glow transform hover:scale-105 transition-bounce font-semibold
</Button>
```

#### Game Button (`game`)
```tsx
<Button variant="game">
  // Styles: bg-gradient-primary text-primary-foreground hover:bg-primary-glow shadow-card transform hover:scale-102 transition-bounce
</Button>
```

#### Ghost Button (`ghost`)
```tsx
<Button variant="ghost">
  // Styles: hover:bg-accent hover:text-accent-foreground
</Button>
```

#### Outline Button (`outline`)
```tsx
<Button variant="outline">
  // Styles: border border-input bg-background hover:bg-accent hover:text-accent-foreground
</Button>
```

#### Secondary Button (`secondary`)
```tsx
<Button variant="secondary">
  // Styles: bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-card
</Button>
```

#### Achievement Button (`achievement`)
```tsx
<Button variant="achievement">
  // Styles: bg-success text-success-foreground hover:bg-success/90 shadow-elegant
</Button>
```

### Button Sizes
```tsx
// Small button
<Button size="sm">     // h-9 rounded-md px-3

// Default button
<Button size="default"> // h-10 px-4 py-2

// Large button
<Button size="lg">      // h-11 rounded-md px-8

// Icon button
<Button size="icon">    // h-10 w-10
```

### Card Components

#### Basic Card Structure
```tsx
<Card className="bg-gradient-card border-border/50 shadow-card">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

#### Interactive Card
```tsx
<Card className="group hover:shadow-elegant transition-smooth cursor-pointer bg-gradient-card border-border/50">
  // Group hover effects for child elements
</Card>
```

### Badge Components

#### Default Badge
```tsx
<Badge variant="default">
  // Styles: border-transparent bg-primary text-primary-foreground hover:bg-primary/80
</Badge>
```

#### Difficulty Badges
```tsx
// Easy/Beginner
<Badge className="bg-success/10 text-success border-success/20">Easy</Badge>

// Intermediate/Medium
<Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">Medium</Badge>

// Hard/Advanced
<Badge className="bg-destructive/10 text-destructive border-destructive/20">Hard</Badge>
```

#### Rarity Badges
```tsx
// Common
<Badge className="bg-muted text-muted-foreground border-muted">Common</Badge>

// Rare
<Badge className="bg-primary/10 text-primary border-primary/20">Rare</Badge>

// Epic
<Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">Epic</Badge>

// Legendary
<Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">Legendary</Badge>
```

### Progress Components

#### Standard Progress Bar
```tsx
<Progress value={75} className="h-2" />
// Background: bg-secondary, Fill: bg-primary
```

#### Custom Progress with Label
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">Progress</span>
    <span className="text-foreground font-medium">75%</span>
  </div>
  <Progress value={75} className="h-2" />
</div>
```

### Navigation Components

#### Main Navigation Structure
```tsx
<nav className="border-b border-border bg-gradient-card shadow-card">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-elegant">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">App Name</h1>
          <p className="text-xs text-muted-foreground">Tagline</p>
        </div>
      </div>
      
      {/* Navigation tabs - ONE ROW MAXIMUM */}
      <div className="hidden md:flex space-x-1">
        <Button variant="ghost" size="sm">Tab 1</Button>
        <Button variant="ghost" size="sm">Tab 2</Button>
        {/* Additional tabs go in dropdown */}
      </div>
      
      {/* Right side actions */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">Action</Button>
      </div>
    </div>
  </div>
</nav>
```

#### Dropdown Menu Structure
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <Icon className="w-4 h-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-popover/95 backdrop-blur-sm border border-border shadow-elegant">
    <DropdownMenuItem className="flex items-center space-x-2">
      <Icon className="w-4 h-4" />
      <span>Menu Item</span>
    </DropdownMenuItem>
    {/* Separator for sections */}
    <DropdownMenuItem className="flex items-center space-x-2 border-t border-border mt-2 pt-2">
      <Icon className="w-4 h-4" />
      <span>Section Item</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Layout Patterns

### Container Patterns
```tsx
// Main container
<div className="container mx-auto px-4">

// Section container
<section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    {/* Section content */}
  </div>
</section>

// Full-width hero
<section className="min-h-[80vh] bg-cover bg-center">
  <div className="container mx-auto px-4 py-12">
    {/* Hero content */}
  </div>
</section>
```

### Grid Patterns
```tsx
// Two-column layout (hero)
<div className="grid lg:grid-cols-2 gap-12 items-center">

// Three-column layout (learning section)
<div className="grid lg:grid-cols-3 gap-8">

// Four-column layout (achievements)
<div className="grid lg:grid-cols-4 gap-8">

// Responsive card grid
<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
```

### Responsive Breakpoints
```css
/* Mobile first approach */
/* Base styles apply to mobile (< 768px) */

md:  /* 768px and up - Tablet */
lg:  /* 1024px and up - Desktop */
xl:  /* 1280px and up - Large desktop */
2xl: /* 1536px and up - Extra large */
```

## Interactive States

### Hover Effects
```tsx
// Card hover
<Card className="group hover:shadow-elegant transition-smooth">
  <CardTitle className="group-hover:text-primary transition-smooth">
    Title
  </CardTitle>
</Card>

// Button hover with transform
<Button className="transform hover:scale-105 transition-bounce">

// Icon hover
<Icon className="hover:text-primary transition-smooth" />
```

### Focus States
```tsx
// All interactive elements should have visible focus
<Button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">

// Custom focus ring
<div className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
```

### Loading States
```tsx
// Button loading
<Button disabled className="opacity-50 cursor-not-allowed">
  Loading...
</Button>

// Skeleton loading
<div className="animate-pulse bg-muted rounded-lg h-4 w-3/4">
```

## Icon System

### Icon Library
- **Primary**: Lucide React icons
- **Size**: Consistent 16px (w-4 h-4) for inline, 24px (w-6 h-6) for standalone
- **Colour**: Inherit from parent or use semantic colours

### Icon Usage Patterns
```tsx
// Inline with text
<Button className="flex items-center space-x-2">
  <Icon className="w-4 h-4" />
  <span>Button Text</span>
</Button>

// Standalone icon button
<Button size="icon">
  <Icon className="w-4 h-4" />
</Button>

// Large feature icons
<div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
  <Icon className="w-6 h-6 text-primary-foreground" />
</div>
```

### Semantic Icon Mapping
- **Home**: Home icon
- **Lessons**: BookOpen icon
- **Achievements**: Trophy icon
- **Challenges**: Calendar icon
- **Pronunciation**: Volume2 icon
- **Settings**: Settings icon
- **Profile**: User icon
- **Language**: Globe icon
- **Theme**: Sun/Moon icons
- **Menu**: Menu icon
- **Success**: Star icon
- **Progress**: Target icon
- **Time**: Clock icon

## Accessibility Guidelines

### Colour Accessibility
- **Contrast ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Colour blindness**: Don't rely on colour alone for information
- **High contrast mode**: Support system high contrast preferences

### Keyboard Navigation
```tsx
// Proper tab order
<div tabIndex={0}>
<Button>                    // Naturally focusable
<div role="button" tabIndex={0}>  // Custom interactive element
```

### Screen Reader Support
```tsx
// Proper labelling
<Button aria-label="Close dialog">
  <X className="w-4 h-4" />
</Button>

// Descriptive text
<img alt="Flodhästen mascot - Swedish learning companion" />

// Status announcements
<div aria-live="polite">Status updates</div>
<div aria-live="assertive">Important alerts</div>
```

### Focus Management
```tsx
// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Focus trapping in modals
<Dialog>
  <DialogContent>
    {/* Focus trapped within */}
  </DialogContent>
</Dialog>
```

## Dark Mode Implementation

### Theme Toggle
```tsx
// Theme state management
const [isDark, setIsDark] = useState(false);

const toggleTheme = () => {
  setIsDark(!isDark);
  document.documentElement.classList.toggle('dark');
};

// Theme toggle button
<Button variant="ghost" size="icon" onClick={toggleTheme}>
  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
</Button>
```

### Dark Mode Classes
```tsx
// Conditional styling
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// Using CSS variables (preferred)
<div className="bg-background text-foreground">
```

## Performance Guidelines

### CSS Optimisation
- Use CSS variables for consistent theming
- Leverage Tailwind's utility classes for smaller bundle size
- Avoid deep nesting in custom CSS
- Use `will-change` sparingly for animations

### Component Optimisation
```tsx
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Use callback memoization
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### Image Optimisation
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading for below-fold images
- Provide multiple sizes for responsive images
- Compress images appropriately

## File Organisation

### CSS Structure
```
src/
├── index.css           # Global styles and CSS variables
├── components/
│   ├── ui/            # Base UI components (shadcn/ui)
│   └── [Component].tsx # Custom components
└── lib/
    └── utils.ts       # Utility functions (cn helper)
```

### Component Structure
```tsx
// Component template
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "default-size-classes",
        sm: "small-size-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

export { Component, componentVariants };
```

## Quality Assurance

### Design Review Checklist
- [ ] Follows Swedish colour palette (blue/yellow)
- [ ] Uses consistent spacing system
- [ ] Implements proper hover/focus states
- [ ] Supports dark mode
- [ ] Meets accessibility standards
- [ ] Uses semantic HTML elements
- [ ] Includes proper ARIA labels
- [ ] Maintains responsive design
- [ ] Follows component patterns
- [ ] Uses consistent typography scale

### Testing Guidelines
- Test all interactive states (hover, focus, active)
- Verify dark mode appearance
- Check responsive behaviour across breakpoints
- Test keyboard navigation
- Validate colour contrast ratios
- Ensure proper screen reader announcements

## Future Considerations

### Design System Evolution
- **Component documentation**: Consider Storybook for component showcase
- **Design tokens**: Expand token system for more granular control
- **Animation library**: Consider Framer Motion for complex animations
- **Theme variants**: Support for multiple theme variations
- **Accessibility testing**: Automated accessibility testing tools

### Maintenance
- Regular design system audits
- Component usage tracking
- Performance monitoring
- Accessibility compliance checks
- User feedback integration

This style guide serves as the single source of truth for all design decisions in Flodhästen. All future development should reference this document to ensure consistency and maintain the high-quality Swedish-inspired design aesthetic.
