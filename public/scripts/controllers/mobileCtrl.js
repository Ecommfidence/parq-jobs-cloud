'use strict';

window.app.controller('mobileCtrl', ['$scope', 'Parse', 'Error', function ($scope, Parse, Error) {
	function successHandler (response) {
		$scope.jobs = response;
		$scope.jobscount = response.length;
		$scope.$apply();
	}
	function errorHandler (err) {
		console.log(err);
	}

	Parse.getJob().then(successHandler, errorHandler);

	$scope.more = function () {
		Error(null, '<br><div class="job-modal"><p>In order to apply for this position please view on a desktop, or if desktop not readily available email to <a href="mailto:clubjobs@wsa.com">clubjobs@wsa.com</a></p><p>Be sure to include</p><ul><li>Name</li><li>Position Applying For</li><li>Address</li><li>Phone Number</li><li>Resume</li><li>Cover Letter</li><li>Fun Video About Yourself</li></ul></div>')
	}
}]);