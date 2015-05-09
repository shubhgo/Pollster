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
				templateUrl: 'modules/launchPage/launch.html',
				controller: 'launchCtrl'
			}).
			when('/login', {
				templateUrl: 'modules/launchPage/login.html',
				controller: 'logInCtrl'
			}).
			when('/fourOthree', {
				templateUrl: 'modules/launchPage/fourOthree.html',
				controller: 'fourOthreeCtrl'
			}).
			when('/voterDashboard', {
				templateUrl: 'modules/voterDashboard/voterDashboard.html',
				controller: 'voterDashCtrl'
			}).
			when('/duels/:duelId', {
				templateUrl: 'modules/duels/duels.html',
				controller: 'votingCtrl'
			}).
			when('/analystDashboard', {
				templateUrl: 'modules/analystDashboard/analystDashboard.html',
				controller: 'analystDashCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
}]);
// duels/553aa213beba92d6034594c6

			// when('/signup', {
			// 	templateUrl: 'modules/launchPage/signup.html',
			// 	controller: 'signUpCtrl'
			// }).
			// when('/logout', {
			// 	templateUrl: 'modules/launchPage/logout.html',
			// 	controller: 'logOutCtrl'
			// }).
			// when('/loggedout', {
			// 	templateUrl: 'modules/launchPage/loggedout.html',
			// 	controller: 'logOutCtrl'
			// }).
