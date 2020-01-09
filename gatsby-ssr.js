const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("script", {
      key: "goatcounter",
      dangerouslySetInnerHTML: {
        __html: `(function() {
    window.goatcounter = window.goatcounter || {};
    window.goatcounter.vars = {no_onload: true}
    var script = document.createElement('script');
    window.counter = 'https://brusman_se.goatcounter.com/count'
    script.async = 1;
    script.src = '//gc.zgo.at/count.js';

    var ins = document.getElementsByTagName('script')[0];
    ins.parentNode.insertBefore(script, ins)
  })();`
      }
    })
  ]);
};
