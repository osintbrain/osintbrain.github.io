# OSINT Brain v2.3 — Cinematic Motion / Contact & Domain Update

Based on v2.2. No framework or build step. Existing slide navigation and theme controls retained.

## Deploy or update
Upload the contents of this directory (not the enclosing folder) to your GitHub Pages publishing branch/root. Keep your existing `content.js` if edited. For a patch use the update-only ZIP; it excludes `content.js` and any CNAME. Do not delete an existing working CNAME.

## Root domain (no /osint-brain)
Choose one of these options:
- **Your own domain**, e.g. `osintbrain.org` (only if you own/control it): keep the `osint-brain` repo, open Settings > Pages > Custom domain, enter your exact apex domain, Save. Verify ownership in account/organization Pages settings first. GitHub writes CNAME for branch deployments. In DNS, configure four A records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Optional `www` CNAME -> `YOUR-GITHUB-OWNER.github.io` (no path). Remove only conflicting web records at the same names after checking existing services. Preserve MX, SPF, DKIM, DMARC and verification TXT records. Wait for the DNS check and enable Enforce HTTPS. If domain is attached to another Pages repository, transfer the Pages configuration to this repository or use the existing root site; don't assign the same domain twice. If DNS is already correct, do not change it. No CNAME is included because the exact domain was not confirmed.
- **Free GitHub address:** rename the repository or create a new public repository named exactly `YOUR-GITHUB-OWNER.github.io`. If this repo already exists, update it instead of creating a duplicate. Settings > Pages > Deploy from a branch > main > /(root). URL becomes `https://YOUR-GITHUB-OWNER.github.io/`.

All asset references are relative and work in either root or project URL. The email domain does not need to change. DNS configuration is account-specific and is not deployed by the ZIP.

Official docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Contact email activation (required)
1. Open the deployed HTTPS site, go to Contact, submit a harmless test message using your own name/email. The form uses FormSubmit.co with recipient `ghossan@osintbrain.org`; no SMTP password, API key or private credential is in the repository.
2. Check the recipient inbox and spam for the FormSubmit activation email. Confirm it, after verifying the request is yours. Then submit a second harmless message and verify delivery. FormSubmit may require a CAPTCHA before submission.
3. The form redirects to `thank-you.html` via a dynamically generated absolute URL. The provider handles the email delivery; a thank-you screen is not a guarantee of inbox delivery.
4. For additional protection, use the randomized endpoint offered by FormSubmit after activation if available, or set up your own approved form backend. Edit the `action` attribute in index.html if replacing the endpoint.

The form has browser validation, a honeypot, a consent checkbox and a notice about third-party processing. CAPTCHA is not disabled. Do not collect confidential intelligence, credentials or sensitive data in this public form. The standalone HTML preview deliberately blocks submission and does not send data. The live HTTPS version sends to FormSubmit. If the service is unavailable visitors can email the published address directly. Review FormSubmit's privacy policy and your own data handling before accepting enquiries. Docs: https://formsubmit.co/documentation and https://formsubmit.co/help

## Changes
- Favicon PNG is the exact supplied `logo only.png` (ICO variant with black background for clarity); cache-busting version added.
- Brighter point cloud in both WebGL and Canvas2D, stronger pointer response, corrected light-mode hero overlay.
- Contact scene now has a responsive form and an animated brain on the left.
- Existing content, logo switching and seven-scene navigation preserved.

Testing: Chromium preview, Canvas2D fallback; no live email or DNS changes performed. WebGL code syntax checked, actual GPU render not verified.
