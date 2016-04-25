angular.module('userService', [])
	.factory('User', function ($http) {
		
		var userFactory = {};

		userFactory.createUser = function (userData) {
			 return $http.post('/api/signup', userData);
		};

		userFactory.all = function () {
			 return $http.get('/api/all-user');

		};
		return userFactory; 

	})