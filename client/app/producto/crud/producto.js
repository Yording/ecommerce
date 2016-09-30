'use strict';

angular.module('sachaAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('producto', {
        url: '/producto',
        templateUrl: 'app/producto/crud/producto.html',
        controller: 'ProductoCtrl',
        authenticate: true,
        controllerAs: 'producto'
      });
  });
