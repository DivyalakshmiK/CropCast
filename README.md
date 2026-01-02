# CropCast 🌾

CropCast is a simple React web application built using Vite.  
It displays crop-related data and dashboards with a clean and modern UI.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Getting Started

### Install dependencies
```bash
npm install
# or
bun install
```

### Run the project

```bash
npm run dev
# or
bun run dev
```

Open the app in your browser at: http://localhost:5173

## Project Structure

```
public/
  favicon.png        # Browser tab icon

src/
  components/        # UI components
  pages/             # Pages (Landing, Dashboard, etc.)
  data/              # Static / mock data
  App.tsx
  main.tsx

index.html
vite.config.ts
```

## Notes
* Static files like images and favicons go in the `public/` folder
* The app starts from `src/main.tsx`
* Styling is handled using Tailwind CSS

## Build for Production

```bash
npm run build
# or
bun run build
```