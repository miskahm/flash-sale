# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A production-ready Next.js 15 ecommerce landing page designed for flash sales and limited-time offers. Built with React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## GitHub Workflow

This project uses GitHub CLI (`gh`) for repository management:

```bash
# Create a new private repository
gh repo create flash-sale --private --source=. --remote=origin

# Create a new public repository
gh repo create flash-sale --public --source=. --remote=origin

# Push code to GitHub
git push -u origin master

# View repository in browser
gh repo view --web

# Create a pull request
gh pr create --title "Your PR title" --body "PR description"

# View pull requests
gh pr list

# Check out a pull request
gh pr checkout <PR_NUMBER>

# View issues
gh issue list

# Create an issue
gh issue create --title "Issue title" --body "Issue description"
```

## Deployment

### Vercel Deployment (Recommended)

This project is optimized for deployment on Vercel:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

**Alternative: Deploy via Git Integration**
1. Push code to GitHub using `git push -u origin master`
2. Import project at vercel.com/new
3. Vercel auto-detects Next.js configuration
4. Click "Deploy" - no configuration needed

**Environment Variables** (if needed):
- Configure in Vercel Dashboard → Settings → Environment Variables
- All Next.js environment variables work automatically

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x with strict mode
- **Styling**: Tailwind CSS 4 with custom animations
- **Fonts**: Geist Sans and Geist Mono (optimized via next/font)

### File Structure
- `app/page.tsx` - Main flash sale landing page (client component)
- `app/layout.tsx` - Root layout with font configuration
- `app/globals.css` - Global styles and custom animations

### Key Implementation Details

**Client-Side State Management** (app/page.tsx):
- Uses React hooks for managing timers, stock levels, and notifications
- Three separate timers: global countdown, per-product countdowns, and notification system
- All timers auto-reset when they reach zero to simulate continuous flash sales

**Product Data Structure**:
```typescript
interface Product {
  id: number;
  name: string;
  icon: string;
  originalPrice: number;
  discountedPrice: number;
  totalStock: number;
  remainingStock: number;
  timerDuration: number;
}
```

**Dynamic Features**:
- Randomized viewer counts updated every 5 seconds
- Toast notifications with auto-dismiss (4-second duration)
- Stock updates on "Buy Now" clicks
- Custom slide-in animation for notifications (defined in globals.css)

### Path Aliasing
- `@/*` maps to project root (configured in tsconfig.json)

## Project Requirements

### Core Features
1. **Hero Section**: Three featured products with icon placeholders, pricing, and stock indicators
2. **Engagement Elements**: Global countdown, viewer counts, toast notifications
3. **Design Style**: Bold colors, high contrast, urgency-focused UI with purple gradient background
4. **Interactivity**: Live timers, hover effects, stock tracking

### Code Standards
- Follow conventional commits format (feat:, fix:, docs:, refactor:, test:)
- Commit after each logical change with clear, specific messages
- Prefer editing existing files over creating new ones
- Use GitHub CLI (`gh`) for repository operations

### Design Principles
- Mobile-responsive (Tailwind breakpoints: md, lg)
- Fast decision-making optimized layout
- High-energy flash sale aesthetic
- All interactive elements use smooth transitions

## Important Instructions

### File Creation and Modification
- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User