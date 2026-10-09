(() => {
  "use strict";

  const triggers = document.querySelectorAll("[data-award-image]");
  const dialog = document.getElementById("awardPreviewDialog");
  const title = document.getElementById("awardPreviewTitle");
  const image = document.getElementById("awardPreviewImage");
  const closeButton = document.getElementById("awardPreviewClose");

  if (!triggers.length || !dialog || !title || !image) return;

  function openAward(trigger) {
    title.textContent = trigger.dataset.awardTitle || "Award recognition";
    image.alt = title.textContent;
    image.src = trigger.dataset.awardImage || "";
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
  });
})();
