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
  const batchSize = 48;
  let photos = [];
  let videos = [];
  let activeType = "photo";
  let visibleCount = batchSize;

  if (!grid) return;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function card(item, index) {
    const label = (item.type === "video" ? "Video " : "Photo ") + String(index + 1);
    const src = esc(item.src || "");
    if (item.type === "video") {
      return '<article class="movie-media-card movie-video-card"><div class="movie-media-frame">' +
        '<video class="movie-media-video" controls preload="metadata" playsinline aria-label="' + label + '">' +
        '<source src="' + src + '" type="video/mp4">Your browser does not support HTML video.</video></div></article>';
    }
    return '<article class="movie-media-card movie-photo-card"><a class="movie-media-open" href="' + src +
      '" target="_blank" rel="noopener noreferrer" aria-label="Open photo ' + String(index + 1) +
      ' in a new tab"><div class="movie-media-frame"><img src="' + src +
      '" loading="lazy" decoding="async" alt="Photo ' + String(index + 1) +
      '" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'movie-image-failed\')">' +
      '<span class="movie-image-fallback" aria-hidden="true">IMAGE UNAVAILABLE</span>' +
      '<span class="movie-open-hint" aria-hidden="true">Open photo ↗</span></div></a></article>';
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
    const visible = items.slice(0, visibleCount);
    grid.innerHTML = visible.map(card).join("");
    grid.hidden = visible.length === 0;
    if (empty) empty.hidden = items.length !== 0;
    if (loadMore) {
      loadMore.hidden = visible.length >= items.length;
      loadMore.textContent = "Load more " + (activeType === "photo" ? "photos" : "videos") +
        " (" + (items.length - visible.length) + " remaining)";
    }
    setActiveButtons();
  }

  if (photoButton) photoButton.addEventListener("click", function () {
    activeType = "photo";
    visibleCount = batchSize;
    render();
  });
  if (videoButton) videoButton.addEventListener("click", function () {
    activeType = "video";
    visibleCount = batchSize;
    render();
  });
  if (loadMore) loadMore.addEventListener("click", function () {
    visibleCount += batchSize;
    render();
  });

  fetch("assets/movies/media-library.json?v=1")
    .then(function (response) {
      if (!response.ok) throw new Error("Media library is not installed.");
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