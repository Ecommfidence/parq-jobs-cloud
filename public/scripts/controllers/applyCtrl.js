window.app.controller('applyCtrl', ['$scope', 'Parse', '$route', '$window', 'Error', '$rootScope', function ($scope, Parse, $route, $window, Error, $rootScope){
  
  $scope.data = {};
  $rootScope.loading = true;
  Parse.upload();
  Parse.getJobById($route.current.params.id).then(successJob, errorHandler);

  $scope.validate = function(data){
    for ( var p in data ) {
      if ( data.hasOwnProperty( p ) ) {
        Parse(data);
        return false;
      } else {
        alert('Please Fill out the Job Form');
      }
    }
    return true;
  }

  $scope.post = function(data){
    data.votes=0;
    Parse.post(data);
    $window.location.href = '/#/';
  }

  $scope.narrow = function (city, id) {
    if(city==='ALL') { $scope.myFilter = null; }
    else { $scope.myFilter = {attributes: { loc: city}}; }
    $scope.selected = id;
  }

  function successJob(response){
    $rootScope.loading = false;
    $scope.job = response;
    $scope.data.job = $scope.job.id;
    $scope.data.job_title = $scope.job.attributes.title;
  }
  function errorHandler(error){
    $rootScope.loading = false;
    Error(error, 'Their was a problem with your request please try again.');
    $window.location.href = '/#/';
  }

}]);

