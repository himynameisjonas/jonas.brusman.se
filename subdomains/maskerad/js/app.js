Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};

var suggestions = [
'Glenn Hysén',
'zlatan',
'Barbapappa',
'lapplisa',
'Luigi',
'Alexander bard',
'patrik i svampbobfyrkant',
'plupp',
'rosa elefant',
'sydost',
'mannen med den gula hatten',
'asterix',
'findus',
'krabba',
'rasmus nalle',
'en tofu',
'George Coatanza',
'Koreanskt adoptivpäron',
'Ande',
'Döden',
'Banan',
'Fruktsallad',
'Bob Marley',
'Kizz',
'Helan & Halvan',
'Charlie Chaplin',
'Korv med bröd',
'Kyckling',
'Hund',
'Anders Borg'
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