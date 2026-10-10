(() => {
  "use strict";
  const triggers = document.querySelectorAll("[data-award-details]");
  const dialog = document.getElementById("awardPreviewDialog");
  const kind = document.getElementById("awardPreviewKind");
  const title = document.getElementById("awardPreviewTitle");
  const subtitle = document.getElementById("awardPreviewSubtitle");
  const summary = document.getElementById("awardPreviewSummary");
  const contributionBlock = document.getElementById("awardPreviewContributionBlock");
  const contribution = document.getElementById("awardPreviewContribution");
  const focusBlock = document.getElementById("awardPreviewFocusBlock");
  const tags = document.getElementById("awardPreviewTags");
  const evidenceWrap = document.getElementById("awardPreviewEvidenceWrap");
  const image = document.getElementById("awardPreviewImage");
  const closeButton = document.getElementById("awardPreviewClose");
  if (!triggers.length || !dialog || !title || !summary || !image) return;
  let activeTrigger = null;

  function renderFocusAreas(value) {
    tags.replaceChildren();
    const items = (value || "").split("|").map(item => item.trim()).filter(Boolean);
    items.forEach(item => {
      const tag = document.createElement("span");
      tag.textContent = item;
      tags.appendChild(tag);
    });
    focusBlock.hidden = items.length === 0;
  }

  function openAward(trigger) {
    activeTrigger = trigger;
    kind.textContent = trigger.dataset.awardKind || "Recognition";
    title.textContent = trigger.dataset.awardTitle || "Recognition detail";
    subtitle.textContent = trigger.dataset.awardPeriod || "Recognition context";
    summary.textContent = trigger.dataset.awardSummary || trigger.querySelector("p")?.textContent || "";
    const contributionText = (trigger.dataset.awardContribution || "").trim();
    contribution.textContent = contributionText;
    contributionBlock.hidden = !contributionText;
    renderFocusAreas(trigger.dataset.awardFocus);

    const imagePath = (trigger.dataset.awardImage || "").trim();
    if (imagePath) {
      image.alt = title.textContent + " evidence";
      image.src = imagePath;
      evidenceWrap.hidden = false;
      dialog.classList.add("has-evidence");
    } else {
      image.removeAttribute("src");
      image.alt = "";
      evidenceWrap.hidden = true;
      dialog.classList.remove("has-evidence");
    }
    if (!dialog.open) dialog.showModal();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => openAward(trigger));
    trigger.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openAward(trigger);
      }
    });
  });

  closeButton?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    image.alt = "";
    dialog.classList.remove("has-evidence");
    if (activeTrigger?.isConnected) activeTrigger.focus({preventScroll:true});
    activeTrigger = null;
  });
})();