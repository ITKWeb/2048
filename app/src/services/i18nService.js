angular.module('app').factory('i18nService', [
  function() {

    'use strict';

    var currentLang = 'fr';
    var translations = { fr: {}, en:{}};

    /************************\
    |* HEADER VIEW          *|
    \************************/
    translations.fr.APP_TITLE = '2048';
    

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