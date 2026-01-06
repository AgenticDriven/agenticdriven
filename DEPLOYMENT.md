# Deployment Guide

## GitHub Pages Setup

### 1. GitHub Pages Configuration

**Important**: This project uses GitHub Actions for deployment (not `/docs` folder).

1. In repository Settings > Pages
2. Under "Build and deployment":
   - **Source**: GitHub Actions (not "Deploy from a branch")
3. Save

### 2. Custom Domain (Optional)

If you want to use `agenticdriven.dev`:

1. In repository Settings > Pages > Custom domain
2. Enter: `agenticdriven.dev`
3. Click **Save**
4. Configure your DNS provider:
   - Add `A` records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add `CNAME` record: `www` → `yourusername.github.io`

### 3. First Deployment

```bash
cd website
docker-compose up
# Or without Docker:
npm install
npm run build
```

This will create the `/docs` directory with the built site.

```bash
git add .
git commit -m "feat: add website for ADD 1.0"
git push origin main
```

GitHub Actions will automatically build and deploy on every push to main.

## Updating Content

### Update Book/Course URLs

Edit `website/src/App.jsx`:

```jsx
// Line ~183-185 (Books section)
<a href="https://amazon.com/dp/YOUR-BOOK-ID" className="resource-link">
  View on Amazon →
</a>

// Line ~195-197 (Courses section)
<a href="https://udemy.com/course/YOUR-COURSE-ID" className="resource-link">
  Enroll on Udemy →
</a>
```

Replace:
- `YOUR-BOOK-ID` with actual Amazon book ID
- `YOUR-COURSE-ID` with actual Udemy course slug

### Update Footer Links

Edit `website/src/App.jsx` around lines 215-230.

## Development

### With Docker

```bash
cd website
docker-compose up
```

Visit http://localhost:5173

### Without Docker

```bash
cd website
npm install
npm run dev
```

## Build for Production

```bash
cd website
npm run build
```

Output: `/docs` directory (configured in `vite.config.js`)

## GitHub Actions Workflow

Located at `.github/workflows/deploy.yml`

Triggers on:
- Push to `main` branch
- Manual workflow dispatch

Steps:
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Build site (`npm run build`)
5. Deploy to GitHub Pages

## Troubleshooting

### Build fails in GitHub Actions

1. Check Node version (should be 20)
2. Verify `package-lock.json` exists (run `npm install` locally)
3. Check workflow logs in Actions tab

### Site not updating

1. Wait 1-2 minutes after push
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Actions tab for build status

### Custom domain not working

1. Verify DNS propagation (use https://dnschecker.org)
2. Check CNAME file in `/docs` after build
3. Ensure HTTPS is enforced in repository settings

## File Structure

```
/var/add/
├── website/              # Source code
│   ├── src/
│   │   ├── App.jsx      # Main component
│   │   ├── App.css      # Styles
│   │   └── ...
│   ├── public/          # Static assets
│   ├── Dockerfile       # Docker dev environment
│   └── package.json
├── docs/                # Built site (generated)
│   └── ...
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions
```

## Next Steps

1. ✅ Created website structure
2. ✅ Configured GitHub Actions
3. ✅ Added placeholder URLs
4. ⏳ Update Amazon/Udemy URLs when ready
5. ⏳ Push to GitHub
6. ⏳ Configure GitHub Pages
7. ⏳ (Optional) Setup custom domain
