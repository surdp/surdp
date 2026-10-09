# Suraj D P — Interactive Portfolio

A responsive, accessible static portfolio website showcasing business analysis, healthcare IT, quality engineering, browser automation, and software practice projects.

## Why this project

A portfolio makes it easier for recruiters, hiring managers, and collaborators to review professional focus, evidence of work, technical interests, and contact links in one place. This site combines a concise professional narrative with projects and downloadable role-focused resumes.

## What it includes

- Responsive desktop, tablet, and mobile layouts
- Interactive dark/light theme toggle with local preference saving
- Mobile navigation and smooth in-page links
- Filterable project cards
- Scroll-reveal effects, respecting reduced-motion preferences
- Project summaries linked to source repositories and the FocusFlow web app
- Business Analyst and Automation Engineer resume downloads
- GitHub, LinkedIn, Instagram, email, and WhatsApp links
- Semantic HTML, keyboard focus styles, and accessible control labels
- No framework or build step required

## Technology

HTML5, CSS3, vanilla JavaScript, Git, GitHub, and GitHub Pages.

## Run locally

Open index.html in a browser. Or run a local server in the project directory using:

    python -m http.server 8000

Then open http://localhost:8000.

## Publish with GitHub Pages

The site source is stored in the root of the surdp/surdp profile repository alongside the profile README and resume PDFs.

1. Open https://github.com/surdp/surdp.
2. Go to Settings, then Pages.
3. Under Build and deployment, choose Deploy from a branch.
4. Select branch main and folder /(root), then save.
5. Wait for deployment and open https://surdp.github.io/surdp/.
6. Test the theme toggle, filters, navigation, contact links, and PDF downloads on desktop and mobile.

GitHub Pages hosts static files for free. This project has no backend or database. Social icons are loaded from a public CDN.

## Content and accuracy

Professional history, tools, awards, and outcome figures are based on supplied profile/resume information and repository documentation. HL7, FHIR, and Revenue Cycle Management (RCM) are presented as learning areas rather than independent implementation experience. Improvement percentages are resume-reported figures.

## Privacy

The site exposes the supplied email address and WhatsApp number. Resume files are publicly accessible. Publish them only if you are comfortable sharing these details.

## Future improvements

- Add screenshots and short demos for projects
- Write deeper case studies describing problem, approach, choices, and results
- Add automated HTML and link checks through GitHub Actions
- Continue improving accessibility and performance
