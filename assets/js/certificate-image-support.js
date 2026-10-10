(() => {
  "use strict";

  const certificateImages = {
    "Claude 101": "assets/certificates/images/claude-101.jpg",
    "Claude Code in Action": "assets/certificates/images/claude-code-in-action.jpg",
    "Get Started with Google Workspace Tools Skill Badge": "assets/certificates/images/get-started-with-google-workspace-tools-skill-badge.jpg",
    "Career Essentials in Cybersecurity by Microsoft and LinkedIn": "assets/certificates/images/career-essentials-in-cybersecurity-by-microsoft-and-linkedin.png",
    "LambdaTest Software Testing Professional Certificate": "assets/certificates/images/lambdatest-software-testing-professional-certificate.png",
    "Digital Transformation in Practice: Virtual Collaboration Tools": "assets/certificates/images/digital-transformation-in-practice-virtual-collaboration-tools.png"
  };

  const grid = document.getElementById("credentialGrid");
  const dialog = document.getElementById("certificatePreviewDialog");
  const title = document.getElementById("certificatePreviewTitle");
  const issuer = document.getElementById("certificatePreviewIssuer");
  const frame = document.getElementById("certificatePreviewFrame");
  const image = document.getElementById("certificatePreviewImage");

  if (!grid) return;

  function addImagePreviewButtons() {
    grid.querySelectorAll(".credential-card").forEach(card => {
      const cardTitle = card.querySelector("h3")?.textContent.trim();
      const imagePath = certificateImages[cardTitle];
      const placeholder = card.querySelector(".credential-unavailable");
      if (!imagePath || !placeholder) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "credential-preview-link";
      button.dataset.certificateImage = imagePath;
      button.dataset.certificateTitle = cardTitle;
      button.dataset.certificateIssuer =
        card.querySelector(".credential-issuer")?.textContent.trim() || "";
      button.textContent = "Preview image ↗";
      placeholder.replaceWith(button);
    });
  }

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-certificate-image]");
    if (!button || !dialog || !title || !issuer || !frame) return;

    title.textContent = button.dataset.certificateTitle || "Certificate preview";
    issuer.textContent = button.dataset.certificateIssuer || "";
    const imagePath = button.dataset.certificateImage || "about:blank";
    const phoneLayout = typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 850px), (orientation: landscape) and (max-width: 1200px) and (max-height: 750px)").matches;

    if (phoneLayout && image) {
      frame.src = "about:blank";
      frame.hidden = true;
      image.src = imagePath;
      image.alt = (title.textContent || "Certificate") + " image";
      image.hidden = false;
    } else {
      if (image) {
        image.hidden = true;
        image.removeAttribute("src");
      }
      frame.hidden = false;
      frame.title = "Certificate image preview";
      frame.src = imagePath;
    }
    if (!dialog.open) dialog.showModal();
  });

  if (dialog && frame) {
    dialog.addEventListener("close", () => {
      frame.title = "Certificate PDF preview";
      frame.hidden = false;
      if (image) {
        image.hidden = true;
        image.removeAttribute("src");
        image.alt = "Certificate image preview";
      }
    });
  }

  // The credentials script replaces the grid when users search or change filters.
  // Observe those changes so all six image previews remain available after filtering.
  const observer = new MutationObserver(addImagePreviewButtons);
  observer.observe(grid, { childList: true, subtree: true });
  addImagePreviewButtons();
})();
