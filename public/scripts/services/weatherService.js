"use strict";

window.app.service('weatherService', ['$q', '$http', function($q, $http){
    var authorizationResult = false;
    return {
        get: function(city,state){
           var q = $q.defer();

           $http.jsonp("http://api.wunderground.com/api/1831e347efa686a0/conditions/q/" +state+"/"+city+".json?callback=JSON_CALLBACK")
               .success(function(data){
                   console.log('success');
                   q.resolve(data);
               })
               .error(function(data){
                   q.reject(data);
               });
            return q.promise;
        },
        fb: function() {
            var q = $q.defer();
            $http.get('https://graph.facebook.com/mahaska?fields=likes')
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise

        }
    }
}]);

