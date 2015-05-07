'use strict'

/* Voter Dashboard controller */
/* voterDashCtrl
 * $scope ->
 * home() -> voterDash
 * lougout()
 * startVoting()
 * name
 * remaining
 */

var voterDashControllers = angular.module('voterDashControllers', []);

voterDashControllers.controller('voterDashCtrl',['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		if($scope.authentication.user) {
			$scope.name = $scope.authentication.user.name;
		} else {
			$http.get('/auth/user').
			success(function(data, status, headers, config) {
				$scope.authentication.user = data;
				$scope.name = $scope.authentication.user.name;
			}).
			error(function(data, status, headers, config) {
				errorRedirects(data, status, headers, config, $location);
			});
		}
		$scope.home = function() {
			$location.path('/voterDashboard');
		};
		$scope.logout = function() {
			$http.get('/auth/signout').
			success(function(data, status, headers, config) {
				$scope.authentication = Authentication;
				$scope.authentication.user = false;
				$location.path('/loggedout');
			}).
			error(function(data, status, headers, config) {
				errorRedirects(data, status, headers, config, $location);
			});
		};

		$scope.remaining = 0;
		$scope.startVoting;
		///todo: remove user hard coding
		var baseURL = 'http://localhost:3000/api';

		$http.get(baseURL+'/duels/voter/status/running').
		success(function(data) {
			$scope.remaining = data.length;
			if (data.length > 0) {
				$scope.startVoting = function() {
					$location.url('/duels/'+data[0]);
				};
			};
			// console.log($scope.authentication.user);
		}).
		error(function(data, status, headers, config) {
			errorRedirects(data, status, headers, config, $location);
		});
}]);

