 var underscore = angular.module('underscore', []);
  underscore.factory('_', function() {
    'use strict';

    return window._; // assumes underscore has already been loaded on the page
  });

