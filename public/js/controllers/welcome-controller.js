(function(ng, tv){
	"use strict";

	tv.controller(
		'WelcomeCtrl',
		['$scope', '$location', 'angularFire', function($scope, $location, angularFire){

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

				// Create new player object.
				var newPlayer = {
					name : $scope.thePlayerName,
					status : 'ready',
					score : 0
				}
				$scope.thePlayerID = $scope.theGame.players.push(newPlayer) - 1;
				$scope.isPlayer = true;
				$scope.isPresenter = false;
				$scope.isTV = false;

				// Sync the $scope.thePlayer with firebase
				var fbUrl = "https://alcotv.firebaseio.com/games/"
				 				+ $scope.theGameID + "/players/"
				 				+ $scope.thePlayerID;
				var promise = new angularFire(fbUrl, $scope, 'thePlayer', {});
			};

			$scope.enterAsPresenter = function() {
				$scope.theGame.parameters.presenter = $scope.thePlayer = $scope.thePlayerName;
				$scope.isPlayer = false;
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
				$scope.isPlayer = false;
				$scope.isPresenter = false;
				$scope.isTV = true;

				$location.path("/tv");
			};

			$scope.leave = function() {
				if($scope.isPlayer){
					ng.forEach($scope.theGame.players, function(value, key){
						if(value.name == $scope.thePlayer.name){
							$scope.theGame.players.splice(value, 1);
							return;
						}
					});
					$scope.thePlayerID = -1;
					$scope.thePlayer = null;
				$scope.isPlayer = false;
				$scope.isPresenter = false;
				$scope.isTV = false;
				}
			}
		}]);

})(angular, alcotv);