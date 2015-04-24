'use strict'

/* Duels voting page controller */

var duelsControllers = angular.module('duelsControllers', []);

duelsControllers.controller('votingCtrl', ['$scope', '$routeParams', '$http',
  function($scope) {
  	$scope.duel = {
  		keywords:"[shoes], [pumps shoes], [aerosoles], [apparel shoes], [classified shoes], [apparel shoes boots], [shoes womens clearance], [shoe], [shoes online], [creepers]",
  		adAText:"Just Fab Shoes, Shop Shoes & Handbags With JustFab, Handpicked For You. Free Shipping!",
  		adBText:"JustFab&trade; Women's Shoes Get Great Deals on Women's Shoes and More When You Shop Here Now!"
  	};
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
    }
  }]);
/*
phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.phone = data;
      $scope.mainImageUrl = data.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
*/