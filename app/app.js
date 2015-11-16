var app = angular.module('ngTest',['ngSanitize','ui.router','underscore'])
.config(function($stateProvider, $urlRouterProvider) {
  'use strict';
 //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/",
      templateUrl: "main/main.html",
      controller:'angularTestCtrl',
      controllerAs: 'main'
    });
});
