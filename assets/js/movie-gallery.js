(() => {
  "use strict";

  const root = document.getElementById("movieGalleryGrid");
  if (!root) return;

  const search = document.getElementById("movieSearch");
  const results = document.getElementById("movieResultsCount");
  const empty = document.getElementById("movieGalleryEmpty");
  const setup = document.getElementById("movieGallerySetup");
  const loadMore = document.getElementById("movieLoadMore");
  const totalNode = document.getElementById("movieTotal");
  const photoNode = document.getElementById("moviePhotoCount");
  const videoNode = document.getElementById("movieVideoCount");
  const identifiedNode = document.getElementById("movieIdentifiedCount");
  const typeButtons = Array.from(document.querySelectorAll("[data-movie-filter]"));
  const batchSize = 48;
  let allItems = [];
  let activeType = "all";
  let visibleCount = batchSize;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function itemLabel(item) {
    const filename = item.filename || (item.src || "").split("/").pop() || "Media file";
    if (item.titleIdentified && item.title) return item.title;
    return (item.type === "video" ? "Video" : "Photo") + " — " + filename;
  }

  function itemCard(item) {
    const title = itemLabel(item);
    const src = esc(item.src || "");
    const name = esc(title);
    const filename = esc(item.filename || "");
    const status = item.titleIdentified
      ? '<span class="movie-review-status is-identified">TITLE IDENTIFIED</span>'
      : '<span class="movie-review-status">TITLE TO REVIEW</span>';
    let media = "";
    if (item.type === "video") {
      media = '<video class="movie-media-video" controls preload="none" playsinline aria-label="' + name + '"><source src="' + src + '" type="video/mp4">Your browser does not support HTML video.</video>';
    } else {
      media = '<a class="movie-media-open" href="' + src + '" target="_blank" rel="noopener noreferrer" aria-label="Open full image for ' + name + '"><img src="' + src + '" loading="lazy" decoding="async" alt="' + name + '" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'movie-image-failed\')"><span class="movie-image-fallback" aria-hidden="true">IMAGE PREVIEW UNAVAILABLE</span><span class="movie-open-hint">Open image ↗</span></a>';
    }
    return '<article class="movie-media-card">' +
      '<div class="movie-media-frame">' + media +
      '<span class="movie-kind">' + (item.type === "video" ? "VIDEO" : "PHOTO") + '</span></div>' +
      '<div class="movie-media-copy"><h3 title="' + name + '">' + name + '</h3>' +
      '<p class="movie-original-name" title="' + filename + '">' + filename + '</p>' +
      status + '</div></article>';
  }

  function getFilteredItems() {
    const query = (search && search.value ? search.value : "").trim().toLowerCase();
    return allItems.filter(function (item) {
      const identified = Boolean(item.titleIdentified && item.title);
      const matchesType = activeType === "all" ||
        (activeType === "photo" && item.type === "photo") ||
        (activeType === "video" && item.type === "video") ||
        (activeType === "identified" && identified) ||
        (activeType === "review" && !identified);
      const haystack = [item.title, item.filename, item.sourceRelativePath, item.type, item.reviewStatus]
        .join(" ").toLowerCase();
      return matchesType && (!query || haystack.includes(query));
    });
  }

  function render() {
    const filtered = getFilteredItems();
    const visible = filtered.slice(0, visibleCount);
    root.innerHTML = visible.map(itemCard).join("");
    root.hidden = visible.length === 0;
    if (empty) empty.hidden = visible.length !== 0;
    if (results) {
      results.textContent = "Showing " + visible.length + " of " + filtered.length +
        " results · " + allItems.length + " total media files";
    }
    if (loadMore) {
      loadMore.hidden = visible.length >= filtered.length;
      loadMore.textContent = "Load more (" + (filtered.length - visible.length) + " remaining) ↓";
    }
    if (setup) setup.hidden = true;
  }

  typeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeType = button.dataset.movieFilter || "all";
      typeButtons.forEach(function (other) {
        const selected = other === button;
        other.classList.toggle("active", selected);
        other.setAttribute("aria-pressed", String(selected));
      });
      visibleCount = batchSize;
      render();
    });
  });

  if (search) search.addEventListener("input", function () {
    visibleCount = batchSize;
    render();
  });

  if (loadMore) loadMore.addEventListener("click", function () {
    visibleCount += batchSize;
    render();
  });

  fetch("assets/movies/media-library.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Media library is not installed yet.");
      return response.json();
    })
    .then(function (library) {
      const photos = Array.isArray(library.photos) ? library.photos : [];
      const videos = Array.isArray(library.videos) ? library.videos : [];
      allItems = photos.concat(videos).filter(function (item) {
        return item && item.src && (item.type === "photo" || item.type === "video");
      });
      allItems.sort(function (a, b) {
        return String(a.id || a.imageId || a.videoId || a.filename).localeCompare(
          String(b.id || b.imageId || b.videoId || b.filename), undefined, {numeric:true}
        );
      });
      if (totalNode) totalNode.textContent = String(allItems.length);
      if (photoNode) photoNode.textContent = String(photos.length);
      if (videoNode) videoNode.textContent = String(videos.length);
      if (identifiedNode) identifiedNode.textContent = String(allItems.filter(function (item) {
        return Boolean(item.titleIdentified && item.title);
      }).length);
      if (setup) setup.hidden = true;
      render();
    })
    .catch(function () {
      root.hidden = true;
      if (setup) setup.hidden = false;
      if (results) results.textContent = "Media library not installed yet";
    });
})();