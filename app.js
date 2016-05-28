var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/home', {
         templateUrl: 'pages/home.html',
         controller: "mainController"
    })
    .when('/weather', {
         templateUrl: 'pages/weather.html',
         controller: 'weatherController'
    })
});

// services
myApp.service('cityService', )


// controllers
myApp.controller('mainController', ['$scope', function($scope){
    console.log('loading main controller...');
}]);

myApp.controller('weatherController', ['$scope', function($scope){
    console.log('loading weather controller...');
}]);



