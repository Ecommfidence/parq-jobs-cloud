window.app.controller('jobSingleCtrl', ['$scope', '$location', 'Parse', '$window', '$route', 'Error', function ($scope, $location, Parse, $window, $route, Error) {

    function successHandler(response){
        $scope.job = response;
        $scope.data = response.attributes;
        $scope.$apply();
    }
    function destroyHandler(response){
        response.destroy({});
        Error(null, 'You have succesfully deleted job: ' + response.attributes.title);
        $window.location.href =  '#/jobs';
    }
    function updateHandler(response){
        response.save($scope.data);
        Error(null, 'You have succesfully updated job: ' + $scope.data.title);
        $window.location.href =  '#/job/' + response.id;
    }
    function errorHandler(error){
        Error(error, 'Their was a problem with your request, please try again.');
    }

    Parse.getJobById($route.current.params.id).then(successHandler, errorHandler);

    $scope.delete = function(){
        if (confirm('Do you really want to delete this listing?')) {
            Parse.getJobById($route.current.params.id).then(destroyHandler, errorHandler);
        }
    }
    $scope.update = function (id) {
        Parse.getJobById(id).then(updateHandler, errorHandler);
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