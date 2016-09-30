'use strict';

angular.module('sachaAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pedido', {
        url: '/pedido',
        templateUrl: 'app/pedido/pedido.html',
        controller: 'PedidoCtrl',
        controllerAs: 'pedido',
        authenticate: 'true'
      });
  });
