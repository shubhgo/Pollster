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

		$http.get(baseURL+'/duels/user/32452345235/status/running').
		success(function(data) {
			$scope.remaining = data.length;
			$scope.startVoting = function() {
				$location.url('/duels/'+data[0]);
			};
			console.log('$scope.authentication.user: '+$scope.authentication.user);
		}).
		error(function(data, status, headers, config) {
			///todo if error status is 401: redirect to the login screen
			console.log('running duels for user failed');
			$scope.status = status;
			if (status == 401) $location.path('/login');;
		});
}]);
