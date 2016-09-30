'use strict';

angular.module('sachaAppApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    transclude: true,
    controller: 'NavbarController',
    controllerAs: 'nav'
  }));
