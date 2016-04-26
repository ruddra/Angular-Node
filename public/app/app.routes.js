angular.module('appRoutes', ['ngRoute'])
      .config(function($routeProvider, $locationProvider) {
            /* body... */
            $routeProvider
                  .when('/', {
                        templateUrl: 'app/views/pages/home.html',
                        contorller: 'MainController',
                        controllerAs: 'main'
                  })

            .when('/login', {
                  templateUrl: 'app/views/pages/login.html'
            })

            .when('/logout', {
                  templateUrl: 'app/views/pages/home.html'
            })

            .when('/signup', {
                  templateUrl: 'app/views/pages/signup.html'
            })

            $locationProvider.html5Mode(true);

      })