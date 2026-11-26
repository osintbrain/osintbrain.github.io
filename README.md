# OSINT Brain v2.2 — Cinematic Motion

Static English company profile for GitHub Pages. Edit `content.js` for business details. Existing content is unchanged from v2.1. Original logos and favicon retained. No external dependencies.

## Preview before deployment
Open `index.html` locally in a browser, or use the separately supplied self-contained HTML preview. Navigation uses seven discrete scenes: Home, About, Services, Approach, Sectors, Contact, Index. Wheel, keyboard, touch and bottom navigation switch scenes; on short or narrow screens long content may scroll internally. Motion respects reduced-motion preferences.

## Renderer
Native WebGL GPU particle rendering when available, with a Canvas2D fallback using the same scene shapes, 3D perspective, hover displacement and morph transitions. Browser QA in the supplied environment exercised the fallback (WebGL unavailable); GPU performance and shader execution on real hardware remain unverified. No claims of exact reproduction of DOTDNA's proprietary animation.

## Deploy
1. Extract the full ZIP and upload its contents (including assets and `.nojekyll`) to the root of a public GitHub repository.
2. Settings > Pages > Deploy from a branch > main > /(root) > Save.
3. For existing deployments, use the update-only archive and preserve `content.js` and brand assets. `assets/neural.js` is no longer referenced and may be deleted.
4. Verify links and add official contact details before publication.
