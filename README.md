# Battery Detail Screen

A mobile-responsive React application implementing the Battery Detail screen from Figma design.

## Features

- ✅ Exact color matching from Figma design
- ✅ Responsive mobile layout (393px width)
- ✅ Sticky bottom navigation
- ✅ Tappable "Yesterday's Performance" card
- ✅ Energy flow diagram visualization
- ✅ All cards and components styled to match design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Deploy:
```bash
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── BatteryDetail.jsx       # Main component
│   ├── StatusBar.jsx           # Top status bar
│   ├── NavigationBar.jsx       # App navigation
│   ├── HouseDiagram.jsx        # Energy flow diagram
│   ├── ChargingStatusCard.jsx  # Battery charging card
│   ├── ModeCard.jsx            # Mode selection card
│   ├── EarningsCard.jsx        # Earnings & Savings card
│   ├── PerformanceCard.jsx     # Yesterday's Performance (tappable)
│   └── BottomNavigation.jsx    # Sticky bottom nav
└── App.jsx                     # Root component
```

## Design Specifications

- **Colors:**
  - Background: `#f2efec`
  - White: `#ffffff`
  - Green: `#009a33`
  - Yellow: `#ffd700`
  - Gray: `#cdc8c2`
  - Text: `#000000` / `#353230`

- **Font:** Inter (fallback to system fonts)
- **Screen Width:** 393px (mobile)
- **Spacing:** 4px, 8px, 12px, 16px, 24px, 48px

## Notes

- Only the "Yesterday's Performance" card is tappable (has onClick handler)
- Bottom navigation is sticky and stays at the bottom of the viewport
- All other cards are for display only
