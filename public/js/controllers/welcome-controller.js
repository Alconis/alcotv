(function(ng, tv){
	"use strict";

	tv.controller(
		'WelcomeCtrl',
		['$scope', 'angularFire', function($scope, angularFire){

			$scope.thePlayerName = '';

			$scope.enterAsPlayer = function() {
				// If first player
				if(!$scope.theGame.players){
					$scope.theGame.players = [];
				}

				// If duplicated player name
				ng.forEach($scope.theGame.players, function(value, key){
					if(value.name == $scope.thePlayerName){
						$scope.theGame.players.splice(value, 1);
						return;
					}
				});
				var newPlayer = {
					name : $scope.thePlayerName,
					status : 'ready',
					score : 0
				}
				$scope.thePlayerID = $scope.theGame.players.push(newPlayer);
				$scope.isPresenter = false;
				$scope.isTV = false;

				// Sync the player with firebase
				var fbUrl = "https://alcotv.firebaseio.com/games/"
				 				+ $scope.theGameID + "/players/"
				 				+ $scope.thePlayerID;
				var promise = new angularFire(fbUrl, $scope, 'thePlayer', {});
			};

			$scope.enterAsPresenter = function() {
				$scope.theGame.parameters.presenter = $scope.thePlayer.name;
				$scope.isPresenter = true;
				$scope.isTV = false;

				// If existing player name
				ng.forEach($scope.theGame.players, function(value, key){
					if(value.name == $scope.thePlayer.name){
						$scope.theGame.players.splice(value, 1);
						return;
					}
				});
			};

			$scope.enterAsTV = function() {
				$scope.isPresenter = false;
				$scope.isTV = true;
			};


		}]);

})(angular, alcotv);