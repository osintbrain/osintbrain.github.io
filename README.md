# OSINT Brain v3.0 — Reference-inspired rebuild

A static corporate website adapted from the provided DOTDNA reference video. Original OSINT Brain branding, burgundy palette, English content, two color modes and native WebGL/Canvas animation are retained. The visual design is original code, not DOTDNA source or a pixel-identical copy. The video shows About, Contact and the closing scene; Home and Services are our own adaptations.

## Preview before deployment
Open `index.html` after extracting the complete package or open the self-contained preview HTML in a browser. Local previews do not transmit contact messages. Navigate using the bottom dock, wheel, keyboard, or mobile menu/swipe. On short screens, sections may scroll internally to avoid clipping content.

## What's changed
- Centered home composition with a bright interactive particle wave.
- Minimal fixed header, theme-specific original logo, transparent favicon, centered bottom dock.
- About scene with staggered content and scanning accents; independent approach and sectors screens.
- Services: text-only accordion. All service-specific artwork, including the previous dynamic SVG panel, has been removed.
- Contact: centered rotating particle object and a button that opens the existing accessible contact form dialog. The form uses FormSubmit and the recipient ghossan@osintbrain.org. Close it via Escape or the close button.
- Separate closing scene.

## Deploy to existing GitHub Pages
Use the UPDATE ONLY ZIP if you already have your site online. Back up your current repository first. Extract the ZIP and merge its contents into the repository root, preserving the folder `assets/`. Do not upload the ZIP or a containing folder itself. The update contains index.html, scripts and styles, favicon files, thank-you.html and this README. It intentionally excludes content.js and the two header logo files. Keep your existing content.js, logo-dark.png and logo-light.png. A full package is also available (with the last supplied sample content).

For root publication use repository `osintbrain.github.io` under account `osintbrain`, Settings > Pages > Deploy from a branch > main > /(root), no custom domain unless intentionally configured. Do not change DNS just to apply this update. Commit changes and check the Pages deployment.

## Contact
Test delivery on the live HTTPS site. FormSubmit requires email activation if not previously activated. No password, API key or backend is embedded. The redirect is calculated from the actual website URL. A preview submission is blocked intentionally; no live email was sent in QA. Only collect non-sensitive enquiries.

## QA limitations
Desktop and mobile viewport checks used Chromium's Canvas2D fallback (no usable WebGL in this environment). GPU rendering, physical-device swipes and real FormSubmit delivery are not verified. Test the standalone preview before publishing. Existing live repository content has not been fetched; use the update-only package to preserve your edits.

## v3.1 — Contact particle logo
Contact uses the uploaded brain/magnifier symbol sampled into a responsive, full-screen point cloud. Dark/light modes, navigation and form behavior remain unchanged. Update `index.html`, `assets/motion.js`, and `assets/editorial.css` from v3.0. Preview form submissions are disabled; live FormSubmit settings are unchanged.
