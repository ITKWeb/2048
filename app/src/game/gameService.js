angular.module('app').factory('gameService', [
	'$location', 
  function($location) {
   
    'use strict';

    var SIZE = 4 ;
    var SUCCESS_SCORE = 2048 ;

    var game = {} ;


    var addRandomCell = function addRandomCell() {
    	var x,y;
    	do {
        		x = Math.floor(Math.random() * SIZE);
        		y = Math.floor(Math.random() * SIZE);
        }
        while (game.grid[x][y].value !== -1);
        game.grid[x][y].value = Math.pow(2, Math.floor(Math.random() * 2) + 1);
    };

    var resetGridTransform = function resetGridTransform() {
    	for (var i=0; i< SIZE; i++) {        		
        		for (var j=0; j<SIZE; j++) {
        			game.grid[i][j].isTransform = false;
        		}
        	}
    };

    var isSuccess = function isSuccess() {
    	for (var i=0; i< SIZE; i++) {        		
        		for (var j=0; j<SIZE; j++) {
        			if (game.grid[i][j].value === SUCCESS_SCORE) {
        				game.status = 'SUCCESS';
        				return;
        			}
        		}
        }
    };

    var processMovement = function processMovement (direction, x, y) {

    	if (game.grid[x][y].value === -1) {
    		return;
    	}

		switch (direction) {

			case 'RIGHT' : {				
				while (x < SIZE-1) {
					if (game.grid[x+1][y].value === -1) {
						game.grid[x+1][y].value = game.grid[x][y].value;
						game.grid[x][y].value = -1;
					} else if (game.grid[x+1][y].value === game.grid[x][y].value && !game.grid[x+1][y].isTransform) {
						game.grid[x+1][y].value += game.grid[x][y].value;
						game.grid[x+1][y].isTransform = true;
						game.grid[x][y].value = -1;
						game.score = game.grid[x+1][y];
						game.totalScore += game.score;
					}
					x++;
				}
				break;
			}
			case 'LEFT' : {
				while (x > 0) {
					if (game.grid[x-1][y].value === -1) {
						game.grid[x-1][y].value = game.grid[x][y].value;
						game.grid[x][y].value = -1;
					} else if (game.grid[x-1][y].value === game.grid[x][y].value && !game.grid[x-1][y].isTransform) {
						game.grid[x-1][y].value += game.grid[x][y].value;
						game.grid[x-1][y].isTransform = true;
						game.grid[x][y].value = -1;
						game.score = game.grid[x-1][y];
						game.totalScore += game.score;
					}
					x--;
				}
				break;
			}	
			case 'UP' : {
				while (y > 0) {
					if (game.grid[x][y-1].value === -1) {
						game.grid[x][y-1].value = game.grid[x][y].value;
						game.grid[x][y].value = -1;
					} else if (game.grid[x][y-1].value === game.grid[x][y].value && !game.grid[x][y-1].isTransform) {
						game.grid[x][y-1].value += game.grid[x][y].value;
						game.grid[x][y-1].isTransform = true;
						game.grid[x][y].value = -1;
						game.score = game.grid[x][y-1];
						game.totalScore += game.score; 
					}
					y--;
				}
				break;
			}
			case 'DOWN' : {
				while (y < SIZE -1) {
					if (game.grid[x][y+1].value === -1) {
						game.grid[x][y+1].value = game.grid[x][y].value;
						game.grid[x][y].value = -1;
					} else if (game.grid[x][y+1].value === game.grid[x][y].value && !game.grid[x][y+1].isTransform) {
						game.grid[x][y+1].value += game.grid[x][y].value;
						game.grid[x][y+1].isTransform = true;
						game.grid[x][y].value = -1;
						game.score = game.grid[x][y+1];
						game.totalScore += game.score;
					}
					y++;
				}
				break;
			}							
		}
	} ;
    
    return { 

    	getSize: function() {
    		return SIZE;
    	},
    	getGameStatus: function(){
    		return game.status;
    	},
    	newGame: function () {

        	game.score = 0 ; // sore du tour
        	game.totalScore = 0 ; // score total
        	game.status = 'PROGRESS' ; // status        	

        	// Initialisation de la grille
        	game.grid = new Array(SIZE);
        	for (var i=0; i< SIZE; i++) {
        		game.grid[i] = new Array(SIZE);
        		for (var j=0; j<SIZE; j++) {
        			game.grid[i][j] = { 'value' : -1, 'isTransform' : false };
        		}
        	}

        	// Placement des 2 premiers éléments sur la grille
        	// 1er élément est forcément un 2
        	var randomX = Math.floor(Math.random() * SIZE);
        	var randomY = Math.floor(Math.random() * SIZE);
        	game.grid[randomX][randomY].value = 2;

        	// 2ème élement, un 2 ou un 4 a une autre position que le 1er élément

        	var newRandomX, newRandomY;
        	do {
        		newRandomX = Math.floor(Math.random() * SIZE);
        		newRandomY = Math.floor(Math.random() * SIZE);
        	}
        	while (randomX === newRandomX && randomY === newRandomY);
        	game.grid[newRandomX][newRandomY].value = Math.pow(2, Math.floor(Math.random() * 2) + 1);

        	return game;
        },

 
        play: function (direction) {

        	// re-init des booleans de transformations de cases
        	resetGridTransform();

        	// calcul du sens de parcours de la grille
        	var x,y;

        	switch (direction) {

        		case 'RIGHT' : {        			
        			for (x=2; x >= 0; x--) {
		        		for (y=0; y <= 3; y++) {		    				
		    				processMovement(direction, x, y);		    				        				
		        		}
        			}
        			break;
        		}

        		case 'LEFT' : {
        			for (x=1; x<=3; x++) {
		        		for (y=0; y<=3; y++) {		    				
		    				processMovement(direction, x, y);		    				        				
		        		}
        			}
        			break;
        		}


        		case 'UP' : {
        			for (x=0; x <=3; x++) {
		        		for (y=1; y <= 3; y++) {		    				
		    				processMovement(direction, x, y);		    				        				
		        		}
        			}
        			break; 
        		}


        		case 'DOWN' : {
        			for (x=0; x <=3; x++) {
		        		for (y=3; y >=0; y--) {		    				
		    				processMovement(direction, x, y);		    				        				
		        		}
        			}
        			break; 
        		}
        	}


        	// calcul état de la grille (gagné? perdu? continue?)


        	// positionnement nouvel élément sur un emplacement libre

        	addRandomCell();
        	
        	return game;
        }

    };
  }
]);