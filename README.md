# Asibul Alam's Portfolio

Modern personal portfolio website built with React, TypeScript, and Vite.

## Features

- Responsive, component-driven portfolio layout
- Project showcase with dedicated detail page
- GitHub integration section
- Smooth UI interactions and scroll-based effects
- Reusable UI primitives under `src/components/ui`

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Vitest

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
git clone <your-repository-url>
cd pixel-perfect-portfolio
npm install
```

### Run Locally

```bash
npm run dev
```

The app will be available at the local URL shown in your terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```text
src/
	components/      # Page and shared UI components
	pages/           # Route-level pages
	services/        # API and integration helpers
	hooks/           # Reusable React hooks
	data/            # Mock/local data sources
	types/           # Shared TypeScript types
```

## Deployment

You can deploy this project to any static hosting provider that supports Vite output, such as:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```
