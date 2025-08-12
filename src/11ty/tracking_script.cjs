module.exports = function () {
  if (process.env.ENABLE_ANALYTICS === "true") {
    return '<script defer src="https://um.brusman.se/script.js" data-website-id="76f98f72-cc93-4165-8ed7-5217b2e023c5"></script><script data-goatcounter="https://brusman_se.goatcounter.com/count" async src="/js/count.js"></script>';
  } else {
    return "";
  }
};
