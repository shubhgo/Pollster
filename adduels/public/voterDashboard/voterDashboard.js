'use strict'

/* Voter Dashboard controller */

var voterDashControllers = angular.module('voterDashControllers', []);

voterDashControllers.controller('voterDashCtrl',['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		$scope.remaining;
		$scope.startVoting;
		///todo: remove user hard coding
		var baseURL = 'http://localhost:3000/api';

		$http.get(baseURL+'/duels/voter/status/running').
		success(function(data) {
			$scope.remaining = data.length;
			$scope.startVoting = function() {
				$location.url('/duels/'+data[0]);
			};
			console.log('voterDashControllers.controller -- $scope.authentication.user: '+$scope.authentication.user);
		}).
		error(function(data, status, headers, config) {
			errorRedirects(data, status, headers, config, $location);
		});
}]);
