angular.module('userCtrl', ['userService'])
	.controller('UserController', function($location, $window, User) {
		var vm = this;
		vm.message = '';

		vm.signupUser = function() {
			return User.createUser(vm.userData.username, vm.userData.password, vm.userData.name)
				.success(function(response) {
					console.log(response);
					vm.userData = {};
					vm.message = response.message;
					$window.localStorage.setItem('token', response.token);
					$location.path('/');
				});
		};

		vm.allUsers = function() {
			return User.all()
				.success(function(data) {
					vm.users = data;
				})
		}
	})