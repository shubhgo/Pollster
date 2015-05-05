'use strict'

/* Duels voting page controller and duel services */
/*
 * $scope
 * home()
 * startVoting()
 * remaining
 * name
 * logout()
 * duel.keywords
 * adA.title
 * adA.displayURL
 * adA.line2
 * next()[VoteAdA, equal, VoteAdB, skip]
 */
var duelsControllers = angular.module('duelsControllers', []);

duelsControllers.controller('votingCtrl', ['$scope', '$routeParams', '$http', '$location','duels', 'ads', 'Authentication',
function($scope, $routeParams, $http, $location, duels, ads, Authentication) {
  	$scope.duel;
  	$scope.adA;
  	$scope.adB;

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
    $http.get('http://localhost:3000/api/duels/voter/status/running').
    success(function(data) {
        $scope.remaining = data.length;
        $scope.startVoting = function() {
            $location.url('/duels/'+data[0]);
        };
        console.log($scope.authentication.user);
    }).
    error(function(data, status, headers, config) {
        errorRedirects(data, status, headers, config, $location);
    });

  	getDuel($routeParams.duelId);

    function getAd(adID, isA) {
    	ads.getAd(adID)
	    	.success(function (data) {
	    		isA? ($scope.adA = data): ($scope.adB = data);
	    	})
	    	.error(function(data, status, headers, config) {
                errorRedirects(data, status, headers, config, $location);
            });
    };

    function getDuel(duelId) {
        duels.getDuel(duelId)
            .success(function (data) {
                $scope.duel = data;
                getAd(data.adAID, true);
                getAd(data.adBID, false);
            })
            .error(function(data, status, headers, config) {
                errorRedirects(data, status, headers, config, $location);
            });
    };

    $scope.next = function(action){
    	/// todo: update the duel object with vote count etc
    	/// todo: record the vote
    	console.log(action);

    	switch (action) {
		  case "VoteAdA":
		  	$scope.duel.votesACount++;
		  	$scope.duel.totalVotes++;
		  	$scope.duel.totalViews++;
		    break;
		  case "equal":
		  	$scope.duel.noOpinionCount++;
		  	$scope.duel.totalVotes++;
		  	$scope.duel.totalViews++;
		    break;
		  case "VoteAdB":
		  	$scope.duel.votesBCount++;
		  	$scope.duel.totalVotes++;
		  	$scope.duel.totalViews++;
		    break;
		  case "skip":
		  	$scope.duel.totalViews++;
		    break;
		  default:
		    $scope.duel.totalViews++;
		}

    	duels.updateDuel($scope.duel)
    		.success(function (argument) {
    			// Ad vote
    			///todo: IMP****replace user id hard coding*****
    			var vote = {
    					duelID: $scope.duel._id,
						voterID: '32452345235',
						'action': action
    			};
				$http.post('http://localhost:3000/api/votes', vote)
					.success(function(data, status, headers, config) {
				    	var baseURL = 'http://localhost:3000/api';
				    	///todo: replace user id hard coding
				    	$http.get(baseURL+'/duels/voter/status/running').
						success(function(data) {
                            if (data.length > 0) {
                                $location.url('/duels/'+data[0]);
                            } else {
                                $location.url('/voterDashboard');
                            }		
						}).
						error(function(error) {
							$scope.status = 'voterDashCtrl: failed to load duels/voter/status/ '+ error.message;
						});
					})
					.error(function(data, status, headers, config) {
						$scope.status = 'Unable to add vote: ' + vote + ' error: ' + error.message;
					});
    		})
    		.error(function(data, status, headers, config) {
                errorRedirects(data, status, headers, config, $location);
            });


    	///todo: update duels table
    	///todo: insert vote details table
    };
}]);

var duelsFactory = angular.module('duelsFactory', []);

duelsFactory.factory('duels', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/duels';
    var duels = {};

    duels.getDuels = function () {
        return $http.get(urlBase);
    };

    duels.getDuel = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    // duels.insertDuel = function (cust) {
    //     return $http.post(urlBase, cust);
    // };

    duels.updateDuel = function (duel) {
        return $http.put(urlBase + '/' + duel._id, duel);
    };

    // duels.deleteDuel = function (id) {
    //     return $http.delete(urlBase + '/' + id);
    // };

    return duels;
}]);

// var adsFactory = angular.module('adsFactory', []);
duelsFactory.factory('ads', ['$http', function($http) {

	var urlBase = 'http://localhost:3000/api/ads';
	var ads = {};

	ads.getAd = function (id) {
		return $http.get(urlBase + '/' + id);
	};

	return ads;
}]);

