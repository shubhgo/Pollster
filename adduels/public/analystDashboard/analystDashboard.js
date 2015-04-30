'use strict'

/* Analyst Dashboard controller */

var analystDashControllers = angular.module('analystDashControllers', []);

analystDashControllers.controller('analystDashCtrl',['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$scope.running=0;
		$scope.completed=0;
		$scope.allDuelCount;
		$scope.duels;// array with all the duels created by this analyst

		///todo: remove user hard coding
		var baseURL = 'http://localhost:3000/api';
		var analystID = '5542a1f0868d07853f0c2dbe';

		$http.get(baseURL+'/duels/analyst/' + analystID).
		success(function(data) {
			$scope.duels = data;
			$scope.allDuelCount = data.length;

			$scope.duels.forEach(function(singleDuel) {
				if(singleDuel.status == 'running') $scope.running++;
				if(singleDuel.status == 'completed') $scope.completed++;
			})
		}).
		error(function(error) {
			$scope.status = 'analystDashCtrl: failed to load duels/users/ /status/ '+ error.message;
		});
}]);
