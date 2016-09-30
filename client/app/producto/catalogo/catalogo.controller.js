'use strict';
angular.module('sachaAppApp')
  .controller('CatalogoCtrl', function ($scope,Modal,$http,socket,$filter,ngCart) {
    $scope.products=[]; //Array para cargar todos los productos obtenidos de la base de datos
    $scope.totalItems=ngCart.getTotalItems();
	$scope.query={};    //Variable utilizada para realizar filtros a los datos
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);
   $scope.dynamicTooltipText = 'dynamic';
    $scope.dynamicTooltip = 'Hello, World!';
    //Obtener todos los productos y obtener catalogo,se crear eventos sockets.
    $http.get('/api/products/').then(products=>{
    	$scope.products=products.data;
    });
    //////////////////////////Carrito de compras/////////////////////////////
     
    //Escucha el evento para cuando hay un cambio en el carrito de compras
    //Y actualiza la variable totalItems
    $scope.$on('ngCart:change',()=>{
        $scope.totalItems=ngCart.getTotalItems();
    });
    
     //Abre modal del carro de compras
    $scope.openShoppingCart=Modal.shoppingCart.cart(cart=>{
        console.log(cart);
        console.log(ngCart.getItems());

    });
    $scope.limpiar=function(){
        ngCart.empty();
    }
    // llamada a la api de ingresar de un pedido
    $scope.addPedido = function(){
      if($scope.pedido){
        $http.post('/api/pedidos', $scope.pedido);
        $scope.pedido = {};
      }
    };
    ///////////////////////Filtros de busqueda/////////////////////////////////
     $scope.filter=function(tag,name){
	  	$scope.query.tag=tag;//filtro para tags
	  	$scope.query.name=name;//filtro para nombre del producto
	  	$scope.closeSearch();//evento cierra la ventana de busqueda
     };
     // function utiliza para dar estilos a formulario de busqueda
     $scope.search=function(){
     	$('body').addClass('mode-search');
  		$('.input-search').focus();
     };
     //function para quitar estilos de formulario de busqueda
     $scope.closeSearch=function(){
     	 $('body').removeClass('mode-search');
     };
  });
