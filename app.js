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
    .when('/weather/:days', {
         templateUrl: 'pages/weather.html',
         controller: 'weatherController'
    })
});

// services
myApp.service('cityService', function(){
    this.city="San Francisco, CA";
})


// controllers
myApp.controller('mainController', ['$scope','cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
    console.log('loading main controller...');
}]);

myApp.controller('weatherController', ['$scope',  '$resource','$routeParams' ,'cityService', function($scope, $resource, $routeParams, cityService){
    console.log('loading weather controller...');
    $scope.city = cityService.city;
    
    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=b4b33a0e922f906fb393d3b81c5b1b13", 
                                  {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    
    $scope.days = $routeParams.days || 2;
    $scope.weatherResult = $scope.weatherApi.get({q:$scope.city, cnt: $scope.days});
    
    
    
    $scope.convertToK = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    $scope.convertDate = function(dt) {
        return new Date(dt * 1000);
    }
    console.log($scope.weatherResult);
}]);

myApp.directive("weatherReport", function() {
   return {
       restrict: 'E',
       templateUrl: 'directives/weatherReport.html',
       replace: true,
       scope: {
           weatherDay: "=",
           convertToStandard: "&",
           convertToDate: "&",
           dateFormat: "@"
       }
   }
});
