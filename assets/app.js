(function( $ ){
  $.style = {
    insertRule:function(selector,rules,contxt){
      var context=contxt||document,stylesheet;

      if(typeof context.styleSheets=='object'){
        if(context.styleSheets.length){
          stylesheet=context.styleSheets[context.styleSheets.length-1];
        }
        if(context.styleSheets.length){
          if(context.createStyleSheet){
            stylesheet=context.createStyleSheet();
          } else {
            context.getElementsByTagName('head')[0].appendChild(context.createElement('style'));
            stylesheet=context.styleSheets[context.styleSheets.length-1];
          }
        }
        if(stylesheet.addRule){
          for(var i=0;i<selector.length;++i){
            stylesheet.addRule(selector[i],rules);
          }
        } else {
          stylesheet.insertRule(selector.join(',') + '{' + rules + '}', stylesheet.cssRules.length);
        }
      }
    }
  };
})(jQuery);

$(function(){
  var figures = $('figure');
  figures.picture({container: 'article'})
  $.style.insertRule(['figure.flickr-image img'],'max-height: '+ ($(window).height() - 20) + 'px;');
});
