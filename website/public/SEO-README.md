# SEO & Security Configuration

This directory contains all the necessary files for SEO optimization, security, and web standards compliance.

## Files Overview

### SEO & Discoverability

#### `robots.txt`
- **Purpose**: Controls web crawler access and behavior
- **Features**:
  - Allows all major search engines (Google, Bing, etc.)
  - Explicitly allows AI crawlers (GPTBot, Claude-Web, CCBot, etc.)
  - Links to sitemap.xml
  - Sets crawl delay to prevent server overload
- **Location**: `/robots.txt`

#### `sitemap.xml`
- **Purpose**: XML sitemap for search engines
- **Contents**:
  - Homepage with highest priority (1.0)
  - Download script (0.8 priority)
  - All IDE configuration files (0.7 priority)
  - Last modified dates for freshness
  - Change frequency indicators
- **Location**: `/sitemap.xml`
- **Update**: When adding new pages or significant content

#### `manifest.json`
- **Purpose**: PWA (Progressive Web App) configuration
- **Features**:
  - App name and description
  - Theme colors (#6366f1 primary, #0f172a background)
  - Display mode (standalone)
  - Icons configuration
  - Categories (development, productivity, education)
- **Location**: `/manifest.json`

### Meta Tags (in index.html)

#### Primary Meta Tags
- Title: "Agentic Driven (AD) 1.0 - AI-Native Development Methodology"
- Description: Comprehensive, keyword-rich description
- Keywords: AI development, methodology, AI agents, etc.
- Canonical URL: https://agenticdriven.dev/

#### Open Graph (Facebook, LinkedIn)
- Complete OG meta tags for social sharing
- Image: `/og-image.png` (1200x630px) - **TODO: Create this image**
- Type: website
- Site name, locale, etc.

#### Twitter Cards
- Summary with large image
- Image: `/twitter-image.png` (1200x628px) - **TODO: Create this image**
- Creator: @agenticdriven

#### Structured Data (JSON-LD)
- Schema.org SoftwareApplication type
- Price: Free ($0)
- Rating placeholder (update when you have reviews)
- Helps Google display rich snippets

### Security

#### `_headers`
- **Purpose**: Security headers for all pages
- **Headers Included**:
  - `X-Frame-Options: DENY` - Prevents clickjacking
  - `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
  - `X-XSS-Protection` - Browser XSS protection
  - `Content-Security-Policy` - Restricts resource loading
  - `Strict-Transport-Security` - Forces HTTPS (with preload)
  - `Referrer-Policy` - Controls referrer information
  - `Permissions-Policy` - Disables unnecessary browser features
- **Cache Control**: Configured per file type
- **Location**: `/_headers`
- **Note**: GitHub Pages may not support all headers

#### `.well-known/security.txt`
- **Purpose**: RFC 9116 compliant security contact
- **Contents**:
  - Security email: security@agenticdriven.dev
  - GitHub security advisories link
  - Expiration date (yearly renewal recommended)
  - Preferred languages
  - Links to security policy
- **Location**: `/.well-known/security.txt`
- **Standard**: https://securitytxt.org/

### Other

#### `humans.txt`
- **Purpose**: Credits and site information for humans
- **Contents**:
  - Team information
  - Technologies used
  - Last update date
  - Methodology details
  - Thanks and acknowledgments
- **Location**: `/humans.txt`
- **Standard**: http://humanstxt.org/

#### `404.html`
- **Purpose**: Custom 404 error page
- **Features**:
  - Branded error page with AD styling
  - Gradient background matching site design
  - Clear call-to-action (Go Home button)
  - Quick links to GitHub, Docs, Community
  - Responsive design
- **Location**: `/404.html`
- **GitHub Pages**: Automatically served on 404 errors

## TODO: Create Social Share Images

You need to create two images for social sharing:

### Open Graph Image (`og-image.png`)
- **Size**: 1200x630px
- **Format**: PNG or JPG
- **Content**:
  - AD 1.0 branding
  - Tagline: "The first AI-native methodology"
  - Key stats: 7 principles, 6 phases
  - Gradient background matching site colors
- **Location**: `/og-image.png`

### Twitter Image (`twitter-image.png`)
- **Size**: 1200x628px (slightly different ratio)
- **Format**: PNG or JPG
- **Content**: Similar to OG image, optimized for Twitter
- **Location**: `/twitter-image.png`

**Tools to create these**:
- Figma, Canva, Photoshop
- Or use screenshot of hero section + text overlay
- Ensure text is readable even at small sizes

## Validation & Testing

### SEO
- Google Search Console: https://search.google.com/search-console
- Submit sitemap.xml
- Monitor indexing status
- Check for crawl errors

### Open Graph
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Twitter Cards
- Twitter Card Validator: https://cards-dev.twitter.com/validator

### Structured Data
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/

### Security
- Mozilla Observatory: https://observatory.mozilla.org/
- Security Headers: https://securityheaders.com/
- SSL Test: https://www.ssllabs.com/ssltest/

### Lighthouse
- Run in Chrome DevTools (F12 → Lighthouse)
- Check Performance, Accessibility, Best Practices, SEO
- Aim for 90+ scores in all categories

## Maintenance

### Regular Updates
- **robots.txt**: Review AI crawler list quarterly
- **sitemap.xml**: Update when adding new pages/content
- **security.txt**: Renew expiration date yearly
- **manifest.json**: Update when changing branding
- **index.html meta tags**: Update when changing description/keywords

### Monitoring
- Google Search Console: Weekly
- Analytics: Daily during launch, weekly after
- Security advisories: Monitor GitHub
- Lighthouse scores: Monthly

## Performance Notes

### Current Configuration
- Static site (no server-side rendering needed)
- All assets cached appropriately
- Security headers applied
- SEO meta tags complete
- AI crawlers allowed

### GitHub Pages Limitations
- Some security headers may not be applied
- Consider Cloudflare or Vercel for:
  - Full header control
  - Better caching
  - Edge functions
  - Analytics

## Resources

- **SEO**: https://moz.com/beginners-guide-to-seo
- **Open Graph**: https://ogp.me/
- **Twitter Cards**: https://developer.twitter.com/en/docs/twitter-for-websites/cards
- **Schema.org**: https://schema.org/
- **Security Headers**: https://owasp.org/www-project-secure-headers/
- **PWA**: https://web.dev/progressive-web-apps/
