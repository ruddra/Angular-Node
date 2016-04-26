angular.module('userService', [])
	.factory('User', function($http) {

		var userFactory = {};

		userFactory.createUser = function(username, password, name) {
			return $http.post('/api/signup', {
				username: username,
				password: password,
				name: name
			});
		};

		userFactory.all = function() {
			return $http.get('/api/all-user');

		};
		return userFactory;

	})