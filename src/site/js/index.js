import Swup from "swup";
import SwupPreloadPlugin from "@swup/preload-plugin";
import "./open_heart_element";

new Swup({
  plugins: [new SwupPreloadPlugin()],
});
