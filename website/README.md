# AD 1.0 Website

Official website for Agentic Driven (AD) 1.0 methodology.

## Development

### With Docker (Recommended)

```bash
docker-compose up
```

Visit http://localhost:5173

### Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Builds to `../docs` for GitHub Pages deployment.

## Deployment

The site automatically deploys to GitHub Pages when you push to main branch.

GitHub Actions workflow:
- Builds the React app
- Outputs to `/docs` directory
- Deploys to GitHub Pages

## Configuration

To update the placeholder URLs for books and courses, edit:
- `src/App.jsx` - Update Amazon and Udemy links in the resources section

## Structure

```
website/
├── src/
│   ├── App.jsx        # Main component with all sections
│   ├── App.css        # Styles
│   ├── main.jsx       # Entry point
│   └── index.css      # Base styles
├── public/            # Static assets
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── Dockerfile         # Docker dev environment
└── docker-compose.yml # Docker compose config
```

## Features

- Modern React + Vite setup
- Responsive design
- SEO optimized
- Fast loading
- GitHub Pages ready
- Docker development environment
