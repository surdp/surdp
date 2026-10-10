(() => {
  "use strict";

  const dialog = document.getElementById("resumePreviewDialog");
  const stage = document.getElementById("resumePreviewStage");
  const title = document.getElementById("resumePreviewTitle");
  const closeButton = document.getElementById("resumePreviewClose");
  if (!dialog || !stage || !title || !closeButton) return;

  const CONTACT_MESSAGE = "Need a tailored, professionally presented resume for a hiring opportunity? Reach out and I’ll share a version suited to the role.";
  const PDF_JS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
  const PDF_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  let pdfJsPromise = null;
  let renderToken = 0;
  let currentLoadingTask = null;
  let currentPdf = null;

  function loadPdfJs() {
    if (window.pdfjsLib && typeof window.pdfjsLib.getDocument === "function") {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
      return Promise.resolve(window.pdfjsLib);
    }
    if (pdfJsPromise) return pdfJsPromise;
    pdfJsPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PDF_JS_SRC;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (!window.pdfjsLib || typeof window.pdfjsLib.getDocument !== "function") {
          reject(new Error("The PDF preview library did not initialise."));
          return;
        }
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("The PDF preview library could not be loaded."));
      document.head.appendChild(script);
    });
    return pdfJsPromise;
  }

  function statusMessage(message, isError = false) {
    stage.replaceChildren();
    const status = document.createElement("p");
    status.className = "resume-preview-status" + (isError ? " is-error" : "");
    status.setAttribute("role", "status");
    status.textContent = message;
    stage.appendChild(status);
  }

  function appendContactFooter() {
    const footer = document.createElement("div");
    footer.className = "resume-preview-contact";
    const copy = document.createElement("p");
    copy.textContent = CONTACT_MESSAGE;
    const contact = document.createElement("a");
    contact.className = "button primary";
    contact.href = "mailto:suraj.dp412@gmail.com?subject=Resume%20request";
    contact.textContent = "Reach out about a resume ↗";
    footer.append(copy, contact);
    stage.appendChild(footer);
  }

  async function renderResume(source, resumeTitle) {
    const token = ++renderToken;
    title.textContent = resumeTitle;
    if (!dialog.open) dialog.showModal();
    statusMessage("Preparing the resume preview…");

    try {
      const pdfjs = await loadPdfJs();
      if (token !== renderToken) return;
      if (currentLoadingTask && typeof currentLoadingTask.destroy === "function") {
        try { await currentLoadingTask.destroy(); } catch (_) { /* Previous preview already closed. */ }
      }
      if (currentPdf && typeof currentPdf.destroy === "function") {
        try { await currentPdf.destroy(); } catch (_) { /* Previous preview already closed. */ }
      }
      currentPdf = null;
      currentLoadingTask = pdfjs.getDocument({url: source});
      const pdf = await currentLoadingTask.promise;
      if (token !== renderToken) {
        try { await pdf.destroy(); } catch (_) { /* Stale render. */ }
        return;
      }
      currentPdf = pdf;
      stage.replaceChildren();

      const intro = document.createElement("p");
      intro.className = "resume-preview-render-note";
      intro.textContent = pdf.numPages + (pdf.numPages === 1 ? " page" : " pages") + " · Image-based preview";
      stage.appendChild(intro);

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        if (token !== renderToken) return;
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({scale: 1});
        const stageWidth = Math.max(320, stage.getBoundingClientRect().width || stage.clientWidth || 900);
        const fitWidth = Math.max(280, Math.min(stageWidth - 64, 960));
        const scale = Math.min(1.5, fitWidth / baseViewport.width);
        const viewport = page.getViewport({scale});
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);
        const canvas = document.createElement("canvas");
        canvas.className = "resume-preview-canvas";
        canvas.width = Math.ceil(viewport.width * pixelRatio);
        canvas.height = Math.ceil(viewport.height * pixelRatio);
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        canvas.setAttribute("role", "img");
        canvas.setAttribute("aria-label", resumeTitle + ", page " + pageNumber);
        canvas.draggable = false;
        const context = canvas.getContext("2d", {alpha: false});
        if (!context) throw new Error("Canvas rendering is unavailable in this browser.");
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        await page.render({canvasContext: context, viewport}).promise;
        if (token !== renderToken) return;

        const pageWrap = document.createElement("div");
        pageWrap.className = "resume-preview-page";
        pageWrap.appendChild(canvas);
        const pageCaption = document.createElement("span");
        pageCaption.className = "resume-preview-page-number";
        pageCaption.textContent = "PAGE " + String(pageNumber).padStart(2, "0");
        pageWrap.appendChild(pageCaption);
        stage.appendChild(pageWrap);
      }
      if (token === renderToken) appendContactFooter();
    } catch (error) {
      if (token !== renderToken) return;
      statusMessage("The preview could not be loaded. Please try again, or reach out by email for this resume.", true);
      const contact = document.createElement("a");
      contact.className = "button primary resume-preview-error-contact";
      contact.href = "mailto:suraj.dp412@gmail.com?subject=Resume%20request";
      contact.textContent = "Contact me about this resume ↗";
      stage.appendChild(contact);
    }
  }

  function openResumeCard(card) {
    const source = card.dataset.resumeSrc;
    const resumeTitle = card.dataset.resumeTitle || "Resume preview";
    if (!source || !/\.pdf$/i.test(source)) return;
    renderResume(source, resumeTitle);
  }

  document.querySelectorAll("[data-resume-card]").forEach(card => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-controls", "resumePreviewDialog");
    card.setAttribute("aria-label", "Open " + (card.dataset.resumeTitle || "resume"));
    card.addEventListener("click", () => openResumeCard(card));
    card.addEventListener("keydown", event => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openResumeCard(card);
      }
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", async () => {
    renderToken += 1;
    if (currentLoadingTask && typeof currentLoadingTask.destroy === "function") {
      try { await currentLoadingTask.destroy(); } catch (_) { /* Already closed. */ }
    }
    if (currentPdf && typeof currentPdf.destroy === "function") {
      try { await currentPdf.destroy(); } catch (_) { /* Already closed. */ }
    }
    currentLoadingTask = null;
    currentPdf = null;
    stage.replaceChildren();
    const note = document.createElement("p");
    note.className = "resume-preview-status";
    note.textContent = "Choose a resume to preview.";
    stage.appendChild(note);
  });
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  ["contextmenu", "copy", "cut", "paste", "dragstart", "selectstart"].forEach(type => {
    dialog.addEventListener(type, event => event.preventDefault());
  });
  dialog.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && ["c", "x", "v", "p", "s", "a"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
})();