angular.module('MyBlog', ['appRoutes', 'mainCtrl', 'authService', 'userService', 'userCtrl', 'blogCtrl', 'blogService'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptorFactory')
})