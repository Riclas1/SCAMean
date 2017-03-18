var app = angular.module('pcuApp', ['ngRoute', 'ngResource']).run(function() {
	/*$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
	};*/
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: '/partial/main.html',
			    //templateUrl: '/partial/login.html',
			controller: 'mainController'
					
		})
		.when('/main', {
			templateUrl: '/partial/main.html',
			controller: 'mainController'
		})	
		//the login display
		.when('/login', {
			templateUrl: '/partial/login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/setup', {
			templateUrl: '/partial/setup.html',
			controller: 'authController'
		});
});

/*app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});*/

app.controller('mainController',['$scope', '$log', '$http', function($scope, $log, $http){
	$scope.$log = $log;
	$scope.value = "";
	$scope.Pos= "";
	$scope.Drehzahl = "";
	$scope.ajaxPost = function(slot,value){
		$scope.value = "senden";
		var req = {
 				method: 'POST',
 				url: '/api/Umrichter/' + slot,
 				headers: {
   					'Content-Type': undefined
	 			},
 				data: value  
		}
		$http(req).then(function(){$scope.value = "gesendet";}, function(){$scope.value = "fehler";});
	};
	
	$scope.$on('$viewContentLoaded', function(event) {
		$scope.value = "1";
	});

	
}]);

app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/main');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
	
});
