window.app.filter('unique', function($parse) {
    return function(input, filter) {
        if(angular.isArray(input)) {

            //unique key
            var getter = $parse(filter);

            return _.uniq(input, function(elm) {
                return getter(elm);
            });
        }
        return input;
    }
});