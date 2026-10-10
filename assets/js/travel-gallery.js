(() => {
  "use strict";

  const grid = document.getElementById("travelGalleryGrid");
  const empty = document.getElementById("travelGalleryEmpty");
  const emptyTitle = document.getElementById("travelGalleryEmptyTitle");
  const emptyText = document.getElementById("travelGalleryEmptyText");
  const wallCount = document.getElementById("travelWallCount");
  const loadMoreButton = document.getElementById("travelGalleryLoadMore");
  const viewer = document.getElementById("mediaViewer");
  const viewerTitle = document.getElementById("mediaViewerTitle");
  const viewerMeta = document.getElementById("mediaViewerMeta");
  const viewerStage = document.getElementById("mediaViewerStage");
  const closeButton = document.getElementById("mediaViewerClose");
  const previousButton = document.getElementById("travelPreviousMemory");
  const nextButton = document.getElementById("travelNextMemory");
  const rotateLeftButton = document.getElementById("travelRotateLeft");
  const rotateRightButton = document.getElementById("travelRotateRight");
  const resetRotationButton = document.getElementById("travelResetRotation");

  if (!grid || !empty || !viewer || !viewerTitle || !viewerMeta || !viewerStage) return;

  let allMedia = [];
  let currentIndex = -1;
  let currentRotation = 0;
  let currentType = "image";

  const shapePattern = [
    "feature","square","wide","tall","square","small","wide","square",
    "tall","feature","square","landscape","small","square","wide","tall",
    "square","landscape","small","feature","square","wide","tall","square",
    "small","wide","square","portrait","landscape","square","feature","small"
  ];

  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  function stableHash(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mixMedia(photos, videos) {
    const normalize = (items, type) => items
      .filter(item => item && item.src)
      .map(item => Object.assign({}, item, {type, _stableOrder:stableHash(String(item.filename || item.src))}))
      .sort((a,b) => a._stableOrder - b._stableOrder);

    const orderedPhotos = normalize(photos, "image");
    const orderedVideos = normalize(videos, "video");
    const merged = [];
    let pi = 0, vi = 0;

    while (pi < orderedPhotos.length || vi < orderedVideos.length) {
      const photoPosition = orderedPhotos.length ? (pi + 0.5) / orderedPhotos.length : Infinity;
      const videoPosition = orderedVideos.length ? (vi + 0.5) / orderedVideos.length : Infinity;
      if (videoPosition <= photoPosition && vi < orderedVideos.length) {
        merged.push(orderedVideos[vi++]);
      } else if (pi < orderedPhotos.length) {
        merged.push(orderedPhotos[pi++]);
      } else if (vi < orderedVideos.length) {
        merged.push(orderedVideos[vi++]);
      }
    }
    return merged;
  }

  function shapeFor(index, item) {
    // Give video tiles a range of sizes too; the play marker makes them recognisable.
    return shapePattern[(index * 7 + (item.type === "video" ? 3 : 0)) % shapePattern.length];
  }

  function tileMarkup(item, index) {
    const label = item.title || item.filename || (item.type === "video" ? "Travel video" : "Travel photo");
    const shape = shapeFor(index, item);
    let media = "";
    if (item.type === "video") {
      const poster = item.poster ? ' poster="' + esc(item.poster) + '"' : "";
      media = '<video class="travel-wall-video" muted playsinline preload="metadata"' + poster +
        ' aria-label="' + esc(label) + '"><source src="' + esc(item.src) +
        '"></video><span class="travel-wall-video-badge" aria-hidden="true">▶</span>';
    } else {
      media = '<img class="travel-wall-image" src="' + esc(item.src) + '" loading="lazy" decoding="async" alt="' +
        esc(label) + '" onerror="this.parentElement.parentElement.classList.add(\'media-load-failed\')">';
    }
    return '<button type="button" class="travel-wall-item" data-media-index="' + index +
      '" data-shape="' + shape + '" data-type="' + item.type +
      '" aria-label="Open ' + esc(item.type === "video" ? "video" : "photo") + ' ' + (index + 1) + ': ' +
      esc(label) + '"><span class="travel-wall-frame">' + media +
      '<span class="travel-wall-fallback" aria-hidden="true">MEDIA UNAVAILABLE</span></span></button>';
  }

  function updateRotationButtons() {
    const isVideo = currentType === "video";
    [rotateLeftButton, rotateRightButton, resetRotationButton].forEach(button => {
      if (button) {
        button.disabled = isVideo;
        button.title = isVideo ? "Rotation is available for photos" : "";
      }
    });
    if (previousButton) previousButton.disabled = allMedia.length < 2;
    if (nextButton) nextButton.disabled = allMedia.length < 2;
  }

  const PAGE_SIZE = 18;
  let visibleCount = PAGE_SIZE;
  let renderedCount = 0;

  function renderWall(append = false) {
    if (!allMedia.length) {
      grid.hidden = true;
      empty.hidden = false;
      if (emptyTitle) emptyTitle.textContent = "Your travel memories will appear here.";
      if (emptyText) emptyText.textContent = "Photos and videos will appear here as they are added to the travel collection.";
      if (wallCount) wallCount.textContent = "No travel memories yet";
      if (loadMoreButton) loadMoreButton.hidden = true;
      return;
    }
    empty.hidden = true;
    grid.hidden = false;
    const nextCount = Math.min(visibleCount, allMedia.length);
    if (!append) {
      grid.innerHTML = "";
      renderedCount = 0;
    }
    if (nextCount > renderedCount) {
      grid.insertAdjacentHTML("beforeend", allMedia.slice(renderedCount, nextCount).map(tileMarkup).join(""));
      renderedCount = nextCount;
    }
    if (wallCount) wallCount.textContent = "Showing " + renderedCount + " of " + allMedia.length + " travel memories";
    if (loadMoreButton) {
      loadMoreButton.hidden = renderedCount >= allMedia.length;
      if (!loadMoreButton.hidden) loadMoreButton.textContent = "Load more memories · " + (allMedia.length - renderedCount) + " left";
    }
  }

  function applyImageRotation() {
    const img = viewerStage.querySelector(".travel-viewer-image");
    if (!img) return;
    const quarterTurn = Math.abs(currentRotation % 180) === 90;
    img.style.transform = "rotate(" + currentRotation + "deg)";
    img.classList.toggle("is-rotated-sideways", quarterTurn);
    img.setAttribute("data-rotation", String(currentRotation));
  }

  function openMedia(index) {
    if (!allMedia.length) return;
    currentIndex = (index + allMedia.length) % allMedia.length;
    const item = allMedia[currentIndex];
    currentType = item.type;
    currentRotation = 0;
    viewerTitle.textContent = item.title || (item.type === "video" ? "Travel video" : "Travel photo");
    viewerMeta.textContent = (currentIndex + 1) + " of " + allMedia.length + " · " +
      (item.filename || (item.type === "video" ? "Video" : "Photo")) +
      (item.location ? " · " + item.location : "") +
      (item.date ? " · " + item.date : "");
    viewerStage.replaceChildren();

    if (item.type === "video") {
      const video = document.createElement("video");
      video.className = "travel-viewer-video";
      video.controls = true;
      video.playsInline = true;
      video.preload = "auto";
      video.autoplay = false;
      video.src = item.src;
      if (item.poster) video.poster = item.poster;
      viewerStage.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.className = "travel-viewer-image";
      img.src = item.src;
      img.alt = item.title || item.filename || "Travel photo";
      img.draggable = false;
      viewerStage.appendChild(img);
      applyImageRotation();
    }

    updateRotationButtons();
    if (!viewer.open) viewer.showModal();
  }

  function rotateBy(degrees) {
    if (currentType === "video") return;
    currentRotation = (currentRotation + degrees + 360) % 360;
    applyImageRotation();
  }

  grid.addEventListener("click", event => {
    const trigger = event.target.closest("[data-media-index]");
    if (!trigger) return;
    openMedia(Number(trigger.dataset.mediaIndex));
  });

  loadMoreButton?.addEventListener("click", () => {
    if (renderedCount >= allMedia.length) return;
    visibleCount = Math.min(renderedCount + PAGE_SIZE, allMedia.length);
    renderWall(true);
  });

  closeButton?.addEventListener("click", () => viewer.close());
  previousButton?.addEventListener("click", () => openMedia(currentIndex - 1));
  nextButton?.addEventListener("click", () => openMedia(currentIndex + 1));
  rotateLeftButton?.addEventListener("click", () => rotateBy(-90));
  rotateRightButton?.addEventListener("click", () => rotateBy(90));
  resetRotationButton?.addEventListener("click", () => {
    currentRotation = 0;
    applyImageRotation();
  });

  viewer.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      openMedia(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      openMedia(currentIndex + 1);
    } else if ((event.key === "r" || event.key === "R") && currentType !== "video") {
      event.preventDefault();
      rotateBy(90);
    }
  });

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
    currentRotation = 0;
    currentIndex = -1;
  });

  fetch("assets/gallery/media-library.json?v=20261010-lazy-gallery-v1")
    .then(response => {
      if (!response.ok) throw new Error("Travel media manifest is not available.");
      return response.json();
    })
    .then(library => {
      allMedia = mixMedia(
        Array.isArray(library.photos) ? library.photos : [],
        Array.isArray(library.videos) ? library.videos : []
      );
      renderWall();
    })
    .catch(() => {
      allMedia = [];
      renderWall();
    });
})();