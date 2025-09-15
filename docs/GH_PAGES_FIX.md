# GitHub Pages Setup and Deployment Guide

This guide provides instructions for preparing and deploying the repository to GitHub Pages, fixing common issues with relative CDN links, and handling problematic file names.

## Table of Contents

1. [Overview](#overview)
2. [GitHub Pages Setup](#github-pages-setup)
3. [Fixing CDN Links](#fixing-cdn-links)
4. [Handling Problematic File Names](#handling-problematic-file-names)
5. [Local Testing](#local-testing)
6. [ASP.NET Considerations](#aspnet-considerations)
7. [Troubleshooting](#troubleshooting)

## Overview

This repository contains website data that needs preparation before deployment to GitHub Pages. The main issues to address are:

- Relative CDN links that break when served as static files
- File and directory names with spaces, special characters, or non-ASCII characters
- Jekyll processing that may interfere with the site structure

## GitHub Pages Setup

### Step 1: Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose the branch you want to deploy (typically `main` or `gh-pages`)
5. Select the root folder (`/`) as the publishing source
6. Click "Save"

### Step 2: Disable Jekyll Processing

This repository includes a `.nojekyll` file in the root directory to disable Jekyll processing. This prevents GitHub Pages from trying to process files starting with underscores or applying Jekyll transformations.

If the `.nojekyll` file is missing, create it:

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll to disable Jekyll processing"
git push
```

### Step 3: Configure Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the root directory containing your domain name
2. Configure your DNS settings to point to GitHub Pages
3. Enable HTTPS in the repository settings

## Fixing CDN Links

### Problem

Many HTML files contain relative CDN links like:
- `../cdn.jsdelivr.net/...`
- `../ajax.googleapis.com/...`
- `../fonts.googleapis.com/...`
- `../cdnjs.cloudflare.com/...`

These relative links break when the site is served from GitHub Pages because the CDN content is not available locally.

### Solution

Use the provided script to convert relative CDN links to absolute HTTPS URLs:

```bash
# From the repository root
./scripts/fix-cdn-urls.sh
```

The script will:
1. Scan all HTML files for relative CDN patterns
2. Show a preview of changes to be made
3. Ask for confirmation before applying changes
4. Replace relative URLs with absolute HTTPS URLs

**Example transformation:**
```html
<!-- Before -->
<script src="../ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- After -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

### Manual Verification

After running the script:
1. Test the site locally using a local web server
2. Check that external resources load correctly
3. Verify that local file references are not broken

## Handling Problematic File Names

### Problem

Some files and directories have names that can cause issues with web servers:
- Names with spaces (e.g., `file name.html`)
- Names with plus signs (e.g., `file+name.html`)
- Names with %20 sequences
- Names with non-ASCII characters (Arabic text, etc.)
- Names with special characters (&, =, ?, #, etc.)

### Detection

Use the provided script to identify problematic file names:

```bash
# From the repository root
./scripts/list-bad-paths.sh
```

This script will:
1. List all files/directories with spaces
2. List files with plus signs, %20, and other special characters
3. List files with non-ASCII characters
4. Provide rename suggestions
5. Give recommendations for manual fixes

### Manual Fixes

**Important:** Do NOT rename files automatically as this may break internal links!

To safely rename files:

1. Use `git mv` to preserve Git history:
   ```bash
   git mv "old name with spaces.html" "new-name-with-hyphens.html"
   ```

2. Update all references to the renamed file in:
   - HTML href and src attributes
   - CSS @import and url() references
   - JavaScript file references
   - Configuration files

3. Test thoroughly after each rename

**Recommended naming conventions:**
- Use hyphens (-) instead of spaces
- Use underscores (_) for logical separation
- Use lowercase letters when possible
- Avoid special characters
- Use ASCII characters only

## Local Testing

### Method 1: Python HTTP Server

```bash
# Navigate to the repository root
cd /path/to/repository

# Start a local web server (Python 3)
python3 -m http.server 8000

# Access the site at http://localhost:8000
```

### Method 2: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Start server from repository root
http-server -p 8000

# Access the site at http://localhost:8000
```

### Testing Checklist

- [ ] External CDN resources load correctly
- [ ] Images and media files display properly
- [ ] Internal navigation links work
- [ ] CSS and JavaScript files load
- [ ] No 404 errors in browser console
- [ ] Site works with file:// protocol (optional)

## ASP.NET Considerations

**Important:** GitHub Pages only supports static files (HTML, CSS, JS, images). It does NOT support server-side technologies like ASP.NET.

### If Your Site Uses ASP.NET

You have several options:

1. **Create a Static Version:**
   ```bash
   # Use wget to create a static snapshot
   wget --mirror --page-requisites --html-extension \
        --convert-links --domains yourdomain.com \
        http://yourdomain.com/
   
   # Or use other tools like HTTrack
   ```

2. **Deploy to ASP.NET-Compatible Hosting:**
   - Azure App Service
   - AWS Elastic Beanstalk
   - Traditional web hosting with .NET support

3. **Convert to Static Site Generator:**
   - Consider migrating to Jekyll, Hugo, or similar tools
   - Maintain the same visual design with static generation

### Identifying Dynamic Content

Look for files with these extensions in your repository:
- `.aspx` - ASP.NET Web Forms
- `.cshtml` - ASP.NET MVC/Razor
- `.ashx` - Generic handlers
- `.asmx` - Web services

If found, these indicate server-side functionality that won't work on GitHub Pages.

## Troubleshooting

### Common Issues

1. **Site shows directory listing instead of homepage**
   - Ensure you have an `index.html` file in the root or subdirectories
   - Check GitHub Pages source configuration

2. **CSS/JS files not loading**
   - Check file paths are correct (case-sensitive)
   - Verify `.nojekyll` file exists if files start with underscores
   - Check browser console for 404 errors

3. **Images not displaying**
   - Verify image file paths and extensions
   - Check for problematic file names (spaces, special characters)
   - Ensure images are committed to the repository

4. **CDN resources not loading**
   - Run the `fix-cdn-urls.sh` script to convert relative URLs
   - Check internet connectivity for external resources
   - Verify HTTPS is used for external resources

5. **404 Page Not Found**
   - Check that the branch and folder are correctly configured
   - Verify the site URL in repository settings
   - Allow a few minutes for changes to propagate

### Debug Steps

1. Check GitHub Pages build status in repository settings
2. Use browser developer tools to inspect network requests
3. Test locally with a web server before deploying
4. Verify all file references use correct case (Linux is case-sensitive)

### Getting Help

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Community Discussions](https://github.community/)
- Check repository Issues for common problems and solutions

## Additional Resources

- [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart)
- [Custom Domains for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Jekyll on GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)