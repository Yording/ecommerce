'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Inicio',
    'state': 'main',
    'icon':'home',
    'isLoggedIn':true
  },
  {
    'title':'Producto',
    'state':'producto',
    'icon':'book',
    'isLoggedIn':'nav.isLoggedIn()'
  },
  {
    'title':'Pedido',
    'state':'pedido',
    'icon':'receipt',
    'isLoggedIn':'nav.isLoggedIn()'
  },
  {
    'title':'Catalogo',
    'state':'catalogo',
    'icon':'shopping_cart',
    'isLoggedIn':'nav.isLoggedIn()'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('sachaAppApp')
  .controller('NavbarController', NavbarController);
