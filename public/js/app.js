'use strict';

var alcotv = angular.module('alcotv', ['firebase', 'ui.bootstrap'])
	.config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:'WelcomeCtrl', templateUrl:'partials/welcome.html'}).
			when('/presenter', {controller:'PresenterCtrl', templateUrl:'partials/presenter.html'}).
			when('/tv', {controller:'TVCtrl', templateUrl:'partials/tv.html'}).
			when('/player/:playerName', {controller:'PlayerCtrl', templateUrl:'partials/player.html'}).
			otherwise({redirectTo:'/'});
		})
	.controller('MainCtrl', ['$scope', 'angularFire', function($scope, angularFire){
		/*
		 * GLOBAL SCOPE VARIABLES
		 */

		// Index the current game in the games
		$scope.theGameID = 0;

		// The game being played
		$scope.theGame;

		// The current player
		$scope.thePlayer = undefined;

		// When connected, the index of the current player
		// in the Array of players.
		$scope.thePlayerID = -1;

		// true if the current player is presenter
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
				$scope.working = undefined;
			},
			function error(){
				$scope.working = "Unable to retrieve games."
			});

		

	}]);