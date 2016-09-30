'use strict';

angular.module('sachaAppApp')
  .controller('PedidoCtrl', function ($scope, $http, socket, Util, Modal) {
    $scope.pedidos = [];
    $scope.total = 0;

    /// grid ///
    $scope.gridPedidos = {
      enableColumnResizing: true,
      enableGridMenu: true,
      showGridFooter: true,
      fastWatch: true,

      columnDefs: [
        { name: 'id',field: '_id', enableCellEdit:false,enableHiding: false},
        { name: 'Cliente', field: 'client', type: 'string' },
        { name: 'F. Pedido', field: 'orderDate', type: 'date' },
        { name: 'F. Entrega', field: 'deliverDate', type: 'date' },
        { name: 'Dirección', field: 'deliverAddress', type: 'string'},
        { name: 'E. Orden', field: 'orderState', type: 'number'},
        { name: 'E. Factura', field: 'billState', type: 'number'},
        { name: 'Opciones',cellTemplate:'<button class="btn btn-success btn-xs boton-row" ng-click="grid.appScope.editPedido(row.entity)"><i class="glyphicon glyphicon-pencil"></i></button><button class="btn btn-danger btn-xs boton-row" ng-click="grid.appScope.deleteProduct(row.entity._id,row.entity.imageProduct)"><i class="glyphicon glyphicon-trash"></i></button><button class="btn btn-default btn-xs boton-row" ng-click="grid.appScope.buscarProducto(row.entity)" data-toggle="modal" data-target="#modalCatalogo"><i class="glyphicon glyphicon-eye-open"></i></button>',enableCellEdit:false}
      ],
	    onRegisterApi : function(gridApi){
	       $scope.gridApi = gridApi;
    	}
    };
    /// grid ///

    // llamada a api de consulta de pedidos
    $http.get('/api/pedidos').then(res => {
      $scope.gridPedidos.data = res.data;
      console.log($scope.gridPedidos);
  		socket.syncUpdates('pedido', $scope.gridPedidos.data);
    });

    // llamada a la api de ingreso de un pedido
    $scope.addPedido = function(){
      if($scope.pedido){
        $http.post('/api/pedidos', $scope.pedido);
        $scope.pedido = {};
      }
    };

    // // llamada a api de consulta de pedido por Id para dejarla disponible para edición
    // $scope.editPedido = function(id){
    //   if(id){
    //     $http.get('/api/pedidos/' + id).then(pedido => {
    //       $scope.pedido = pedido.data;
    //       console.log($scope.pedido);
    //       $scope.total = Util.sumByKey($scope.pedido.detail, 'total');
    //     });
    //
    //
    //     Modal.orders.update(function (data) {
    //       // data retorna la coleccion de datos del modal(pedido) y luego la envia actualizar
    //       // a metodo updateProduct
    //       $scope.updatePedido(data);
    //   },$scope.pedido)();
    //   console.log($scope.pedido);
    //
    //   }
    // };

    // llamada a modal de pedido para edición
    $scope.editPedido = function(order){
        console.log(order);
        order.total = Util.sumByKey(order.detail, 'total');
        Modal.orders.update(function (data) {
          // data retorna la coleccion de datos del modal(pedido) y luego la envia actualizar
          // a metodo updateProduct
          $scope.updatePedido(data);
      },order)();
    };


    // llamada a la api de actualización de un pedido
    $scope.updatePedido = function(data){
      if(data){
        $http.put('/api/pedidos/' + data._id, data);
        $scope.pedido = {};
      }
    };

  });
