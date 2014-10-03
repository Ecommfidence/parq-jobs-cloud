'use strict';

window.app.controller('loginCtrl', ['$scope', '$location', '$rootScope', 'ParseLoginService', function($scope, $location, $rootScope, ParseLoginService){
  if ($rootScope.loggedIn() !== true){
    $location.path('/login');
  }

  function loginSuccessful(user){
    console.log('success');
    $rootScope.$apply(function(){
      $rootScope.currentUser = Parse.User.current();
      $location.path('/');
    });
  }

  function loginUnsuccessful(user,error){
    alert('Error' + error.message + "(" + error.code + ")");
    console.log('ERROR');
  }

  $scope.login = function(data){
      ParseLoginService.login(data).then(loginSuccessful,loginUnsuccessful);
  };

}]);
