'use strict';

/**
 * @ngdoc function
 * @name hrdashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hrdashApp
 */
window.app.controller('MainCtrl', ['$scope', 'ParseLoginService', '$rootScope', '$location', function ($scope, ParseLoginService, $rootScope, $location) {

  $rootScope.currentUser = ParseLoginService.getCurrent();
  console.log($rootScope.currentUser);

  $rootScope.loggedIn = function(){
    if ($rootScope.currentUser === null){
      return false;
    } else {
      return true;
    }
  };

  function backtoLogin(){
     $rootScope.currentUser = null;
     $location.path("/login");
  }

  function errorHandler(error){
     console.log(error);
  }

  $scope.logout = function(){
    ParseLoginService.logout().then(backtoLogin, errorHandler);
  };
}]);
