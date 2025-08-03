# SMHI Energy Solutions - Deployment Guide

## Pre-Deployment Checklist

### 1. Code Quality & Optimization
- [ ] Minify CSS and JavaScript files
- [ ] Optimize images (already done via optimize-images.sh)
- [ ] Remove any console.log statements from production code
- [ ] Verify all external links and resources are using HTTPS

### 2. Testing
- [ ] Test all forms and interactive elements
- [ ] Verify all internal links work correctly
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on different devices (desktop, tablet, mobile)
- [ ] Check for 404 errors
- [ ] Verify proper redirects are in place

### 3. Performance
- [ ] Run Lighthouse audit
- [ ] Optimize page load times
- [ ] Implement lazy loading for images below the fold
- [ ] Set up proper caching headers

### 4. SEO & Analytics
- [ ] Verify all pages have proper meta tags
- [ ] Check robots.txt and sitemap.xml
- [ ] Set up Google Analytics/Search Console
- [ ] Test social media sharing previews

### 5. Security
- [ ] Ensure all forms have CSRF protection
- [ ] Verify HTTPS is enforced
- [ ] Set up security headers
- [ ] Remove any sensitive information from code

## Deployment Steps

### 1. Production Build
```bash
# Optimize images (if not already done)
./optimize-images.sh

# Minify CSS and JS (if applicable)
# (Add build commands here if using a build tool)
```

### 2. Choose a Hosting Provider
Options:
- Netlify (recommended for static sites)
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web hosting (cPanel, etc.)

### 3. Domain and SSL
- [ ] Point domain to hosting provider
- [ ] Set up SSL certificate (Let's Encrypt)
- [ ] Configure www to non-www redirect (or vice versa)

### 4. Post-Deployment
- [ ] Test the live site
- [ ] Set up monitoring
- [ ] Create a backup schedule
- [ ] Document the deployment process

## Environment Variables
If applicable, set these in your hosting provider's environment:
```
NODE_ENV=production
GOOGLE_ANALYTICS_ID=UA-XXXXXX-X
CONTACT_FORM_ENDPOINT=your-endpoint-here
```

## Rollback Plan
1. Keep previous version's build
2. Document the rollback process
3. Test the rollback procedure
