'use strict'

/* Voter Dashboard controller */

var voterDashControllers = angular.module('voterDashControllers', []);

voterDashControllers.controller('voterDashCtrl',['$scope', '$location', 'duels',
	function($scope, $location, duels) {
		$scope.remaining;
		
		function nextDuel() {
			return '553aa213beba92d6034594c6';
		};

		$scope.startVoting = function() {
			$location.url('/duels/'+nextDuel());
		};
	}
]);
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


/*
remaining
startVoting()
*/