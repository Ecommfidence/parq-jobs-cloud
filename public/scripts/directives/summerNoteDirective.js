window.app.directive('summernote', function(){
   return {
       restrict: 'A',
       link: function(scope,elm,attrs){
           if (elm.length > 0){
               elm.summernote({
                   height: attrs.height || 200
               });
           }
       }
   }
});
