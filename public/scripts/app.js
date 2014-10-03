(function(window){
'use strict';

  window.app = angular.module('hrdashApp', ['ngRoute', 'summernote', 'ngSanitize', 'ui.bootstrap', 'duScroll']);

  window.app.config(function ($httpProvider) {
        var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
            var success = function (response) {
                return response;
            };

            var error = function (response) {
                if (response.status === 401) {
                    //redirect them back to login page
                    $location.path('/login');

                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            };

            return function (promise) {
                return promise.then(success, error);
            };
        }];

        $httpProvider.responseInterceptors.push(logsOutUserOn401);
    });

  window.app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'OpeningList'
      })
      .when('/applications', {
        templateUrl: 'views/application-list.html',
        controller: 'ApplicationsCtrl'
      })
      .when('/jobs', {
        templateUrl: 'views/jobs-list-view.html',
        controller: 'OpeningList'
      })
      .when('/new-job', {
        templateUrl: 'views/add-job.html',
        controller: 'AddJobCtrl'
      })
      .when('/job/:id', {
        templateUrl: 'views/job.html',
        controller: 'OpeningCtrl'
      })
      .when('/apps/:id', {
        templateUrl: 'views/app.html',
        controller: 'ApplicationCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/job/:id/edit', {
         templateUrl: 'views/edit.html',
         controller: 'OpeningList'
      })
      .when('/apply/:id', {
        templateUrl: 'views/apply.html',
        controller: 'applyCtrl'
      })
      .when('/account/:name', {
        templateUrl: 'views/account.html',
        controller: 'accountCtrl'
      })
      .when('/error', {
        templateUrl: '404.html'
      })
      .when('/mobile', {
        templateUrl: 'mobile.html',
        controller: 'mobileCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

  window.app.run(function ($rootScope, $location) {
     var isNotMobile = (function() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
          return !check;
      })();

    if (!isNotMobile) { $location.path('/mobile'); }
  });

  window.app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
      $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function(current,next){
        window.scrollTo(0,0);
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.loading = false;
    });
  });

   window.app.run(function ($rootScope, $location, ParseLoginService, RoleService) {

        // enumerate routes that don't need authentication
        var routesThatDontRequireAuth = ['/login', '/apply', '/home', '/mobile'];
        var routesForAdmin = ['/jobs', '/applications','/new-job', '/job', '/apps', '/account', ];

        // check if current location matches route
        var routeClean = function (route) {
            return _.find(routesThatDontRequireAuth,
                function (noAuthRoute) {
                    return _.str.startsWith(route, noAuthRoute);
                });
        };

        // check if current location matches route
        var routeAdmin = function (route) {
            return _.find(routesForAdmin,
                function (noAuthRoute) {
                    return _.str.startsWith(route, noAuthRoute);
                });
        };

        $rootScope.$on('$routeChangeStart', function (ev, to, toParams, from, fromParams) {
            // if route requires auth and user is not logged in
            if (!routeClean($location.url()) && !$rootScope.loggedIn()) {
                // redirect back to login
                ev.preventDefault();
                $location.path('/login');
            }
            else if (routeAdmin($location.url()) && !RoleService.validateRoleAdmin($rootScope.currentUser.attributes)) {
                // redirect back to login
                ev.preventDefault();
                $location.path('/error');
            }
        });
    });
}(window));
