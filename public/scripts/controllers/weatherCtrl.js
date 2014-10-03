window.app.controller('weatherCtrl', ['$scope', 'weatherService', '$rootScope', function($scope, weatherService, $rootScope){
    $scope.weatherArray = [];

    function successHandler(data){
       $scope.weatherArray.push(data.current_observation);
    }

    function successFb(data){
        $scope.fb = data.likes;
    }

    function errorHandler(error){
        console.log(error);
    }


    $scope.weatherGet = function(city, state){
        weatherService.get(city, state).then(successHandler, errorHandler);
    };

    weatherService.fb().then(successFb,errorHandler);



}]);


