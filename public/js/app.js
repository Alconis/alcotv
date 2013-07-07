'use strict';

var alcotv = angular.module('alcotv', ['firebase', 'ui.bootstrap'])
	.value('fbURL', 'https://alcotv.firebaseio.com/alcotv')
	.factory('Games', function(angularFireCollection, fbURL) {
		return angularFireCollection(fbURL + '/games');
	})
	.config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:'WelcomeCtrl', templateUrl:'partials/welcome.html'}).
			when('/presenter', {controller:'PresenterCtrl', templateUrl:'partials/presenter.html'}).
			when('/tv', {controller:'TVCtrl', templateUrl:'partials/tv.html'}).
			when('/player/:playerName', {controller:'PlayerCtrl', templateUrl:'partials/player.html'}).
			otherwise({redirectTo:'/'});
		});