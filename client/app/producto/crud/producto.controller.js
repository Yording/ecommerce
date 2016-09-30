'use strict';


angular.module('sachaAppApp')
  .controller('ProductoCtrl', function ($scope, Modal,uiGridConstants,$http,socket,Upload) {


  ///////////////////////////////////////Ui grid Inventario de productos///////////////////////////////////////
	$scope.products=[];


	$scope.gridOptionsProductos = {
	    // propiedades
	    enableCellEditOnFocus: true,

	    // filtros
	    //enableFiltering: true,

	    // ordenamiento
	    enableSorting: true,

	    // seleccion
	    enableRowSelection: true,
	    enableSelectAll: true,

	    // paginacion
	    paginationPageSize: 8,
	    paginationPageSizes: [25, 50, 75],

	    // menu
	    enableGridMenu: true,
	    gridMenuShowHideColumns: false,
	    exporterMenuCsv: false,

	    // columnas
	    columnDefs: [
	        { name: 'id',field: '_id', enableCellEdit:false,enableHiding: false},
	        { name: 'Nombre',field: 'name', enableCellEdit:true,enableHiding: false},
	        { name: 'Precio de Venta',field: 'saleprice',type: 'number',cellFilter: 'currency'},
	        { name: 'Cantidad',field: 'amount',type: 'number',headerTooltip: 'Unidades Existentes'},
	        { name: 'T/F',field: 'active',type:'boolean' ,headerTooltip: 'Habilitar/Inhabilitar productos'},
	        { name: 'Opciones',cellTemplate:'<button class="btn btn-success btn-xs boton-row" ng-click="grid.appScope.editProducto(row.entity)"><i class="glyphicon glyphicon-pencil"></i></button><button class="btn btn-danger btn-xs boton-row" ng-click="grid.appScope.deleteProduct(row.entity._id,row.entity.imageProduct)"><i class="glyphicon glyphicon-trash"></i></button><button class="btn btn-default btn-xs boton-row" ng-click="grid.appScope.buscarProducto(row.entity)" data-toggle="modal" data-target="#modalCatalogo"><i class="glyphicon glyphicon-eye-open"></i></button>',enableCellEdit:false}
	    ],
	    data:$scope.products,
	    onRegisterApi : function(gridApi){
	       $scope.gridApi = gridApi;
    	}
	};

	//Obtener todos los productos y llenar la tabla,se crear eventos sockets.
	$http.get('/api/products').then(res=>{
		// $scope.products=res.data;
  		$scope.gridOptionsProductos.data=res.data;
  		socket.syncUpdates('product',$scope.gridOptionsProductos.data);
  	});

	///////////////////////////////////////Modales////////////////////////////////////////////////////////////

	//variables constantes modal
	$scope.defaultImageProduct='assets/product/default.jpg';


	//Evento para eliminar los productos de la base de datos.
	$scope.deleteProduct=function(id,image){
		Modal.confirm.delete(function(){
			console.log(image);
			$http.delete('/api/products/'+id,image);
		})();
	};

	//Evento para insertar los productos a la base de datos.
	$scope.addProduct = Modal.products.insert(product=> {
		//le paso a la imagen a file
  	 	$scope.file=product.imageProduct;
  	 	//se elimina variable del product.
  	 	delete product.imageProduct;
  	 	//Se hace la peticion al server enviando el file y la product
  	 	Upload.upload({
	     url: '/api/products',
	     method: 'POST',
	     data: {file: $scope.file, product:product}
	    });
	},{});
	//Evento para editar los productos en el modal.
	$scope.editProducto =  function(product){
  		Modal.products.update(function (data) {
		    // data retorna la coleccion de datos del modal(producto) y luego la envia actualizar
		    // a metodo updateProduct
		    $scope.updateProduct(data);
		},product)();	
	};
	//Actualizar la informacion del modal
	$scope.updateProduct = function(data){
		//verifica si se envia una URl o un file
		//si se envia un file se realiza request para subir imagen al server
		if(typeof(data.imageProduct)==='string'){
  			$http.put('/api/products/'+data._id,data);
  		}
  		else{
  			//le paso a la imagen a file
	  	 	$scope.file=data.imageProduct;
	  	 	//se elimina variable del data.
	  	 	delete data.imageProduct;
	  	 	//Se hace la peticion al server enviando el file y la data
	  	 	Upload.upload({
		     url: '/api/products/'+data._id,
		     method: 'PUT',
		     data: {file: $scope.file, product:data}
		    });
  		}
	};
	

	///////////////////////////////////////Creacion de tags////////////////////////////////////////////////7/
	$scope.disabled = undefined;

	$scope.enable = function() {
		$scope.disabled = false;
	};

	$scope.disable = function() {
		$scope.disabled = true;
	};

	$scope.someGroupFn = function (item){

		if (item.name[0] >= 'A' && item.name[0] <= 'M')
			return 'From A - M';

		if (item.name[0] >= 'N' && item.name[0] <= 'Z')
			return 'From N - Z';
	};

	$scope.firstLetterGroupFn = function (item){
		return item.name[0];
	};

	$scope.reverseOrderFilterFn = function(groups) {
		return groups.reverse();
	};

	$scope.counter = 0;
	$scope.someFunction = function (item, model){
		$scope.counter++;
		$scope.eventResult = {item: item, model: model};
	};

	$scope.removed = function (item, model) {
		$scope.lastRemoved = {
		item: item,
		model: model
		};
	};


	$scope.availableTags = ['alimentos','belleza','limpieza'];


	$scope.tags = {};
	// $scope.tags.name = ['angular','html'];
	// $scope.article.tags.name= $scope.tags.name;

	$scope.appendToBodyDemo = {
		remainingToggleTime: 0,
		present: true,
		startToggleTimer: function() {
		var scope = $scope.appendToBodyDemo;
		var promise = $interval(function() {
			if (scope.remainingTime < 1000) {
			  $interval.cancel(promise);
			  scope.present = !scope.present;
			  scope.remainingTime = 0;
			} else {
			  scope.remainingTime -= 1000;
			}
		}, 1000);
		scope.remainingTime = 3000;
		}
	};

	//end creacion de tags
});