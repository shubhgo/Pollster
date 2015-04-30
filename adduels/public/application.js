'use strict';

/* App Module */

var adDuelsApp = angular.module('adduels', [
  'ngRoute',
  'duelsControllers',
  'duelsFactory',
  'voterDashControllers'
  // 'duelsServices'
]);

adDuelsApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/voterDashboard', {
				templateUrl: 'voterDashboard/voterDashboard.html',
				controller: 'voterDashCtrl'
			}).
			when('/duels/:duelId', {
				templateUrl: 'duels/duels.html',
				controller: 'votingCtrl'
			}).
			otherwise({
				///fixit: asap remove hard coding
				redirectTo: '/voterDashboard'
			});
}]);
// duels/553aa213beba92d6034594c6