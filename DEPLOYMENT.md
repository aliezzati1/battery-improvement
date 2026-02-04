# Deployment Guide

This guide will help you deploy the Battery Detail screen and get a live URL.

## Quick Deploy Options

### Option 1: Vercel (Fastest - Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts. Vercel will automatically detect Vite and configure everything.

4. **Get your URL**: After deployment, Vercel will provide you with a URL like `https://your-project.vercel.app`

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Build and Deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** - Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages** in your repository settings and set source to `gh-pages` branch.

### Option 4: Manual Hosting

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to any static hosting service:
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps
   - Any web hosting service

## Testing Locally

Before deploying, test locally:

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Notes

- The app is optimized for mobile view (393px width)
- All assets are included in the build
- No backend required - it's a static site
- The "Yesterday's Performance" card has a click handler ready for navigation
