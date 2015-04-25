'use strict'

/* Duels voting page controller and duel services */

var duelsControllers = angular.module('duelsControllers', []);

duelsControllers.controller('votingCtrl', ['$scope', '$routeParams','duels', 'ads',
  function($scope, $routeParams, duels, ads) {
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


  	 // = {
  		// keywords:"[shoes], [pumps shoes], [aerosoles], [apparel shoes], [classified shoes], [apparel shoes boots], [shoes womens clearance], [shoe], [shoes online], [creepers]",
  		// adAText:"Just Fab Shoes, Shop Shoes & Handbags With JustFab, Handpicked For You. Free Shipping!",
  		// adBText:"JustFab&trade; Women's Shoes Get Great Deals on Women's Shoes and More When You Shop Here Now!"
  	// };
  	// , $routeParams, $http
    // $http.get('api/duel' + $routeParams.duelId).success(function(data) {
    //   $scope.duel = data;
    //   /// use factory
    //   ///todo: load ad a and B
    //   // $scope.adA = ;
    //   // $scope.adB = ;
    // });

    $scope.next = function(action){
    	console.log(action);
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

    duels.updateDuel = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
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

