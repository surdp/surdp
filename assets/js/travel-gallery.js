(() => {
  "use strict";

  /*
   * Add real media below after uploading files into assets/gallery/.
   * Image entry:
   * { type: "image", src: "assets/gallery/ride-photo.jpg", title: "Western Ghats ride",
   *   date: "Month YYYY", location: "Place, India", caption: "Short description." }
   * Video entry:
   * { type: "video", src: "assets/gallery/ride-video.mp4", poster: "assets/gallery/ride-cover.jpg",
   *   title: "Weekend ride", date: "Month YYYY", location: "Place, India", caption: "Short description." }
   */
  const travelMedia = [];

  const grid = document.getElementById("travelGalleryGrid");
  const empty = document.getElementById("travelGalleryEmpty");
  const viewer = document.getElementById("mediaViewer");
  const viewerTitle = document.getElementById("mediaViewerTitle");
  const viewerMeta = document.getElementById("mediaViewerMeta");
  const viewerStage = document.getElementById("mediaViewerStage");
  const closeButton = document.getElementById("mediaViewerClose");
  if (!grid || !empty || !viewer || !viewerTitle || !viewerMeta || !viewerStage) return;

  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
  const metaLine = item => [item.date, item.location].filter(Boolean).join(" · ");

  function render() {
    empty.hidden = travelMedia.length > 0;
    grid.hidden = travelMedia.length === 0;
    if (!travelMedia.length) return;
    grid.innerHTML = travelMedia.map((item, index) => {
      const title = esc(item.title || "Travel memory");
      const type = item.type === "video" ? "VIDEO" : "PHOTO";
      const thumbnail = item.type === "video"
        ? (item.poster ? '<img src="' + esc(item.poster) + '" alt="" loading="lazy">' :
          '<div class="travel-thumb-placeholder"><span aria-hidden="true">▶</span><b>VIDEO</b></div>')
        : '<img src="' + esc(item.src) + '" alt="' + title + '" loading="lazy">';
      return '<article class="travel-card"><button type="button" class="travel-card-button" data-media-index="' + index + '" aria-label="Open ' + title + '">' +
        '<div class="travel-thumb">' + thumbnail + '<span class="travel-kind">' + type + '</span></div>' +
        '<div class="travel-card-copy"><div class="travel-meta">' + esc(metaLine(item)) + '</div><h3>' + title + '</h3><p>' + esc(item.caption || "") + '</p></div></button></article>';
    }).join("");
  }

  function openMedia(item) {
    viewerTitle.textContent = item.title || "Travel memory";
    viewerMeta.textContent = metaLine(item) || item.caption || "";
    viewerStage.replaceChildren();
    if (item.type === "video") {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      if (item.poster) video.poster = item.poster;
      video.src = item.src;
      viewerStage.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title || "Travel photo";
      viewerStage.appendChild(img);
    }
    if (!viewer.open) viewer.showModal();
  }

  grid.addEventListener("click", event => {
    const trigger = event.target.closest("[data-media-index]");
    if (!trigger) return;
    const item = travelMedia[Number(trigger.dataset.mediaIndex)];
    if (item) openMedia(item);
  });
  closeButton?.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("close", () => {
    const video = viewerStage.querySelector("video");
    if (video) { video.pause(); video.removeAttribute("src"); video.load(); }
    viewerStage.replaceChildren();
  });

  render();
})();