module.exports = function () {
  if(process.env.NETLIFY) {
    return '<script data-goatcounter="https://brusman_se.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>'
  }
};
