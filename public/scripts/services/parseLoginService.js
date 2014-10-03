'use strict';

window.app.factory('RoleService', function ($http) {
    var adminRoles = ['admin', 'editor'];
    var otherRoles = ['user'];

    return {
        validateRoleAdmin: function (currentUser) {
            return currentUser ? _.contains(adminRoles, currentUser.role) : false;
        },

        validateRoleOther: function (currentUser) {
            return currentUser ? _.contains(otherRoles, currentUser.role) : false;
        }
    };
});

window.app.factory('ParseLoginService', ['parseConstant', '$q', function(parseConstant, $q){

    return {
        login: function(data){
            var username = data.username;
            var password = data.password;
            return Parse.User.logIn(username, password);
        },
        isLoggedIn: function () {
            var user = Parse.User.current();
            return  user !== null;
        },
        getCurrent: function(){
            return Parse.User.current();
        },
        logout: function(){
            var q = $q.defer();
            Parse.User.logOut();
            q.resolve();
            return q.promise;
        }
    };
}]);

window.app.factory('SessionService', function () {
    return {
        currentUserName: null
    };
});
