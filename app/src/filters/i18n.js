angular.module('app').filter('i18n', [
  'i18nService', 
  function(i18nService) {

    'use strict'; 

    return function (input) {
      return i18nService.get(input);
    };

  }
]);