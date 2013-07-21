'use strict';

var alcotv = angular.module('alcotv', ['ngSanitize', 'firebase', 'ui.bootstrap'])
	.config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:'WelcomeCtrl', templateUrl:'partials/welcome.html'}).
			when('/presenter', {controller:'PresenterCtrl', templateUrl:'partials/presenter.html'}).
			when('/tv', {controller:'TVCtrl', templateUrl:'partials/tv.html'}).
			when('/player/:playerName', {controller:'PlayerCtrl', templateUrl:'partials/player.html'}).
			otherwise({redirectTo:'/'});
		})
	.controller('MainCtrl', ['$scope', '$location', 'angularFire', function($scope, $location, angularFire){
		/*
		 * GLOBAL SCOPE VARIABLES
		 */

		// Index the current game in the games
		$scope.theGameID = 0;

		// The game being played
		$scope.theGame = null;

		// The current player
		$scope.thePlayer = null;

		// When connected, the index of the current player
		// in the Array of players.
		$scope.thePlayerID = -1;

		// The current question being asked
		$scope.theQuestion = null;

		// The index of the current question
		$scope.theQuestionID = 0;

		// true if the current user is a player
		$scope.isPlayer = false;

		// true if the current user is presenter
		$scope.isPresenter = false;

		// true if we are the TV
		$scope.isTV = false;

		/*
		 * Retrieve the game from firebase
		 * and update $scope.theGame.
		 */
		$scope.working = "Retrieving Games.."
		var fbUrl = "https://alcotv.firebaseio.com/games/" + $scope.theGameID;
		var promise = new angularFire(fbUrl, $scope, 'theGame', {});
		promise.then(
			function success(){
				$scope.working = null;
			},
			function error(){
				$scope.working = "Unable to retrieve games."
			});
			
		$scope.$watch('theGame.parameters.status.current_question', function(newValue, oldValue){
			if(!$scope.theGame) return;
			
			if(newValue > -1){
				$scope.theQuestionID = newValue;
				$scope.theQuestion = $scope.theGame.questions[$scope.theQuestionID];
				
				if($scope.isPlayer){
					$location.path("/player/" + $scope.thePlayerID);
				}
				
				if($scope.isPresenter){
					$location.path("/presenter");
				}
			}else{
				$scope.theQuestionID = -1;
				$scope.theQuestion = null;
				$location.path("/");
			}
		});
		
		$scope.$on('changeRole', function(event, newRole, newID){
			if(newRole == 'presenter'){
				$scope.isPresenter = true;
				$scope.isPlayer = false;
				$scope.isTV = false;
			}
			if(newRole == 'player'){
				$scope.thePlayerID = newID;
				$scope.isPresenter = false;
				$scope.isPlayer = true;
				$scope.isTV = false;
			}
			if(newRole == 'tv'){
				$scope.isPresenter = false;
				$scope.isPlayer = false;
				$scope.isTV = true;
				
				$location.path("/tv");
			}
		});

	}]);