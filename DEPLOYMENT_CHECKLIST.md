# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] TypeScript configuration is correct
- [x] ESLint configuration is present
- [x] All components are properly typed
- [x] No console.log statements in production code
- [ ] Build passes locally (`npm run build`)
- [ ] Linting passes (`npm run lint`)

### ✅ Git Repository
- [ ] Initialize git repository (if not already done)
  ```bash
  cd piano-chord-progressions
  git init
  git add .
  git commit -m "Initial commit"
  ```
- [x] `.gitignore` is properly configured
- [x] No sensitive files committed (`.env.local`, `.env`)
- [ ] Create `.gitattributes` if needed for line endings

### ✅ Environment Variables
- [x] `.env.local.example` exists with all required variables
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL (e.g., `https://yourdomain.com`)
- [ ] Optional: Configure AdSense variables if using ads
  - `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
  - `NEXT_PUBLIC_ADSENSE_HOMEPAGE_SLOT_ID`
  - `NEXT_PUBLIC_ADSENSE_DETAIL_SLOT_ID`
  - `NEXT_PUBLIC_ADSENSE_INGRID_SLOT_ID`

### ✅ SEO Configuration
- [x] `robots.ts` configured
- [x] `sitemap.ts` configured
- [x] Meta tags in `layout.tsx`
- [x] Open Graph tags configured
- [x] Twitter Card tags configured
- [x] Structured data (JSON-LD) added
- [x] Canonical URLs set
- [x] Language attribute set (`lang="en"`)
- [ ] Verify `metadataBase` uses production URL

### ✅ Files & Documentation
- [x] `README.md` exists and is complete
- [x] `LICENSE` file added (MIT)
- [x] `package.json` has correct name and version
- [ ] Consider adding `CHANGELOG.md` for version tracking

## GitHub Deployment

### Step 1: Create GitHub Repository
1. Go to GitHub and create a new repository
2. Name it `piano-chord-progressions` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### Step 2: Push to GitHub
```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/piano-chord-progressions.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Verify Repository
- [ ] All files are present
- [ ] `.gitignore` is working (no `node_modules`, `.next`, etc.)
- [ ] README displays correctly
- [ ] LICENSE file is visible

## Vercel Deployment

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `piano-chord-progressions` repository

### Step 2: Configure Project Settings
- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Step 3: Environment Variables
Add these in Vercel dashboard under "Environment Variables":
- `NEXT_PUBLIC_SITE_URL` = `https://your-vercel-domain.vercel.app` (or your custom domain)
- Optional AdSense variables if using ads

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Verify deployment is successful
- [ ] Test the live site

### Step 5: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to match custom domain

## Google Search Console Setup

### Step 1: Verify Ownership
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix" and enter your site URL
4. Verify ownership using one of these methods:
   - **HTML file upload** (recommended for Vercel)
   - **HTML tag** (add to `layout.tsx`)
   - **DNS record** (if you have custom domain)
   - **Google Analytics** (if already set up)

### Step 2: Submit Sitemap
1. Once verified, go to "Sitemaps" in the left menu
2. Enter: `https://yourdomain.com/sitemap.xml`
3. Click "Submit"
4. Wait for Google to crawl (may take a few days)

### Step 3: Request Indexing
1. Go to "URL Inspection" tool
2. Enter your homepage URL
3. Click "Request Indexing"
4. Repeat for important pages (or wait for automatic crawling)

### Step 4: Monitor Performance
- [ ] Check "Coverage" report for indexing issues
- [ ] Monitor "Performance" for search queries
- [ ] Review "Enhancements" for structured data validation
- [ ] Set up email alerts for issues

## Post-Deployment Verification

### Functionality Checks
- [ ] Homepage loads correctly
- [ ] All progression pages load
- [ ] Filters work correctly
- [ ] Piano keyboard visualizations render
- [ ] Responsive design works on mobile
- [ ] Links and navigation work
- [ ] 404 page works for invalid URLs

### SEO Checks
- [ ] `robots.txt` is accessible at `/robots.txt`
- [ ] `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Meta tags are present (check with browser dev tools)
- [ ] Structured data validates (use [Google Rich Results Test](https://search.google.com/test/rich-results))
- [ ] Open Graph tags work (test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Canonical URLs are correct

### Performance Checks
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Check Core Web Vitals
- [ ] Verify images are optimized
- [ ] Check page load times

### Security Checks
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] No sensitive data exposed in client-side code
- [ ] Environment variables are not exposed

## Additional SEO Enhancements (Optional)

### Consider Adding:
1. **Favicon** - Add to `public/favicon.ico`
2. **Apple Touch Icon** - For iOS devices
3. **Manifest.json** - For PWA capabilities
4. **Breadcrumb Schema** - Already have breadcrumbs, could add schema
5. **FAQ Schema** - If adding FAQ section
6. **HowTo Schema** - For tutorial content
7. **Image Optimization** - Use Next.js Image component if adding images
8. **Analytics** - Google Analytics or similar
9. **Social Media Preview Images** - Custom OG images

## Troubleshooting

### Build Fails on Vercel
- Check build logs for errors
- Verify Node.js version (Vercel uses 18.x by default)
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors

### Sitemap Not Found
- Verify `sitemap.ts` exports correctly
- Check that `NEXT_PUBLIC_SITE_URL` is set
- Ensure build completed successfully

### Structured Data Errors
- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Verify JSON-LD syntax is correct
- Check that required fields are present

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables
- Check Vercel environment variable settings

## Next Steps After Deployment

1. **Monitor Analytics** - Set up Google Analytics or similar
2. **Content Updates** - Regularly add new chord progressions
3. **SEO Optimization** - Monitor Search Console and optimize based on data
4. **Performance** - Regularly check Lighthouse scores
5. **User Feedback** - Collect and act on user feedback
6. **Backup Strategy** - Ensure code is backed up in GitHub

## Quick Reference

### Important URLs After Deployment
- **Live Site**: `https://your-vercel-domain.vercel.app`
- **Sitemap**: `https://your-vercel-domain.vercel.app/sitemap.xml`
- **Robots**: `https://your-vercel-domain.vercel.app/robots.txt`
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/piano-chord-progressions`
- **Vercel Dashboard**: `https://vercel.com/dashboard`

### Useful Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
