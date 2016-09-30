'use strict';

var app = require('../..');
import request from 'supertest';

var newPedido;

describe('Pedido API:', function() {

  describe('GET /api/pedidos', function() {
    var pedidos;

    beforeEach(function(done) {
      request(app)
        .get('/api/pedidos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pedidos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      pedidos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/pedidos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pedidos')
        .send({
          name: 'New Pedido',
          info: 'This is the brand new pedido!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPedido = res.body;
          done();
        });
    });

    it('should respond with the newly created pedido', function() {
      newPedido.name.should.equal('New Pedido');
      newPedido.info.should.equal('This is the brand new pedido!!!');
    });

  });

  describe('GET /api/pedidos/:id', function() {
    var pedido;

    beforeEach(function(done) {
      request(app)
        .get('/api/pedidos/' + newPedido._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pedido = res.body;
          done();
        });
    });

    afterEach(function() {
      pedido = {};
    });

    it('should respond with the requested pedido', function() {
      pedido.name.should.equal('New Pedido');
      pedido.info.should.equal('This is the brand new pedido!!!');
    });

  });

  describe('PUT /api/pedidos/:id', function() {
    var updatedPedido;

    beforeEach(function(done) {
      request(app)
        .put('/api/pedidos/' + newPedido._id)
        .send({
          name: 'Updated Pedido',
          info: 'This is the updated pedido!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPedido = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPedido = {};
    });

    it('should respond with the updated pedido', function() {
      updatedPedido.name.should.equal('Updated Pedido');
      updatedPedido.info.should.equal('This is the updated pedido!!!');
    });

  });

  describe('DELETE /api/pedidos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/pedidos/' + newPedido._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pedido does not exist', function(done) {
      request(app)
        .delete('/api/pedidos/' + newPedido._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
