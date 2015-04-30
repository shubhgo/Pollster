'use strict'

/* Voter Dashboard controller */

var voterDashControllers = angular.module('voterDashControllers', []);

voterDashControllers.controller('voterDashCtrl',['$scope', '$http', '$location',
	function($scope, $http, $location) {
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
		}).
		error(function(error) {
			$scope.status = 'voterDashCtrl: failed to load duels/users/ /status/ '+ error.message;
		});
}]);
