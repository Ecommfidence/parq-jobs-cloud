'use strict';

window.app.controller('ApplicationsCtrl', ['$scope', '$location', 'Parse', '$filter', function ($scope, $location, Parse, $filter) {
	function successHandler(response){
	    $scope.applications = response;
	    $scope.$apply();
	}
	function errorHandler(error){
	    console.log(error);
	}

	Parse.get().then(successHandler, errorHandler);

	$scope.view = function (index) {
		$location.path('/apps/' + index);
	}
	$scope.sort = function (key, reverse) {
		$scope.applications = $filter('orderBy')($scope.applications, function (app) {
			return app.attributes[key];
		}, reverse);
	}
	var turn = true;
	$scope.whenCreated = function () {
		turn = !turn;
		$scope.applications = $filter('orderBy')($scope.applications, 'createdAt', turn);
	}
}]);

window.app.controller('topAppCtrl', ['$scope', '$location', 'Parse', '$filter', function ($scope, $location, Parse, $filter) {
	function successHandler(response){
	    $scope.applications = $filter('orderBy')(response, sorter, true);
	    $scope.$apply();
	}
	function errorHandler(error){
	    console.log(error);
	}
	function sorter (app) {
		// Sort By Votes
		return app.attributes.votes;
	}

	Parse.get().then(successHandler, errorHandler);

	$scope.view = function (index) {
		$location.path('/apps/' + index);
	}
}]);

window.app.controller('NotificationsCtrl', ['$scope', '$location', '$rootScope', 'Parse', '$filter', function ($scope, $location, $rootScope, Parse, $filter) {
	function successHandler(response){
		$rootScope.appcount = response.length;
	    $scope.applications = $filter('filter')(response,seen);
	    $scope.$apply();
	}
	function errorHandler(error){
	    console.log(error);
	}

	Parse.get().then(successHandler, errorHandler);

	$scope.view = function (index) {
		$location.path('/apps/' + index);
	}
	function seen (app) {
		return !app.attributes.viewed;
	}
}]);

window.app.controller('ApplicationCtrl', ['$scope', '$route', 'Parse','$sce', function ($scope, $route, Parse, $sce) {
	function successHandler(response){
	    $scope.app = response;
	    Parse.opened($scope.app).then(success, errorHandler);
	    $scope.$apply();
	}
	function success (object) {
		object.attributes.viewed = true;
		object.save(object);
	}
	function successUp (object) {
		object.increment('votes');
		object.save(object);
	}
	function successDown (object) {
		object.increment('votes',-1);
		object.save(object);
	}
	function errorHandler(error){
	    console.log(error);
	}

	Parse.getById($route.current.params.id).then(successHandler, errorHandler);

	$scope.vote = function (up) {
		if (up) {
			$scope.app.attributes.votes++;
			Parse.getById($route.current.params.id).then(successUp, errorHandler); 
		} else { 
			$scope.app.attributes.votes--;
			Parse.getById($route.current.params.id).then(successDown, errorHandler); 
		}
	};

	$scope.trustedSrc = function(src){
    return $sce.trustAsResourceUrl(src);
  }
}]);
