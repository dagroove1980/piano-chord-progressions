# Piano Chord Progressions

A curated collection of the most famous piano chord progressions, organized by style and complexity. Learn where to place your fingers on the keyboard with interactive visualizations.

## Features

- 🎹 **Interactive Keyboard Visualizations** - See exactly where to place your fingers
- 🎵 **10+ Famous Progressions** - From pop to jazz, beginner to advanced
- 🔍 **Filter by Style & Complexity** - Find progressions that match your skill level
- 📱 **Responsive Design** - Works beautifully on all devices
- 🚀 **Fast & SEO-Optimized** - Built with Next.js static generation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
piano-chord-progressions/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── data/
│   └── progressions.json # Chord progression data
└── public/              # Static assets
```

## Adding New Progressions

Edit `data/progressions.json` to add new chord progressions. Each progression includes:

- `id`: Unique identifier (URL-friendly)
- `name`: Display name
- `description`: Brief description
- `chords`: Array of chords (max 8)
- `style`: Genre/style (pop, jazz, blues, etc.)
- `complexity`: Skill level (beginner, intermediate, advanced)
- `tags`: Array of tags
- `examples`: Song examples (optional)
- `likes`: Popularity score
- `createdAt`: Creation date
- `featured`: Featured flag

## Keyboard Visualization

The `PianoKeyboard` component displays chords on a simplified piano keyboard, showing:
- White and black keys
- Which keys to press for each chord
- Note labels on keys
- Chord name and notes

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Static Generation** - Fast, SEO-friendly pages

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import in Vercel
3. Deploy!

## License

MIT
