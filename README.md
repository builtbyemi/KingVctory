# King Vctory

A responsive portfolio for Edime Victor: content, community and Web3 culture.

## Brand palette

The final color direction matches the user's previous deployed portfolio at https://king-vctory.vercel.app/. Its stylesheet and rendered background were inspected directly. The exact source palette is navy `#03133B`, deep blue `#041D5C`, blue `#086BFF`, electric blue `#1687FF`, cyan `#62DCFF`, gold `#D99A16`, bright gold `#FFC83D`, white `#F5F8FF` and muted text `#91A5CC`.

The foundation gradient is copied exactly from that stylesheet: a blue radial light at 70% / 40% over a 135-degree gradient from `#020B20` through `#03133B` to `#02102E`. The work section also uses its original gradient. This replaces the interim bright/white palette in accordance with the user's latest direction. The original `king.jpg` is displayed without desaturation. Typography, project content and interaction logic are preserved.

Atmospheric surfaces use reusable CSS tokens, static gradients and lightweight geometric pseudo-elements. Only the hero lighting animates, using transform and opacity; it is disabled on small screens and follows the existing motion control and system reduced-motion preference. No large generated assets or extra runtime libraries are required.

## Run

Open `index.html` in a browser, or serve this directory with any static web server. There is no build step and no runtime JavaScript dependency. Deploy the HTML, CSS, JavaScript, favicon and existing JPG images together, preserving their relative paths.

## Files

- `index.html`: semantic page content, five project case studies, evidence links and contact details. Content and expandable stories work without JavaScript.
- `style.css`: design tokens, responsive layouts, orbital animation and reduced-motion styles.
- `script.js`: progressive scroll reveals, pointer interactions, motion control and accessible native image dialog.
- `favicon.svg`: the KV-inspired identity mark.

Google Fonts supplies Space Grotesk and DM Sans when available. System fonts provide a fallback. Images are local; project images load lazily and the hero image loads eagerly.

## Content

The five case studies, reported outcomes, character artwork, twelve supporting images and social/contact destinations are retained from the supplied portfolio. The unnamed community-growth project remains unnamed. No dates, clients, technology stacks or additional achievements have been invented. Flipflop's rank is presented as a reported portfolio result rather than a live ranking.

To change a project, edit its `article` in `index.html`. Each contains a visual preview, description, outcomes and expandable story with links to every supporting image. The same image links work directly when JavaScript is unavailable.

## Accessibility and motion

The page includes a skip link, visible focus styles, semantic landmarks and headings, descriptive image text, keyboard-operable disclosure controls and a native modal dialog. Escape closes the image viewer and restores focus. Motion respects the system preference and can be paused using the hero's Motion control. Pointer interactions are limited to fine pointers; no continuous JavaScript rendering loop is used.

## Verification

Checked in headless Chromium at 3840, 2560, 1440, 768, 390 and 320 pixels: no horizontal overflow. Tested case-study expansion, image viewing, Escape closing, motion pause and system reduced motion after the palette correction. Sampled primary text/background pairs passed 4.5:1 contrast. JavaScript syntax and whitespace checks passed, and browser runtime checks reported no JavaScript errors. Focus restoration, local asset/anchor references and no-JavaScript case studies were also checked during the initial implementation.

The supplied inspiration URL could not be accessed, so the design follows the written brief and existing brand assets. External social destinations are preserved, but account availability and historical project claims were not independently verified.
