(() => {
  "use strict";

  const grid = document.getElementById("travelGalleryGrid");
  const empty = document.getElementById("travelGalleryEmpty");
  const emptyTitle = document.getElementById("travelGalleryEmptyTitle");
  const emptyText = document.getElementById("travelGalleryEmptyText");
  const photoButton = document.getElementById("travelPhotosButton");
  const videoButton = document.getElementById("travelVideosButton");
  const photoCountNode = document.getElementById("travelPhotoCount");
  const videoCountNode = document.getElementById("travelVideoCount");
  const viewer = document.getElementById("mediaViewer");
  const viewerTitle = document.getElementById("mediaViewerTitle");
  const viewerMeta = document.getElementById("mediaViewerMeta");
  const viewerStage = document.getElementById("mediaViewerStage");
  const closeButton = document.getElementById("mediaViewerClose");

  if (!grid || !empty || !viewer || !viewerTitle || !viewerMeta || !viewerStage) return;

  let travelMedia = [];
  let visibleMedia = [];
  let activeType = "image";

  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  const metaLine = item => [item.date, item.location].filter(Boolean).join(" · ");
  const visibleItems = () => travelMedia.filter(item => item.type === activeType);

  function syncButtons() {
    if (photoButton) {
      const active = activeType === "image";
      photoButton.classList.toggle("active", active);
      photoButton.setAttribute("aria-pressed", String(active));
    }
    if (videoButton) {
      const active = activeType === "video";
      videoButton.classList.toggle("active", active);
      videoButton.setAttribute("aria-pressed", String(active));
    }
  }

  function render() {
    visibleMedia = visibleItems();
    const photos = travelMedia.filter(item => item.type === "image");
    const videos = travelMedia.filter(item => item.type === "video");

    if (photoCountNode) photoCountNode.textContent = String(photos.length);
    if (videoCountNode) videoCountNode.textContent = String(videos.length);

    syncButtons();
    empty.hidden = visibleMedia.length > 0;
    grid.hidden = visibleMedia.length === 0;

    if (!visibleMedia.length) {
      if (emptyTitle) emptyTitle.textContent = activeType === "image"
        ? "Your travel photos will appear here."
        : "Your travel videos will appear here.";
      if (emptyText) emptyText.textContent = activeType === "image"
        ? "This is a separate gallery from your trip itineraries. Add your own photos to assets/gallery/photos and list them in assets/gallery/media-library.json."
        : "This is a separate gallery from your trip itineraries. Add your own videos to assets/gallery/videos and list them in assets/gallery/media-library.json.";
      return;
    }

    grid.innerHTML = visibleMedia.map((item, index) => {
      const title = esc(item.title || (item.type === "video" ? "Travel video" : "Travel photo"));
      const kind = item.type === "video" ? "VIDEO" : "PHOTO";
      const thumbnail = item.type === "video"
        ? (item.poster
          ? '<img src="' + esc(item.poster) + '" alt="" loading="lazy" decoding="async">'
          : '<div class="travel-thumb-placeholder"><span aria-hidden="true">▶</span><b>VIDEO</b></div>')
        : '<img src="' + esc(item.src) + '" alt="' + title + '" loading="lazy" decoding="async">';
      return '<article class="travel-card"><button type="button" class="travel-card-button" data-media-index="' + index + '" aria-label="Open ' + title + '">' +
        '<div class="travel-thumb">' + thumbnail + '<span class="travel-kind">' + kind + '</span></div>' +
        '<div class="travel-card-copy"><div class="travel-meta">' + esc(metaLine(item)) + '</div><h3>' + title + '</h3><p>' + esc(item.caption || "") + '</p></div></button></article>';
    }).join("");
  }

  function openMedia(item) {
    viewerTitle.textContent = item.title || (item.type === "video" ? "Travel video" : "Travel photo");
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
    const item = visibleMedia[Number(trigger.dataset.mediaIndex)];
    if (item) openMedia(item);
  });
  closeButton?.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("close", () => {
    const video = viewerStage.querySelector("video");
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    viewerStage.replaceChildren();
  });

  photoButton?.addEventListener("click", () => {
    activeType = "image";
    render();
  });
  videoButton?.addEventListener("click", () => {
    activeType = "video";
    render();
  });

  fetch("assets/gallery/media-library.json?v=20261009-1")
    .then(response => {
      if (!response.ok) throw new Error("Travel media manifest is not available.");
      return response.json();
    })
    .then(library => {
      const photos = Array.isArray(library.photos) ? library.photos : [];
      const videos = Array.isArray(library.videos) ? library.videos : [];
      travelMedia = photos.filter(item => item && item.src).map(item => Object.assign({}, item, {type:"image"}))
        .concat(videos.filter(item => item && item.src).map(item => Object.assign({}, item, {type:"video"})));
      render();
    })
    .catch(() => {
      travelMedia = [];
      render();
    });
})();