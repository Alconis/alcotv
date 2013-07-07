(function(ng, tv){
	"use strict";

	tv.controller(
		'WelcomeCtrl',
		['$scope', 'angularFireCollection', function($scope, angularFireCollection){
		
			$scope.$watch('games', function(newValue, oldValue){
				var v = newValue;
			});
		
			var fbUrl = "https://alcotv.firebaseio.com";
			var fb = new Firebase(fbUrl);
			$scope.games = angularFireCollection(fb);
		}]);

})(angular, alcotv);