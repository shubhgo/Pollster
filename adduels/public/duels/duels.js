'use strict'

/* Duels voting page controller and duel services */

var duelsControllers = angular.module('duelsControllers', []);

duelsControllers.controller('votingCtrl', ['$scope', '$routeParams', '$http', '$location','duels', 'ads',
  function($scope, $routeParams, $http, $location, duels, ads) {
  	$scope.duel;
  	$scope.adA;
  	$scope.adB;

  	getDuel($routeParams.duelId);

    function getAd(adID, isA) {
    	ads.getAd(adID)
	    	.success(function (data) {
	    		isA? ($scope.adA = data): ($scope.adB = data);
	    	})
	    	.error(function (error) {
	    		$scope.status = 'Unable to load ad with ID: ' + adID + ' Error: ' + error.message;
	    	});
    };

    function getDuel(duelId) {
        duels.getDuel(duelId)
            .success(function (data) {
                $scope.duel = data;
                getAd(data.adAID, true);
                getAd(data.adBID, false);
            })
            .error(function (error) {
                $scope.status = 'Unable to load Duel with ID: ' + duelId + ' error: ' + error.message;
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
    			///todo: replace user id hard coding
    			var vote = {
    					duelID: $scope.duel._id,
						voterID: '32452345235',
						'action': action
    			};
				$http.post('http://localhost:3000/api/votes', vote)
					.success(function(data, status, headers, config) {
				    	var baseURL = 'http://localhost:3000/api';
				    	///todo: replace user id hard coding
				    	$http.get(baseURL+'/duels/user/32452345235/status/running').
						success(function(data) {
							$location.url('/duels/'+data[0]);
						}).
						error(function(error) {
							$scope.status = 'voterDashCtrl: failed to load duels/users/ /status/ '+ error.message;
						});
					})
					.error(function(data, status, headers, config) {
						$scope.status = 'Unable to add vote: ' + vote + ' error: ' + error.message;
					});
    		})
    		.error(function (error) {
    			$scope.status = 'Unable to update the duel: ' + $scope.duel._id + ' error: ' + error;
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

