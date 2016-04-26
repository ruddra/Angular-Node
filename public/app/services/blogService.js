angular.module('blogService', [])
   .factory('Blog', function($http) {
      var blogFactory = {};

      blogFactory.createBlog = function(blogData) {
         return $http.post('/api/blogs', blogData);
      };
      blogFactory.allBlog = function() {
         return $http.get('/api/blogs');
      };
      return blogFactory;
   })
   .factory('socketio', function($rootScope) {
         var socket = io.connect();
         return {
            on: function(eventName, callback) {
               socket.on(eventName, function() {
                  var args = arguments;
                  $rootScope.$apply(function() {
                     callback.apply(socket, args)
                  });
               });
            },

         emit: function(eventName, data, emit) {
            socket.emit(eventName, data, function() {

               var args = arguments;
               $rootScope.$apply(function(callback) {
                  if (callback) {
                     callback.apply(socket, args);
                  };
               });
            });
         }
      };
   });