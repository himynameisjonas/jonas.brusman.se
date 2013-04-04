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
'Döden',
'en tofu',
'findus',
'Fruktsallad',
'George Coatanza',
'Glenn Hysén',
'Helan & Halvan',
'Hund',
'Kizz',
'Koreanskt adoptivpäron',
'Korv med bröd',
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
'zlatan'
];


$(function(){
  suggestion = $("#suggestion strong, #next strong")
  var nextSuggestion = function(){
    oldSuggestion = suggestion.first().text();
    newSuggestion = suggestions.randomElement()
    while(oldSuggestion == newSuggestion){
      newSuggestion = suggestions.randomElement()
    }
    suggestion.text(newSuggestion);
  }

  nextSuggestion();
  $("#next").click(function(evt){
    evt.preventDefault();
    nextSuggestion();
  });
});