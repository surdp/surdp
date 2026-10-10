(() => {
  "use strict";
  const grid = document.getElementById("movieGalleryGrid");
  const setup = document.getElementById("movieGallerySetup");
  const empty = document.getElementById("movieGalleryEmpty");
  const loadMore = document.getElementById("movieLoadMore");
  const photoButton = document.getElementById("moviePhotosButton");
  const videoButton = document.getElementById("movieVideosButton");
  const photoCount = document.getElementById("moviePhotoCount");
  const videoCount = document.getElementById("movieVideoCount");
  const initialBatchSize = 24;
  const loadMoreBatchSize = 12;
  const shapePattern = [
    "feature", "wide", "small", "landscape", "large", "wide",
    "feature", "small", "landscape", "wide", "large", "small",
    "wide", "landscape", "feature", "small", "large", "wide",
    "landscape", "small", "wide", "feature", "large", "landscape"
  ];
  let photos = [];
  let videos = [];
  let activeType = "photo";
  const visibleCounts = { photo: initialBatchSize, video: initialBatchSize };
  if (!grid) return;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function shapeFor(index, item) {
    const offset = item.type === "video" ? 3 : 0;
    return shapePattern[(index * 7 + offset) % shapePattern.length];
  }

  function card(item, index) {
    const label = (item.type === "video" ? "Video " : "Photo ") + String(index + 1);
    const src = esc(item.src || "");
    const shape = shapeFor(index, item);
    if (item.type === "video") {
      return '<article class="movie-media-card movie-video-card" data-shape="' + shape + '">' +
        '<div class="movie-media-frame"><video class="movie-media-video" controls preload="metadata" playsinline aria-label="' + label + '">' +
        '<source src="' + src + '" type="video/mp4">Your browser does not support HTML video.</video>' +
        '<span class="movie-cinema-badge" aria-hidden="true">▶ FILM</span></div></article>';
    }
    return '<article class="movie-media-card movie-photo-card" data-shape="' + shape + '"><a class="movie-media-open" href="' + src +
      '" target="_blank" rel="noopener noreferrer" aria-label="Open photo ' + String(index + 1) +
      ' in a new tab"><div class="movie-media-frame"><img src="' + src +
      '" loading="lazy" decoding="async" alt="Photo ' + String(index + 1) +
      '" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'movie-image-failed\')">' +
      '<span class="movie-image-fallback" aria-hidden="true">IMAGE UNAVAILABLE</span>' +
      '<span class="movie-open-hint" aria-hidden="true">VIEW FRAME ↗</span></div></a></article>';
  }

  function setActiveButtons() {
    if (photoButton) {
      const active = activeType === "photo";
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
    const items = activeType === "photo" ? photos : videos;
    const visibleCount = visibleCounts[activeType];
    const visible = items.slice(0, visibleCount);
    grid.innerHTML = visible.map(card).join("");
    grid.hidden = visible.length === 0;
    if (empty) empty.hidden = items.length !== 0;
    if (loadMore) {
      loadMore.hidden = visible.length >= items.length;
      const remaining = Math.max(0, items.length - visible.length);
      loadMore.textContent = "Load more " + (activeType === "photo" ? "photos" : "videos") +
        (remaining ? " · " + Math.min(loadMoreBatchSize, remaining) + " more" : "");
      loadMore.setAttribute("aria-label", "Load more " + (activeType === "photo" ? "photos" : "videos"));
    }
    setActiveButtons();
  }

  if (photoButton) photoButton.addEventListener("click", function () {
    activeType = "photo";
    render();
  });
  if (videoButton) videoButton.addEventListener("click", function () {
    activeType = "video";
    render();
  });
  if (loadMore) loadMore.addEventListener("click", function () {
    visibleCounts[activeType] += loadMoreBatchSize;
    render();
  });

  fetch("assets/movies/media-library.json?v=20261010-titleband-mosaic-v1")
    .then(function (response) {
      if (!response.ok) throw new Error("Media library is not available.");
      return response.json();
    })
    .then(function (library) {
      photos = Array.isArray(library.photos) ? library.photos.filter(function (item) {
        return item && item.type === "photo" && item.src;
      }) : [];
      videos = Array.isArray(library.videos) ? library.videos.filter(function (item) {
        return item && item.type === "video" && item.src;
      }) : [];
      if (photoCount) photoCount.textContent = String(photos.length);
      if (videoCount) videoCount.textContent = String(videos.length);
      if (setup) setup.hidden = true;
      if (empty) empty.hidden = true;
      render();
    })
    .catch(function () {
      grid.hidden = true;
      if (empty) empty.hidden = true;
      if (setup) setup.hidden = false;
      if (loadMore) loadMore.hidden = true;
      if (photoCount) photoCount.textContent = "—";
      if (videoCount) videoCount.textContent = "—";
    });
})();