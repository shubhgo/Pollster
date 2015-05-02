'use strict';

/* Voter Dashboard controller */

var launchControllers = angular.module('launchControllers', []);

launchControllers.controller('launchCtrl',['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		if ($scope.authentication.user) {
			// render somthing different if the user is authenticated
		};

		$scope.login = function() {
			$location.path('/login');
		};
		
		$scope.signup = function() {
			$location.path('/signup');
		};

}]);

launchControllers.controller('signUpCtrl',['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
}]);

launchControllers.controller('logInCtrl',['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
}]);

var usersFactory = angular.module('usersFactory', []);
// Authentication service for user variables
usersFactory.factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);