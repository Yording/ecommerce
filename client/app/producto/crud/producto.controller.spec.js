'use strict';

describe('Controller: ProductoCtrl', function () {

  // load the controller's module
  beforeEach(module('sachaAppApp'));

  var ProductoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductoCtrl = $controller('ProductoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
