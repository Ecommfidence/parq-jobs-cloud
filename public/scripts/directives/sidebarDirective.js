window.app.directive('sidebar', function(){
    return {
        restrict: 'A',
        link: function(scope, elm, attrs){
          elm.on('click', function(){
              $(".top-navbar").toggleClass("toggle-left");
              $(".sidebar-left").toggleClass("toggle-left");
              $(".sidebar-right").toggleClass("toggle-left");
              $(".page-content").toggleClass("toggle-left");
          });
        }
    };
});
