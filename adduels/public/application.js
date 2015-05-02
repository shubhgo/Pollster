'use strict';

/* App Module */

var adDuelsApp = angular.module('adduels', [
  'ngRoute',
  'duelsControllers',
  'duelsFactory',
  'usersFactory',
  'voterDashControllers',
  'analystDashControllers',
  'launchControllers'
  // 'duelsServices'
]);

adDuelsApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/launch', {
				templateUrl: 'launchPage/launch.html',
				controller: 'launchCtrl'
			}).
			when('/signup', {
				templateUrl: 'launchPage/signup.html',
				controller: 'signUpCtrl'
			}).
			when('/login', {
				templateUrl: 'launchPage/login.html',
				controller: 'logInCtrl'
			}).
			when('/logout', {
				templateUrl: 'launchPage/logout.html',
				controller: 'logOutCtrl'
			}).
			when('/loggedout', {
				templateUrl: 'launchPage/loggedout.html',
				controller: 'logOutCtrl'
			}).
			when('/fourOthree', {
				templateUrl: 'launchPage/fourOthree.html',
				controller: 'fourOthreeCtrl'
			})
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