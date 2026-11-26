# OSINT Brain v1.4 — Burgundy Dual Theme

Static English company profile. No build, dependencies, database, or external CDN.

## Preview
Open index.html in a browser after extracting the entire ZIP. The standalone preview HTML is separate from the deployment package.

## Edit
Edit content.js for the company profile, headline, services, and contact details. Replace assets/logo.png if needed. All placeholder company copy should be verified before publication. The original uploaded burgundy logo is used; dark mode uses a CSS brightness adjustment for legibility.

## GitHub Pages
1. Back up your current repository and any edits to content.js.
2. Extract the ZIP and upload its contents (not the ZIP or its enclosing folder) into the repository root on the main branch.
3. Commit changes. For a new site, choose Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Check Actions and open the URL shown under Settings > Pages. For a public GitHub Free repository, GitHub Pages is available subject to GitHub's terms and limits.
5. Reload the site and verify the header, theme switch, mobile menu, and links.

The update-only package contains the changed files, including content.js (English copy). If you already customized that file, merge the English translations manually rather than replacing your edits. No credentials or private data should be committed.

## Theme
Default dark; the header toggle stores the preference locally when browser storage is available. The header is transparent at the top, and opaque while scrolled or the mobile menu is open. The canvas spans the complete Home section. Animation follows pointer interaction and respects reduced-motion preferences automatically.
