require("prismjs/themes/prism-solarizedlight.css");

exports.onRouteUpdate = ({ location }) => {
  window.goatcounter &&
    window.goatcounter.count &&
    window.goatcounter.count({
      page: location.pathname + location.search + location.hash
    });
};
