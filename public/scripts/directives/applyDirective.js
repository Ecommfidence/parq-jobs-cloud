'use strict';

var current, next, previous; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

window.app.directive('next', function(){
  return {
    restrict: 'A',
    link: function(scope,elm,attrs){
      elm.on('click', function(){

        if(animating) return false;
        animating = true;


        current = angular.element(elm).parent();
        next = angular.element(elm).parent().next();

        angular.element('#progressbar li').eq(angular.element("fieldset").index(next)).addClass('active');

        //Next Set

        next.show();

        // //Hide Current
      //hide the current fieldset with style
      	current.animate({opacity: 0}, {
      		step: function(now, mx) {
      			//as the opacity of current_fs reduces to 0 - stored in "now"
      			//1. scale current_fs down to 80%
      			scale = 1 - (1 - now) * 0.2;
      			//2. bring next_fs from the right(50%)
      			left = (now * 50)+"%";
      			//3. increase opacity of next_fs to 1 as it moves in
      			opacity = 1 - now;
      			current.css({'transform': 'scale('+scale+')'});
      			next.css({'left': left, 'opacity': opacity});
      		},
      		duration: 800,
      		complete: function(){
      			current.hide();
      			animating = false;
      		},
      		//this comes from the custom easing plugin
      		easing: 'easeInOutBack'
      	});
      });
    }
  };
});

window.app.directive('previous', function(){
    return {
      restrict: 'A',
      link: function(scope,elm,attrs){

        angular.element(elm).click(function(){
        	if(animating) return false;
        	animating = true;

        	current = angular.element(elm).parent();
        	previous = angular.element(elm).parent().prev();

        	//de-activate current step on progressbar
        	angular.element("#progressbar li").eq(angular.element("fieldset").index(current)).removeClass("active");

        	//show the previous fieldset
        	previous.show();

        	//hide the current fieldset with style
        	current.animate({opacity: 0}, {
        		step: function(now, mx) {
        			//as the opacity of current_fs reduces to 0 - stored in "now"
        			//1. scale previous_fs from 80% to 100%
        			scale = 0.8 + (1 - now) * 0.2;
        			//2. take current_fs to the right(50%) - from 0%
        			left = ((1-now) * 50)+"%";
        			//3. increase opacity of previous_fs to 1 as it moves in
        			opacity = 1 - now;
        			current.css({'left': left});
        			previous.css({'transform': 'scale('+scale+')', 'opacity': opacity});
        		},
        		duration: 800,
        		complete: function(){
        			current.hide();
        			animating = false;
        		},
        		//this comes from the custom easing plugin
        		easing: 'easeInOutBack'
        })
      });
    }
  };
});
