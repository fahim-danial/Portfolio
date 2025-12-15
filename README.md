# Fahim Abdullah Danial — Rain-Glow Portfolio

Front-end only portfolio crafted with Vite + React, featuring dark rain-green glassmorphism aesthetics, cinematic motion, and responsive layouts.

## Stack

- Vite + React 18
- Framer Motion for buttery animations
- Vanilla CSS with custom gradients, glass panels, and rainfall FX

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview the production bundle locally
npm run preview
```

> Requires Node.js 18+ (with npm) locally.

## Structure

```
src/
  components/    # Shared UI atoms (nav, cards, motion helpers)
  sections/      # Hero, About, Skills, Projects, Experience, Contact
  data/          # Centralized profile data
  styles/        # Global styling + theme tokens
```

Update `src/data/portfolio.js` with your latest stats, projects, and socials to keep the site current.

## Résumé link

- `public/resume.pdf` is a placeholder so the “View Résumé” button can open a PDF in a new tab.
- Replace that file with your exported résumé (same filename) or point the hero action in `src/data/portfolio.js` to a hosted URL/database download endpoint.

## Hero portrait

- Drop a JPG/JPEG headshot at `public/profile.jpeg` (or update `hero.photo` in `src/data/portfolio.js` to match your file name).
- Use a squared image (or at least 800px on the short edge) so the glass frame in the hero section stays crisp.
