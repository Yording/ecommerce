'use strict';

describe('Controller: PedidoCtrl', function () {

  // load the controller's module
  beforeEach(module('sachaAppApp'));

  var PedidoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PedidoCtrl = $controller('PedidoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
