angular.module('app', ['ngRoute', 'ngResource'])
.config(['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider) {

    'use strict';

    $routeProvider
      .when('/2048', { 
        templateUrl: 'app/src/game/game.tpl.html',
        controller: 'gameCtrl'
      })     
      .otherwise({
        redirectTo: '/2048' 
      });
  }
]);
