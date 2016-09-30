'use strict';

angular.module('sachaAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('catalogo', {
        url: '/catalogo',
        templateUrl: 'app/producto/catalogo/catalogo.html',
        controller: 'CatalogoCtrl',
        authenticate: true
      });
  });
