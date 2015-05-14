'use strict';

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
    // as functions inside a function may not 'hoist' as expected
    function getAd(adID, isA) {
        ads.getAd(adID)
            .success(function (data) {
                isA? ($scope.adA = data): ($scope.adB = data);
            })
            .error(function(data, status, headers, config) {
                errorRedirects(data, status, headers, config, $location);
            });
    }

    function getDuel(duelId) {
        duels.getDuel(duelId)
            .success(function (data) {
                var keywords = [];
                data.keywords.split(',').forEach(function(data,index) {
                    if(index < 3){keywords.push(data.trim());} 
                });
                data.keywords = keywords;
                $scope.duel = data;
                getAd(data.adAID, true);
                getAd(data.adBID, false);
            })
            .error(function(data, status, headers, config) {
                errorRedirects(data, status, headers, config, $location);
            });
    }

  	$scope.duel = {};
  	$scope.adA = {title:'__',displayURL:'__',line1:'__',line2:'__'};
  	$scope.adB = {title:'__',displayURL:'__',line1:'__',line2:'__'};

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
            $location.path('/login');
        }).
        error(function(data, status, headers, config) {
            errorRedirects(data, status, headers, config, $location);
        });
    };
    $http.get('/api/duels/voter/status/running').
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

    $scope.next = function(action){
    	/// todo: update the duel object with vote count etc
    	/// todo: record the vote
    	console.log(action);

    	switch (action) {
		  case 'VoteAdA':
		  	$scope.duel.votesACount++;
		  	$scope.duel.totalVotes++;
		  	$scope.duel.totalViews++;
		    break;
		  case 'equal':
		  	$scope.duel.noOpinionCount++;
		  	$scope.duel.totalVotes++;
		  	$scope.duel.totalViews++;
		    break;
		  case 'VoteAdB':
		  	$scope.duel.votesBCount++;
		  	$scope.duel.totalVotes++;
		  	$scope.duel.totalViews++;
		    break;
		  case 'skip':
		  	$scope.duel.totalViews++;
		    break;
		  default:
		    $scope.duel.totalViews++;
		}

    	duels.updateDuel($scope.duel)
    		.success(function (argument) {
    			// Ad vote
    			var vote = {
    					duelID: $scope.duel._id,
						'action': action
    			};
				$http.post('/api/votes', vote)
					.success(function(data, status, headers, config) {
				    	$http.get('/api/duels/voter/status/running').
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
						$scope.status = 'Unable to add vote: ' + vote + ' error: ' + error.status;
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

    var urlBase = '/api/duels';
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

	var ads = {};

	ads.getAd = function (id) {
		return $http.get('/api/ads/' + id);
	};

	return ads;
}]);

