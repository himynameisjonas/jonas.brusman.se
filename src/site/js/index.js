async function triggerMasonary() {
  var elem = document.querySelector(".photos-grid");
  if (!elem) return;

  const Masonry = await import("masonry-layout").then((m) => m.default);

  new Masonry(elem, {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
    percentPosition: true,
  });
}

function fetchHeartCounts() {
  for (const oh of document.querySelectorAll("open-heart")) {
    oh.getCount();
  }
}

async function initOpenHeart() {
  await import("/js/open_heart_element.js");
  window.customElements.whenDefined("open-heart").then(() => {
    fetchHeartCounts();
  });

  window.addEventListener("open-heart", (e) => {
    e && e.target && e.target.getCount && e.target.getCount();
  });
}

function init() {
  triggerMasonary();
  initOpenHeart();
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
