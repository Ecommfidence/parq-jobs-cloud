
window.app.controller('accountCtrl', ['$scope','Parse', 'Error','$window', '$rootScope', function($scope, Parse, Error, $window, $rootScope){
  $rootScope.types = {};
  function successHandler(res){
    $window.location.href = '/#/';
        Error(null, 'Successfully Added Job Post!');
  }

  function errorHandler(){
      Error(error, 'Their was a problem with your request please try again.');
  }

  function success(data){
    $rootScope.types = data;
    console.log($rootScope.types);
  }

  Parse.logoUpload();

  Parse.getTypes().then(success,errorHandler);

  $scope.uploadProfile = function(){
    Parse.profile();
    window.scrollTo(0,0);
    Error(null, 'Successfully Added Job Post!');
  };
  $scope.uploadLogo = function(){
    Parse.logo();
    window.scrollTo(0,0);
    Error(null, 'Successfully Added Logo!');
  };
  $scope.postTypes = function(data){
    Parse.postTypes(data);
    window.scrollTo(0,0);
    Error(null, 'Successfully Added Job Type!');
  }

}]);
