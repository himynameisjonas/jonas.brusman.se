function triggerMasonary() {
  var elem = document.querySelector(".photos-grid");
  if (!elem) return;

  import("/js/masonry.pkgd.min.js").then(() => {
    new Masonry(elem, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-item",
      percentPosition: true,
    });
  });
}

async function initSwup() {
  const Swup = await import("swup");
  const SwupPreloadPlugin = await import("@swup/preload-plugin");

  const swup = new Swup.default({
    plugins: [new SwupPreloadPlugin.default()],
  });

  swup.hooks.on("page:view", () => {
    fetchHeartCounts();
    triggerMasonary();

    if (!window.goatcounter) return;
    window.goatcounter.count({
      path: location.pathname + location.search + location.hash,
    });
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
  initSwup();
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
