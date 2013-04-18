Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};

var suggestions = [
'Alexander bard',
'Ande',
'Anders Borg',
'asterix',
'Banan',
'Barbapappa',
'Bob Marley',
'Charlie Chaplin',
'D&ouml;den',
'en tofu',
'findus',
'Fruktsallad',
'George Coatanza',
'Glenn Hys&eacute;n',
'Helan &amp; Halvan',
'Hund',
'Kizz',
'Koreanskt adoptivp&auml;ron',
'Korv med br&ouml;d',
'krabba',
'Kyckling',
'lapplisa',
'Luigi',
'mannen med den gula hatten',
'patrik i svampbobfyrkant',
'plupp',
'rasmus nalle',
'rosa elefant',
'sydost',
'zlatan',
'Olof Palme',
'Rosa elefant',
'Alf',
'Mamma mu',
'Tintin',
'Jan Guillou',
'Frida Kahlo',
'Badboll',
'Silent Bob',
'Zombie',
'Kurator',
'L&auml;rare',
'Val',
'Harrison Ford',
'Garnnystan',
'ipod',
'Findus',
'Shreck-&aring;snan',
'Dolly Parton',
'Daft Punk',
'Krabba',
'Maffia-boss',
'Vindruvaklase',
'Fisk',
'Elvis',
'Salladshuvud'
];


$(function(){
  suggestion = $("#suggestion strong, #next strong")
  var nextSuggestion = function(){
    oldSuggestion = suggestion.first().html();
    newSuggestion = suggestions.randomElement()
    while(oldSuggestion == newSuggestion){
      newSuggestion = suggestions.randomElement()
    }
    suggestion.html(newSuggestion);
  }

  nextSuggestion();
  $("#next").click(function(evt){
    evt.preventDefault();
    nextSuggestion();
  });
});