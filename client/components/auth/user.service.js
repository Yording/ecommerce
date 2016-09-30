'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changeProfilePicture: {
      method: 'POST',
      params: {
        controller:'picture'
      }
    },
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    editProfile: {
      method: 'PUT',
      params: {
        controller:'profile'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
}

angular.module('sachaAppApp.auth')
  .factory('User', UserResource);

})();
