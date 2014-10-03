window.app.directive('cameraz', function(cameraGet){
  return {
    restrict: 'A',
    link: function(scope,elm,attrs){
      CameraTag.setup();

      // CameraTag.observe('002', 'initialized', function(){
      //  alert('this video has been published!');
      //  CameraTag.addVideoData({'hello': 'world'});
      // });

      cameraGet.get().then(function(data){
        console.log(data);
      });
    }
  };

});


window.app.factory('cameraGet', ['$q', '$http', function($q, $http){

  return {
    get: function(){
      var q = $q.defer();
      $http.jsonp('https://cameratag.com/cameras/videos.json?api_key=Dh8XQMcdnj8ukTv5JCvS&callback=JSON_CALLBACK')
        .success(function(data){
          q.resolve(data);
        })
        .error(function(data){
          q.reject(data);
        })
      return q.promise;
    }



  }
}]);
