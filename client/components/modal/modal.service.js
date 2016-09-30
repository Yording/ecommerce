'use strict';

angular.module('sachaAppApp')
  .factory('Modal', function ($rootScope, $modal,uiGridConstants,ngCart) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope = {}, modalClass = 'modal-default', size = 'sm', templateUrl = 'components/modal/default/modal.html', controller = '') {
      var modalScope = $rootScope.$new();

      angular.extend(modalScope, scope);
      return $modal.open({
       templateUrl: templateUrl,
       windowClass: modalClass,
       scope: modalScope,
       size: size,
       controller: controller
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete(del = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>¿Estas seguro que quieres eliminarlo?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger','md','components/modal/default/modal.html');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      },
      //Modales de los productos
      products:{
        insert(cb,product){
          cb=cb || angular.noop;
          return function(){
            var productInsertModal;
            var formData={
              modal: {
                dismissable: true,
                title: 'Agregar Producto',
                product:product,
                buttons: [{
                  classes: 'btn-success',
                  text: 'Registro',
                  click: function(e) {
                    productInsertModal.close(e);
                  }
                  }, {
                    classes: 'btn-default',
                    text: 'Cancelar',
                    click: function(e) {
                    productInsertModal.dismiss(e);
                    product={};
                  }
                }]
              }
            };
              //Llama a la funcion openModal y le envia los parametros necesarios para construir el Modal
              //openModal($scope,class,size,templateurl,controller)
            productInsertModal=openModal(formData,'modal-product-insert','lg','components/modal/producto/modal.html','ProductoCtrl');

            productInsertModal.result.then(function(event) {
              //callbac retorna el array de datos al product.controller
              cb(product);
              //Variable encargada de limpiar el scope product
              product={};
            });
          };
        },
        update(cb,product){
          cb=cb || angular.noop;
          return function(){
            var productUpdateModal;
            var formData={
              modal:{
                dismissable:true,
                title:'Actualizar Producto',
                product:product,
                buttons:[{
                  classes:'btn-success',
                  text:'Actualizar',
                  click:function(e){
                    productUpdateModal.close(e);
                  }
                },{
                  classes:'btn-default',
                  text:'Cancelar',
                  click:function(e){
                    productUpdateModal.dismiss(e);
                    product={};
                  }
                }]
              }
            };
            //Llama a la funcion openModal y le envia los parametros necesarios para construir el Modal
            //openModal($scope,class,size,templateurl,controller)
            productUpdateModal=openModal(formData,'modal-product-update','lg','components/modal/producto/modal.html','ProductoCtrl');

            productUpdateModal.result.then(function(event){
             //callbac retorna el array de datos al product.controller
             cb(product);
             //Variable encargada de limpiar el scope product
             product={};
            });


          };
        }
      },
      // Modales Carrito de compras
      shoppingCart:{
        cart(cb){
          cb=cb || angular.noop;
          return function(){
            var cartModal;
           
            var formData={
              modal: {
                dismissable: true,
                title: 'Carrito de compras',
                buttons: [{
                  classes: 'btn-success',
                  text: 'Comprar',
                  click: function(e) {
                    cartModal.close(e);
                  }
                  }, {
                    classes: 'btn-default',
                    text: 'Cancelar',
                    click: function(e) {
                      cartModal.dismiss(e);
                    }
                  }, {
                    classes: 'btn-danger',
                    text: 'Limpiar',
                    click: function(e) {
                      ngCart.empty();
                      ngCart.empty();
                      cartModal.dismiss(e);
                    }
                  }]
              }
            };
              //Llama a la funcion openModal y le envia los parametros necesarios para construir el Modal
              //openModal($scope,class,size,templateurl,controller)
            cartModal=openModal(formData,'modal-cart','lg','components/modal/shoppingcart/modal.html','CatalogoCtrl');

            cartModal.result.then(function(event) {
              cb();

            });
          };
        }
      },
      //Modales de los pedidos
      orders:{
        update(cb,order){
          cb=cb || angular.noop;
          return function(){
            var orderUpdateModal;
            var formData={
              modal:{
                dismissable:true,
                title:'Actualizar pedido',
                order:order,
                buttons:[{
                  classes:'btn-success',
                  text:'Actualizar',
                  click:function(e){
                    orderUpdateModal.close(e);
                  }
                },{
                  classes:'btn-default',
                  text:'Cancelar',
                  click:function(e){
                    orderUpdateModal.dismiss(e);
                    order={};
                  }
                }]
              }
            };
            //Llama a la funcion openModal y le envia los parametros necesarios para construir el Modal
            //openModal($scope,class,size,templateurl,controller)
            orderUpdateModal=openModal(formData,'modal-order-update','lg','components/modal/pedido/modal.html','PedidoCtrl');

            orderUpdateModal.result.then(function(event){
             //callbac retorna el array de datos al order.controller
             cb(order);
             //Variable encargada de limpiar el scope order
             order={};
            });


          };
        }
      }

    };

  });
