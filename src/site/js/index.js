import { listen } from "quicklink";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const lightbox = new PhotoSwipeLightbox({
  gallery: ".js-gallery",
  children: "a",
  pswpModule: () => import("photoswipe"),
});
lightbox.init();

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

async function initMastodonPost() {
  await import("/js/mastodon_post.js");
}

function initQuicklink() {
  listen({
    throttle: 5,
    limit: 10,
    ignores: [/\/bookmarks\//],
  });
}

function initInfiniteScroll() {
  const loadMore = document.querySelector(".js-photos-next");
  if (!loadMore) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const url = loadMore.getAttribute("href");
        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, "text/html");
            const newPhotos = newDoc.querySelectorAll(
              ".photos-grid .grid-item",
            );
            const newLoadMore = newDoc.querySelector(".js-photos-next");

            if (newPhotos) {
              document.querySelector(".photos-grid").append(...newPhotos);
            }
            if (newLoadMore) {
              loadMore.setAttribute("href", newLoadMore.getAttribute("href"));
            } else {
              loadMore.closest("nav").remove();
            }
          });
      }
    },
    { threshold: 0 },
  );

  observer.observe(loadMore);
}

function init() {
  initOpenHeart();
  initQuicklink();
  initInfiniteScroll();
  initMastodonPost();
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
