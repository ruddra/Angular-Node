angular.module('authService', [])
    .factory('Auth', function ($http, $q, AuthToken) {
    	 return $http.post('/api/login') 
    })