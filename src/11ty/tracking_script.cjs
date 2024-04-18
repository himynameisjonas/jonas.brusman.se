module.exports = function () {
  if (process.env.ENABLE_ANALYTICS === "true") {
    return '<script data-goatcounter="https://brusman_se.goatcounter.com/count" async src="/js/count.js"></script>';
  } else {
    return "";
  }
};
