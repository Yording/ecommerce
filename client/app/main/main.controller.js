'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket,Auth) {
    this.$http = $http;
    this.awesomeThings = [];
     this.isLoggedIn = Auth.isLoggedIn;
    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('sachaAppApp')
  .controller('MainController', MainController);

})();
