'use strict';

/* App Module */

var adDuelsApp = angular.module('adDuelsApp', [
  'ngRoute',
  'duelsControllers',
  'duelsFactory'
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
	  	redirectTo: '/duels/553aa213beba92d6034594c6'
	  });
}]);
