# OSINT Brain — Corporate Landing Page v1.5

A cleaner, more professional, GitHub Pages-ready company landing page for OSINT Brain.

## What's new in v1.5

- Refined the overall layout to feel more like a professional corporate site rather than an AI-generated concept.
- Uses **two different logo files** depending on the theme:
  - **Dark mode** → white logo
  - **Light mode** → burgundy logo
- Transparent header with a subtle shiny glow at the top of the page.
- Header stays fixed and becomes **solid on scroll**.
- Header color behavior:
  - **Dark mode** → header content is white
  - **Light mode** → header content is `#91263e`
- Section colors alternate exactly as requested:
  - **Dark mode** → charcoal / white / charcoal / white
  - **Light mode** → `#91263e` / white / `#91263e` / white
- Fullscreen interactive neural background remains only in the Home section.
- Entire site content is in English.
- No framework, no build step, no database.

## Files

```text
osint-brain-v1.5/
├── index.html
├── content.js
├── README.md
└── assets/
    ├── logo-dark.png
    ├── logo-light.png
    ├── style.css
    ├── main.js
    └── neural.js
```

## How to edit content

Open `content.js` and edit the text values there.

You can change:
- company name
- hero text
- about text
- services
- method steps
- values
- contact information

## GitHub Pages deployment

1. Create a **public** GitHub repository.
2. Upload all files from this folder.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/root`
5. Save.
6. Your site will be live at:

```text
https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/
```

## Important note

This starter version is intentionally editable. It is designed as a professional shell that you can customize with your actual company profile, services, and contact details later.
