'use strict';

/* App Module */

var adDuelsApp = angular.module('adDuelsApp', [
  'ngRoute',
  'duelsControllers'
  // 'duelsServices'
]);

adDuelsApp.config(['$routeProvider',
 function($routeProvider) {
  $routeProvider.
	  when('/duels/:duelId', {
	  	templateUrl: 'duels/duels.html',
	  	controller: 'votingCtrl'
	  }).
	  otherwise({
	  	///fixit: asap remove hard coding
	  	redirectTo: '/duels/5537ebc3d235bb4b27d2948c'
	  });
}]);
