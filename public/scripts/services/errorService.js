window.app.factory('Error', ['errAlert', function (errAlert) {
	return function (err, message, size) {
		size = (size)?size:'sm';
		if (message) {
			if (message.charAt(0) != '<') { message = '<br><div class="text-center"><h2 class="text-center">' + message + '</h2><a class="btn btn-danger" ng-click="cancel()">Done</a></div><br>' }
			errAlert(message, size);
			if(err) console.log(err)
		} else {
			errAlert(err, size);
			console.log(err);
		}
	};
}]);

window.app.factory('errAlert', ['$modal', function ($modal) {
	return function (mes, size) {
		$modal.open({
			template: mes,
			controller: ErrorInstanceCtrl,
			size:size
		});
	};
}]);

var ErrorInstanceCtrl = function ($scope, $window, $modalInstance) {
	$scope.apply = function (id) {
		$modalInstance.dismiss();
		$window.location.href = '#/apply/' + id;
	}
	$scope.cancel = function () {
		$modalInstance.dismiss();
	}
}