# feels

A minimalist portfolio website inspired by danielfeles.com, built with React and Vite.

## Features

- Clean, minimalist design
- Dynamic content loading from JSON configuration
- Easy to customize and update content
- Fully responsive

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

This project is configured for easy deployment to Vercel.

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in the [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel will automatically detect it's a Vite project and configure it correctly
4. Click "Deploy"

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing (all routes serve `index.html`)

## Configuration

### GitHub Image Hosting

Images are loaded from your GitHub repository using raw content URLs. To configure this:

1. Open `src/config/github.js`
2. Update the `GITHUB_CONFIG` object with your GitHub username and repository name:
```javascript
export const GITHUB_CONFIG = {
  username: 'your-github-username', // Your GitHub username
  repo: 'feels', // Your repository name
  branch: 'main' // Usually 'main' or 'master'
}
```

Images will be loaded from: `https://raw.githubusercontent.com/USERNAME/REPO/BRANCH/public/images/...`

**Note:** Make sure your images are committed and pushed to the GitHub repository for them to be accessible.

## Customizing Content

All content is stored in `src/config/content.json`. Simply edit this file to update:

- Intro section (title, subtitle, description, bio, name)
- Tech section (work experience)
- Art section (art projects)
- Thoughts section

The content will automatically update when you save the file (in development mode) or after rebuilding (in production).

### Content Structure

```json
{
  "intro": {
    "title": "feels",
    "subtitle": "like a double slit experiment",
    "description": "∞ work in progress",
    "bio": "Your bio text here...",
    "name": "Your Name"
  },
  "sections": {
    "tech": {
      "title": "tech",
      "items": [
        {
          "company": "Company Name",
          "role": "Your Role",
          "period": "Time Period"
        }
      ]
    },
    "art": {
      "title": "art",
      "items": [
        {
          "title": "Project Title",
          "period": "Year or Period"
        }
      ]
    }
  }
}
```

## Project Structure

```
feels/
├── src/
│   ├── config/
│   │   └── content.json      # All content configuration
│   ├── App.jsx               # Main app component
│   ├── App.css               # App styles
│   ├── index.jsx             # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies

- React 18
- Vite
- CSS3

