'use strict';

window.app.controller('OpeningList', ['$scope','$location', 'Parse', '$rootScope','$sce','$filter', '$timeout', 'imgType', 'Error', function ($scope, $location, Parse, $rootScope, $sce, $filter, $timeout, imgType, Error) {

	function successHandler(response){
		$rootScope.jobs = response;
		$scope.jobs = $rootScope.jobs;
		addTypes(response);
		$scope.current = false;
        $rootScope.jobcount = response.length;
		$scope.$apply();
	}
	function singleSuccess(response) {
		$rootScope.loading = false;
		$scope.current = response;
		$scope.$apply();
	}
	function errorHandler(error){
		$rootScope.loading = false;
		Error(error, 'Their was an error check the console for more detail.');
	}
	function addTypes(jobs) {
		$scope.types = ['All'];
		jobs.forEach(function (job) {
			var type = job.attributes.type;
			if ($scope.types.indexOf(type) === -1) {
				if (type) { $scope.types.push(type) };
			}
		});
		$scope.types.push('Other');
	}
	Parse.getJob().then(successHandler, errorHandler);

	$scope.typeFilter = function (type) {
		$scope.jobs = $filter('filter')($rootScope.jobs, function (job) {
			if ( type === 'All' ) { return true; }
			else if ( type === 'Other' ) {
				return (job.attributes.type) ? false:true;
			}
			return job.attributes.type === type;
		});
	};
	$scope.cursor = 0;
	$scope.prev = function () {
		if ($scope.cursor > 0) { $scope.cursor--; }
	};
	$scope.next = function () {
		if ($scope.cursor+3 < $scope.types.length) { $scope.cursor++; }
	};

    $scope.viewSingle = function(id){
    	$location.path('/job/' + id);
    };
    $scope.edit = function (id) {
		$location.path('/job/' + id + '/edit');
	};
	$scope.view = function (index) {
		$scope.animate = false;
		$rootScope.loading = true;
		$timeout(function () {
			$scope.animate = true;
			Parse.getJobById(index).then(singleSuccess, errorHandler);
		}, 1000);
	};
	
	$scope.more = function () {
		var route = "apply('" + $scope.current.id + "')";
		var details =   '<br><div class="job-modal text-center">'+
						'<h1>' + $scope.current.attributes.title + '</h1>' +
						'<h3>'+ $scope.current.attributes.city + ',' + $scope.current.attributes.state + '</h3>'+
						'<img src="' + $scope.current.attributes.img + '" class="img-responsive margin-left20 width60"><br>'+
						$scope.current.attributes.description + '</br>'+
						'<a ng-click="' + route + '" class="text-center width60 btn btn-primary turq-color btn-lg btn-perspective inline">Apply</a></div><br>';
		Error(null, details, 'lg');	
	};
	$scope.truncHtml = function (data) {
		var str = $filter('limitTo')(data, 200)+"..."; 
		return $sce.trustAsHtml(str);
	};
}]);

window.app.controller('OpeningCtrl', ['$scope', '$route', '$filter','Parse', '$location', 'Error', function ($scope, $route, $filter, Parse, $location, Error) {

	function successJob(response){
		$scope.job = response;
		Parse.get().then(successApp, errorHandler);
	}
	function successApp(response){
		$scope.apps = response;
		$scope.applications = $filter('filter')($scope.apps, $scope.job.id);
		$scope.$apply();
	}
	function errorHandler(error){
		Error(error, 'Sorry the job you are looking for does not exist');
		$location.path('/jobs');
	}

	Parse.getJobById($route.current.params.id).then(successJob, errorHandler);

	$scope.edit = function (id) {
		$location.path('/job/' + id + '/edit');
	};
	$scope.view = function (id) {
		$location.path('/app/' + id);
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

window.app.controller('AddJobCtrl', ['$scope', 'Parse', '$window', 'Error', 'imgType', function ($scope, Parse, $window, Error, imgType) {

	function successHandler(res){
		$window.location.href = '/#/job/' + res.id;
        Error(null, 'Successfully Added Job Post!');
    }

    function errorHandler(){
        Error(error, 'Their was a problem with your request please try again.');
    }
    $scope.data = {};
	$scope.submit = function(){
		$scope.data.img = imgType($scope.data.type);
		Parse.postJob($scope.data).then(successHandler, errorHandler);
	}
    $scope.options = {
        height: 300,
        focus: true
        // toolbar: [
        //     ['style', ['bold', 'italic', 'underline', 'clear']],
        //     ['fontsize', ['fontsize']],
        //     ['color', ['color']],
        //     ['para', ['ul', 'ol', 'paragraph']],
        //     ['height', ['height']]
        // ]
    }
}]);

window.app.factory('imgType', [function () {
	var res_url  = 'http://i1370.photobucket.com/albums/ag251/anthroisphoto/WUWTC/Restaurant-Kitchen-Design-9_zps7fc18ae8.jpg~original';
	var	bar_url  = 'http://i1370.photobucket.com/albums/ag251/anthroisphoto/WUWTC/San_Diego_Comic-Con_2011_-_Gaslamp_archway_5948999911_zps7078606f.jpg~original';
	var	club_url = 'http://i1370.photobucket.com/albums/ag251/anthroisphoto/WUWTC/nightlife-zadar-top-6-clubs-2-1024x768_zpsc6af5eb4.jpg~original';
	var	def_url  = 'http://i1370.photobucket.com/albums/ag251/anthroisphoto/WUWTC/san-diego-party_zps66cf14bd.jpg~original';

	return function (type) {
		if (typeof type == 'undefined') { return def_url; }
		else if (type == 'Restaurant') { return res_url; }
		else if (type == 'Bar') { return bar_url; }
		else if (type == 'Club') { return club_url; }
		else { return def_url; }
	};
}]);
