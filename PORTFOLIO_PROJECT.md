# Suraj D P — Interactive Portfolio

A responsive, interactive portfolio website for presenting business analysis, healthcare IT, QA automation, software projects, experience, achievements, and a searchable certification collection.

## Design direction

The site uses a **Career Atlas** as its overall structure, with distinct visual treatments for different kinds of content:

- **Career Atlas navigation:** section roadmap on desktop; compact mobile dock on phones.
- **Portfolio Magazine:** spacious professional story and biography.
- **Healthcare Workflow Blueprint:** a visual, illustrative journey from understanding clinical needs through workflow mapping, requirements, validation, and delivery.
- **Project Story Lab:** project cards structured around the need, approach, and what the repository demonstrates.
- **Swiss Grid:** clean, high-contrast layouts and aligned information blocks.
- **Interactive Career Dashboard:** searchable, filterable credential cards.

These are coordinated parts of one site, not separate themes or disconnected pages.

## Features

- Responsive design with intentionally different desktop and mobile navigation/layout.
- Light theme by default plus a working dark/light toggle that remembers the visitor’s choice.
- Responsive mobile menu and fixed mobile quick-navigation dock.
- Project filtering by category.
- Searchable certification library with category and year filters, plus a PDF preview dialog that can be enabled for individually matched certificate files.
- Experience timeline, healthcare workflow blueprint, project stories, recognition, resume links, and an original-media travel journal.
- Direct links to GitHub, LinkedIn, Instagram, email, WhatsApp, project repositories, and FocusFlow.
- Two downloadable resume PDFs in the repository root.
- Scroll-reveal animations with reduced-motion support.
- Semantic HTML and keyboard-visible focus states.
- No frontend framework, backend, or build step.

## Certification library

The interactive credentials index contains 80 records assembled from the supplied LinkedIn certification list and certificate archive. Alternative exported copies were not shown as separate cards when they described the same course. The current categories are:

- Business & Product
- Project & Agile
- QA & Testing
- DevOps & Cloud
- AI & Security
- Data & Analytics
- IT Service Management
- Programming & Web
- Productivity & Collaboration
- Other Foundations

Card titles, issuer labels, and dates reflect the supplied records where available. Use LinkedIn’s certification section or the original issuer to confirm an individual credential. The list includes courses and completion records, not only third-party professional certifications; the website therefore uses “credentials” as the broader label.

## Tech stack

- HTML5
- CSS3: custom properties, Grid, Flexbox, media queries, and reduced-motion support
- Vanilla JavaScript
- GitHub for version control and source hosting
- GitHub Pages for free static hosting

## Files

- `index.html` — page content and semantic sections
- `assets/css/style.css` — theme, responsive layouts, and component styling
- `assets/js/main.js` — navigation, theme toggle, project filters, and reveal effects
- `assets/js/certifications.js` — searchable certification data, category/year filters, and optional per-certificate PDF previews
- `assets/js/travel-gallery.js` — lightbox-style travel photo and video gallery renderer
- `assets/gallery/README.md` — workflow for adding personal travel media
- `assets/certificates/README.md` — instructions for mapping exact certificate PDFs
- `PORTFOLIO_PROJECT.md` — project purpose, design, use, and deployment notes
- `Suraj_DP_Business_Analyst_Resume.pdf` — Business Analyst resume
- `Suraj_DP_Automation_Engineer_Resume.pdf` — Automation Engineer resume

## Certificate previews and travel media

The certificate viewer is wired up, but it only shows a **Preview PDF** action after an exact credential title is mapped to a matching PDF in `assets/js/certifications.js`. Place the verified PDF in `assets/certificates/` and add the relative path in the `certificatePdfs` object. The current repository does not yet contain matched certificate PDFs, so unmatched cards continue to link to LinkedIn.

The travel journal intentionally starts empty rather than inventing example travel photos. Add your own image/video files to `assets/gallery/` and register them in the `travelMedia` array in `assets/js/travel-gallery.js`. Image and video previews use an accessible dialog; video entries support MP4/WebM playback.

## Run locally

Open `index.html` in a browser. Or run a local server from the project root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment with GitHub Pages

The website source is stored in the root of the `surdp/surdp` profile repository alongside the profile README and resume PDFs.

1. Open https://github.com/surdp/surdp.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/(root)`, then save.
5. When deployment finishes, open https://surdp.github.io/surdp/.
6. Test theme switching, mobile navigation, project filters, credential search and year/category filters, contact links, and both resume downloads on desktop and phone.

GitHub Pages serves static files for free. There is no backend or database. Social icons and fonts are loaded from public CDNs.

## Content and accuracy

Professional history and reported outcomes are summarised from supplied resume and profile information. HL7, FHIR, and Revenue Cycle Management (RCM) are represented as continuing-learning areas, not independent implementation experience. The project improvement percentages are explicitly resume-reported. The healthcare workflow blueprint is illustrative, not a claim of a single end-to-end implementation.

## Privacy

Contact links include a public email address and WhatsApp number. Resume PDFs are public. Publish them only if comfortable sharing their contents.

## Future improvements

- Add real screenshots or demo clips for each project.
- Add detailed case studies describing constraints, decisions, testing, and outcomes.
- Add HTML/link checks through GitHub Actions.
- Add verified, individual credential URLs when available.
- Continue refining accessibility and page performance.
