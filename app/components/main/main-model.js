angular.module('ngTest')
  .factory('MainModel', ['_',function MainModel(_){
  'use strict';
  var Main =function() {};
  //Methods that inherit via the prototype chain can be changed universally for all instances
  Main.prototype.oddFilter = function(range) {
     var rangeCopy = angular.copy(range);
     if (_.isUndefined(rangeCopy)) {
         return;
     }
     return _(rangeCopy).filter(function(num) {
            return num % 2 !== 0;
          });
    };

  Main.prototype.addToList = function(num,list){
    var rangeCopy = angular.copy(list);
    if (_.isUndefined(rangeCopy)) {
         return;
     }
     console.log(rangeCopy);
    return _(rangeCopy).map(function(x) {
            return x + num;
          });
    };
    Main.prototype.sum = function(list) {
    var rangeCopy = angular.copy(list);
    if (_.isUndefined(rangeCopy)) {
         return;
     }

    return _(rangeCopy).reduce(function(x,y) {
            return x + y;
          },0);
    };

  return Main;
}]);
