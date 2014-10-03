angular.module('app').factory('i18nService', [
  function() {

    'use strict';

    var currentLang = 'fr';
    var translations = { fr: {}, en:{}};
 
    translations.fr.score = 'score';
    translations.fr.best = 'Meilleur';
    translations.fr.title = 'Venez vous essayer au 2048!';
    translations.fr.play = 'Jouer';
    

    return {
      get: function (input) {
        return translations[currentLang][input];
      },
      getLang: function(){
      	return currentLang;
      },
      setLang: function(lang){
      	currentLang = lang;
      }
    };

  }
]);