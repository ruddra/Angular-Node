angular.module('userCtrl', ['userService'])
	.controller('UserController', function ($location, $window, User) {
		 var vm = this;
		 vm.message = '';
		 vm.signupUser = function (userData) {
		 	 return User.createUser(userData)
		 	             .success(function (response) {
		 	             	 vm.userData = {};
		 	             	 vm.message = response.data.message;
		 	             	 $window.localStorage.setItem('token', response.data.token);
		 	             	 $location.path('/');
		 	             });
		 };

		 vm.allUsers = function () {
		 	 return User.all()
		 	            .success(function (data) {
		 	            	 vm.users = data;
		 	            })
		 }
	})