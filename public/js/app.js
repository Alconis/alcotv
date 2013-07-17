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
		$scope.theGame = null;

		// The current player
		$scope.thePlayer = null;

		// When connected, the index of the current player
		// in the Array of players.
		$scope.thePlayerID = -1;

		// The current question being asked
		$scope.theQuestion = null;

		// The index of the current question
		$scope.theQuestionID = -1;

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

		/*$scope.$watch('isPlayer', function(newValue, oldValue){
			$scope.isPresenter = $scope.isTV = !newValue;
		});

		$scope.$watch('isPresenter', function(newValue, oldValue){
			$scope.isPlayer = $scope.isTV = !newValue;
		});

		$scope.$watch('isTV', function(newValue, oldValue){
			$scope.isPlayer = $scope.isPresenter = !newValue;
		});*/

	}]);