(function(ng, tv){
	"use strict";

	tv.controller(
		'WelcomeCtrl',
		['$scope', 'angularFire', function($scope, angularFire){
		
			$scope.$watch('games', function(newValue, oldValue){
				if(newValue && newValue.length > 0)
					$scope.theGame = newValue[0];
			});
		
			var fbUrl = "https://alcotv.firebaseio.com/games";
			var promise = new angularFire(fbUrl, $scope, 'games', []);
		}]);

})(angular, alcotv);