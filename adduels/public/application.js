'use strict';

/* App Module */

var pollsterApp = angular.module('pollster', [
  'ngRoute',
  'duelsControllers',
  'duelsFactory',
  'usersFactory',
  'voterDashControllers',
  'analystDashControllers',
  'launchControllers'
  // 'duelsServices'
]);

pollsterApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'launchPage/launch.html',
				controller: 'launchCtrl'
			}).
			when('/login', {
				templateUrl: 'launchPage/login.html',
				controller: 'logInCtrl'
			}).
			when('/fourOthree', {
				templateUrl: 'launchPage/fourOthree.html',
				controller: 'fourOthreeCtrl'
			}).
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
				redirectTo: '/'
			});
}]);
// duels/553aa213beba92d6034594c6

			// when('/signup', {
			// 	templateUrl: 'launchPage/signup.html',
			// 	controller: 'signUpCtrl'
			// }).
			// when('/logout', {
			// 	templateUrl: 'launchPage/logout.html',
			// 	controller: 'logOutCtrl'
			// }).
			// when('/loggedout', {
			// 	templateUrl: 'launchPage/loggedout.html',
			// 	controller: 'logOutCtrl'
			// }).
