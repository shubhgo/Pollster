'use strict';

/* App Module */

var adDuelsApp = angular.module('adduels', [
  'ngRoute',
  'duelsControllers',
  'duelsFactory',
  'voterDashControllers',
  'analystDashControllers'
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
			when('/analystDashboard', {
				templateUrl: 'analystDashboard/analystDashboard.html',
				controller: 'analystDashCtrl'
			}).
			otherwise({
				///fixit: asap remove hard coding
				redirectTo: '/analystDashboard'
			});
}]);
// duels/553aa213beba92d6034594c6