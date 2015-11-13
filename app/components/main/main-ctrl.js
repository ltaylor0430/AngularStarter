angular.module('ngTest')
  .controller('angularTestCtrl',['$scope','_','MainModel', function angularTestCtrl($scope, _ , MainModel){
    'use strict';
    $scope.toggleShowHide = false;
    $scope.txt1 ='100';
    $scope.txtRange = [10];
    $scope.mapped =0;
    $scope.reduced =0;
    var model = new MainModel();
    $scope.oddOnly =model.oddFilter(parseInt($scope.txt1));

    $scope.updateShowHide = function() {
        $scope.toggleShowHide = !$scope.toggleShowHide;
    };

    $scope.txt1Change = function() {
        if (_.isNaN($scope.txt1) ) {
          $scope.txtRange = 0;
        } else {
          if (parseInt($scope.txt1) >100) {
            return;
          }
          $scope.txtRange = _.range($scope.txt1);
          $scope.oddOnly  = model.oddFilter($scope.txtRange);
          $scope.mapped   = model.addToList(2,$scope.oddOnly);
          $scope.reduced  = model.sum($scope.mapped);
        }
    };
    //call init function on controller load
    $scope.init = function() {
     $scope.txt1Change();
    };
    $scope.init();
}]);
