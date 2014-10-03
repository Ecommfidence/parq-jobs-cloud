'use strict';

window.app.controller('BlogsCtrl', ['$scope', '$sce', '$filter', 'Parse', function ($scope, $sce, $filter, Parse) {
	function successHandler(response) {
		$scope.blogs = response;
		$scope.$apply();
	}
	function errorHandler (error) {
		alert(error);
	}
	Parse.getBlogs().then(successHandler, errorHandler);

	$scope.truncHtml = function (data) {
		var str = $filter('limitTo')(data, 200)+"...";
		return $sce.trustAsHtml(str);
	};
}]);

window.app.controller('AddBlogCtrl', ['$scope', 'Parse', function ($scope, Parse) {

	function successHandler(response) {
		alert("Your post has been saved");
		$scope.data = {};
	}
	function errorHandler (error) {
		alert(error);
	}

	$scope.data = {};

	$scope.post = function () {
		$scope.data.votes = 0;
		// $scope.data.tags = $scope.data.tags.split(',');
		Parse.postBlog($scope.data).then(successHandler, errorHandler);
	}
}]);

window.app.controller('EditBlogCtrl', ['$scope', '$sce', '$location', 'blog', 'Parse', function ($scope, $sce, $location, blog, Parse) {
	$scope.editForm = false;
	$scope.blog = blog;
	$scope.data = $scope.blog.attributes;

	function successHandler (response) {
		response.save($scope.data);
		$scope.editForm = false;
		alert("Your blog has been edited. View link to see changes on the site.");
	};
	function destroyHandler (response) {
		response.destroy({});
		alert('Successfully Deleted Job');
		location.reload();
	};
	function errorHandler (error) {
		alert(error);
	};

	$scope.update = function () {
		Parse.getBlogById($scope.blog.id).then(successHandler, errorHandler);
		$location.path('/blogs');
	};
	$scope.cancel = function () {
		$scope.data = $scope.blog.attributes;
		$scope.editForm = false;
	}
	$scope.delete = function () {
		if (confirm("Are you sure? This can not be undone!")) {
			Parse.getBlogById($scope.blog.id).then(destroyHandler, errorHandler);
		}
		$location.path('/blogs');
	}
	$scope.trust = function (data) {
		return $sce.trustAsHtml(data);
	};
}]);
