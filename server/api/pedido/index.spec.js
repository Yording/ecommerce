'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pedidoCtrlStub = {
  index: 'pedidoCtrl.index',
  show: 'pedidoCtrl.show',
  create: 'pedidoCtrl.create',
  update: 'pedidoCtrl.update',
  destroy: 'pedidoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pedidoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './pedido.controller': pedidoCtrlStub
});

describe('Pedido API Router:', function() {

  it('should return an express router instance', function() {
    pedidoIndex.should.equal(routerStub);
  });

  describe('GET /api/pedidos', function() {

    it('should route to pedido.controller.index', function() {
      routerStub.get
        .withArgs('/', 'pedidoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/pedidos/:id', function() {

    it('should route to pedido.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'pedidoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/pedidos', function() {

    it('should route to pedido.controller.create', function() {
      routerStub.post
        .withArgs('/', 'pedidoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/pedidos/:id', function() {

    it('should route to pedido.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'pedidoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/pedidos/:id', function() {

    it('should route to pedido.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'pedidoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/pedidos/:id', function() {

    it('should route to pedido.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'pedidoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
