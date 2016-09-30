angular.module('sachaAppApp')
.run(['$templateCache', function ($templateCache) {
  'use strict';
  ///////////////////////Templates common///////////////////////////////////////
 
  $templateCache.put('template/drawer.html',
    `<header class="demo-drawer-header">
          <img ng-src="{{nav.getCurrentUser().profileImageURL}}" alt="{{nav.getCurrentUser().name}}" class="demo-avatar">
          <div class="demo-avatar-dropdown">
            <span ng-bind="nav.getCurrentUser().name"></span>
            <div class="mdl-layout-spacer"></div>
            <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i class="material-icons" role="presentation">arrow_drop_down</i>
              <span class="visuallyhidden">Accounts</span>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
              <li class="mdl-menu__item" ui-sref="settings.profile">Editar Perfil</li>
              <li class="mdl-menu__item" ui-sref="settings.picture">Cambiar Imagen de Perfil</li>
              <li class="mdl-menu__item" ui-sref="settings.password">Cambiar Contraseña</li>
              <li class="mdl-menu__item mdl-menu__item--full-bleed-divider" ui-sref="settings.accounts">Manage Social Accounts</li>
              <li class="mdl-menu__item" ui-sref="logout">Salir</li>
            </ul>
          </div>
        </header>
        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          <a class="mdl-navigation__link" ng-repeat="item in nav.menu" ui-sref="{{item.state}}" ng-show="{{item.isLoggedIn}}"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">{{item.icon}}</i>{{item.title}}</a>
        </nav>`
  );


  //////////////////////Templates Carro de compras//////////////////////////////
  $templateCache.put('template/ngCart/summary.html',
    `<div class="row">
      <div class="col-md-6">{{ ngCart.getTotalItems() }}
          <ng-pluralize count="ngCart.getTotalItems()" when="{1: 'item', 'other':'items'}"></ng-pluralize>
          <br />{{ ngCart.totalCost() | currency }}
      </div>
    </div>`
  );


  $templateCache.put('template/ngCart/cart.html',
    `<div class="alert alert-warning" role="alert" ng-show="ngCart.getTotalItems() === 0">
      Your cart is empty
   </div>

  <div class="table-responsive col-lg-12" ng-show="ngCart.getTotalItems() > 0">

      <table class="table table-striped ngCart cart">

          <thead>
          <tr>
              <th></th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
          </tr>
          </thead>
          <tfoot>
          <tr ng-show="ngCart.getTax()">
              <td></td>
              <td></td>
              <td></td>
              <td>Tax ({{ ngCart.getTaxRate() }}%):</td>
              <td>{{ ngCart.getTax() | currency }}</td>
          </tr>
          <tr ng-show="ngCart.getShipping()">
              <td></td>
              <td></td>
              <td></td>
              <td>Shipping:</td>
              <td>{{ ngCart.getShipping() | currency }}</td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td>{{ ngCart.totalCost() | currency }}</td>
          </tr>
          </tfoot>
          <tbody>
          <tr ng-repeat="item in ngCart.getCart().items track by $index">
              <td><span ng-click="ngCart.removeItemById(item.getId())" class="glyphicon glyphicon-remove"></span></td>

              <td>{{ item.getName() }}</td>
              <td><span class="glyphicon glyphicon-minus" ng-class="{'disabled':item.getQuantity()==1}"
                        ng-click="item.setQuantity(-1, true)"></span>&nbsp;&nbsp;
                  {{ item.getQuantity() | number }}&nbsp;&nbsp;
                  <span class="glyphicon glyphicon-plus" ng-click="item.setQuantity(1, true)"></span></td>
              <td>{{ item.getPrice() | currency}}</td>
              <td>{{ item.getTotal() | currency }}</td>
          </tr>
          </tbody>
      </table>
  </div>`

  );


  $templateCache.put('template/ngCart/addtocart.html',
    `<div ng-hide="attrs.id">
     <a class="btn btn-lg btn-primary" ng-disabled="true" ng-transclude></a>
    </div>
    <div ng-show="attrs.id">
        <div>
        <input type="number" name="quantity" id="quantity"  value="1" ng-model="q">
         <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="ngCart.addItem(id, name, price, q, data)"><i class="material-icons">add_shopping_cart</i></a>
        </div>
        <mark  ng-show="inCart()">
            Este Producto esta en tu carro. <a ng-click="ngCart.removeItemById(id)" style="cursor: pointer;">Eliminar</a>
        </mark>
    </div>`
  );


 

}]);
