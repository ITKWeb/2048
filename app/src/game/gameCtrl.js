angular.module('app').controller('gameCtrl', [
  '$scope', 'gameService',
  function($scope, gameService) {

    'use strict';

    $scope.size =  gameService.getSize();

    $scope.game =  gameService.newGame();

    var doc = angular.element(document);
    doc.on('keyup', function(e) {    
      pressedKey(e);    
    });

    var displayGrid = function displayGrid () {
      for (var i=0; i< $scope.size; i++) {      
        for (var j=0; j<$scope.size; j++) {
          if ($scope.game.grid[i][j].value !== -1) {
            console.log('[' + i + ']' + '[' + j + '] ', $scope.game.grid[i][j].value);
          }
        }
      }
    };
    displayGrid();


    var LEFT = 37; //Keycode pour la touche gauche
    var RIGHT = 39; //Keycode pour la touche droite
    var UP = 38; //Keycode pour la touche haut
    var DOWN = 40; //Keycode pour la touche bas
    var direction = '';

    var pressedKey = function pressedKey(event) {
        if(gameService.getGameStatus() === 'PROGRESS') {
          if(event.keyCode===LEFT){
            direction = 'LEFT';
          }
          else if(event.keyCode===RIGHT){
            direction = 'RIGHT';
          }
          else if(event.keyCode===UP){
            direction = 'UP';
          }
          else if(event.keyCode===DOWN){
            direction = 'DOWN';
          }

          $scope.game = gameService.play(direction);
          $scope.$apply();
          displayGrid();
         
          console.log('moved ' + direction);
        }
  };

	 


     
  }
]);