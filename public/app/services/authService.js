angular.module('authService', [])

    .factory('Auth', function ($http, $q, AuthToken) {
    	var authFactory = {};
    	authFactory.login = function (username, password) {
	    	return $http.post('/api/login', {
	    		username: username,
	    		password: password
	    	}).success(function (data) {
	    		 AuthToken.setToken(data.token);
	    	});	  
    	};
    	authFactory.logout = function () {
    		 AuthToken.setToken();
    	};

    	authFactory.isLoggedIn = function () {
    		 if(AuthToken.getToken()){
    		 	return true;
    		 }else{
    		 	return false;
    		 };
    	};
        
        authFactory.getUser = function () {
        	 if(AuthToken.getToken()){
        	 	return $http.get('/me');
        	 }else{
        	 	return $q.reject({message: "User isn't logged in"});
        	 };
        };
        

        return authFactory;
    })

    .factory('AuthToken', function ($window) {
    	 var authTokenFactory = {};
         
         authTokenFactory.setToken = function (token) {
         	 if(token){
         	 	$window.localStorage.setItem('token', token);
         	 }else{
         	 	$window.localStorage.removeItem('token');
         	 };
         };

         authTokenFactory.getToken = function () {
         	 return $window.localStorage.getItem('token');
         };

         return authTokenFactory;

    })

    .factory('AuthInterceptorFactory', function ($q, $location, AuthToken) {
    	var interceptorFactory = {};

    	interceptorFactory.request = function (config) {
    		 var token = AuthToken.getToken();
    		 if(token){
                 config.headers['x-access-token'] = token
    		 };

    		 return config;

    	};

    	interceptorFactory.responseError = function (response) {
    		 if(response.status == 403){
    		 	return $location.path('/login');
    		 };

    		 return $q.reject(response);
    	};

        return interceptorFactory;
    })