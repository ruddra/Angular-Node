angular.module('blogCtrl', ['blogService'])

.controller('BlogController', function(Blog, socketio) {
	var vm = this;
	// vm.blogs = [];

	Blog.allBlog()
		.success(function(data) {
			vm.blogs = data.blogs;
		});

	vm.createBlog = function() {
		Blog.createBlog(vm.blogData)
			.success(function(data) {
				vm.blogData = {};
				vm.blogs.push(data.data);
			});
	};

	socketio.on('blog', function (data) {
		 
	})
});