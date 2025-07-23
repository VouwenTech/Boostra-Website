# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on http://localhost:8080)
- **Build for production**: `npm run build`
- **Build for development**: `npm run build:dev`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Architecture Overview

This is a **React + TypeScript + Vite** website built with **shadcn/ui** and **Tailwind CSS**. The project appears to be a business/marketing website for "Boostra" built using the Lovable platform.

### Tech Stack
- **Build Tool**: Vite with React SWC plugin
- **Frontend**: React 18 with React Router for routing
- **Styling**: Tailwind CSS with custom Boostra brand colors
- **Components**: shadcn/ui component library (Radix UI primitives)
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner for toasts

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components (Button, Card, etc.)
│   ├── Navbar.tsx      # Navigation component
│   ├── Hero.tsx        # Hero section
│   └── [Other sections]
├── pages/              # Route components
│   ├── Index.tsx       # Homepage
│   ├── About.tsx
│   ├── Services.tsx
│   └── [Other pages]
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets (SVGs, images)
```

### Key Configuration Files
- **Vite Config**: Uses path alias `@` → `./src`, runs on port 8080
- **TypeScript**: Relaxed settings (noImplicitAny: false, strictNullChecks: false)
- **ESLint**: React-specific rules, unused vars warnings disabled
- **Tailwind**: Custom Boostra brand colors defined in config

### Component Architecture
- **Layout**: Each page is a complete layout with Navbar and Footer
- **Routing**: React Router with routes defined in App.tsx
- **Styling**: Utility-first with Tailwind, custom brand colors for Boostra theme
- **UI Components**: shadcn/ui components with Radix UI primitives

### Brand Colors (Boostra Theme)
The project uses a custom color palette defined in `tailwind.config.ts`:
- Primary blue: `#0EA5E9`
- Yellow accent: `#F59E0B` 
- Pink accent: `#D946EF`
- Red variants: `#FF4A4A`, `#E84C3D`, `#B91C1C`
- Supporting colors: purple, orange, dark gray

### Development Notes
- **Lovable Platform**: This project is connected to Lovable (lovable.dev) for collaborative development
- **Component Tagging**: Uses `lovable-tagger` in development mode for component identification
- **Path Aliases**: Use `@/` prefix for imports from src directory
- **Toast System**: Two toast systems available (shadcn toast + Sonner)

### Adding New Routes
Add new routes in `src/App.tsx` above the catch-all "*" route. Each page should be a complete layout component.

### Adding New Components
- UI components go in `src/components/ui/` (shadcn/ui)
- Business components go in `src/components/`
- Follow existing patterns for imports and styling