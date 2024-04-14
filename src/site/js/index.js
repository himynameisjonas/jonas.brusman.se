import Swup from "swup";
import SwupPreloadPlugin from "@swup/preload-plugin";
import "./open_heart_element";

const swup = new Swup({
  plugins: [new SwupPreloadPlugin()],
});

swup.hooks.on("page:view", () => {
  if (!window.goatcounter) return;

  window.goatcounter.count({
    path: location.pathname + location.search + location.hash,
  });
});
