'use strict';

window.app.factory('jobsCities', function (Parse) {

	return function (jobs) {
		var cities = ['ALL'];
		jobs.forEach(function (job) {
			if (cities.indexOf(job.attributes.loc) === -1) {
				cities.push(job.attributes.loc);
			}
		});
		return cities;
	}
});

window.app.controller('careersCtrl', ['$scope', 'jobsCities', 'Parse', function ($scope, jobsCities, Parse) {

	$scope.data = {};
	$scope.cities = {};
	$scope.selected = 0;

	function successHandler(response){
			console.log('success');
	    $scope.trabajo = response;
	    $scope.cities = jobsCities(response);
	    $scope.$apply();
	}
	function errorHandler(error){
	    console.log(error);
	}

	Parse.getJobs().then(successHandler, errorHandler);

	function singleSuccess(response) {
		console.log(response);
		$scope.current = response;
		$scope.$apply();
	}
	function errorHandler(error){
		alert(error);
	}

	$scope.view = function (index) {
		Parse.getJobById(index).then(singleSuccess, errorHandler);
	};

	$scope.truncHtml = function (data) {
		var str = $filter('limitTo')(data, 200)+"...";
		return $sce.trustAsHtml(str);
	};
}]);
