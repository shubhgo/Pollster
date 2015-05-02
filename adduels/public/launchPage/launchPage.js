'use strict';

/* Voter Dashboard controller */

var launchControllers = angular.module('launchControllers', []);

launchControllers.controller('launchCtrl',['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		if ($scope.authentication.user) {
			//todo: check and redirect to the analyst page
			$location.path('/voterDashboard');
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
		///todo: add check if voter or analyst
		if ($scope.authentication.user) $location.path('/voterDashboard');

		$scope.create = function(credentials) {
			$http.post('/auth/signup', credentials).success(function(response) {
				// was already signin
				if (Number(response) == 200) $location.path('/voterDashboard');
				
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/voterDashboard');
			}).error(function(data, status, headers, config) {
				errorRedirects(data, status, headers, config, $location);
			});
		};
}]);

launchControllers.controller('logInCtrl',['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		// If user is signed in then redirect back home
		///todo: add check if voter or analyst
		if ($scope.authentication.user) $location.path('/voterDashboard');

		$scope.signin = function(credentials) {
			$http.post('/auth/signin', credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/voterDashboard');
			}).error(function(data, status, headers, config) {
				errorRedirects(data, status, headers, config, $location);
			});
		};
}]);

launchControllers.controller('logOutCtrl', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
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
}]);

launchControllers.controller('fourOthreeCtrl', [,
	function() {
		$scope.message = "How did you get here BRO??";
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

var errorRedirects = function(data, status, headers, config, $location) {
	///todo if error status is 401: redirect to the login screen
	console.log('API called failed');
	console.log('data: ' + data);
	console.log('status: ' + status);
	if (Number(status) == 401) $location.path('/login');
	if (Number(status) == 403) $location.path('/fourOthree');
};