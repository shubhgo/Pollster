'use strict';

/* Analyst Dashboard controller */

var analystDashControllers = angular.module('analystDashControllers', []);

analystDashControllers.controller('analystDashCtrl',['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$scope.running=0;
		$scope.completed=0;
		$scope.allDuelCount=0;
		$scope.duels=[];// array with all the duels created by this analyst

		///todo: remove user hard coding
		var analystID = '5542a1f0868d07853f0c2dbe';

		$http.get('/api/duels/analyst/' + analystID).
		success(function(data) {
			$scope.duels = data;
			$scope.allDuelCount = data.length;

			$scope.duels.forEach(function(singleDuel) {
				if(singleDuel.status == 'running') $scope.running++;
				if(singleDuel.status == 'completed') $scope.completed++;
			});
		}).
		error(function(data, status, headers, config) {
				errorRedirects(data, status, headers, config, $location);
		});
}]);
