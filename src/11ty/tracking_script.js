module.exports = function () {
  if(process.env.NETLIFY) {
    return '<script data-goatcounter="https://brusman_se.goatcounter.com/count" async src="/js/count.js"></script><script src="https://tinylytics.app/embed/ojQJg4KosvEzB9jez3Dv.js" defer></script>'
  } else {
    return '';
  }
};
