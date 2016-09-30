angular.module('sachaAppApp').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Auth', 'Upload',
  function ($scope, $timeout,$window, Auth, Upload) {
    
    $scope.user = Auth.getCurrentUser;
    $scope.imageFile = $scope.user().profileImageURL;
    $scope.removeImage=function(){
       $scope.imageFile = $scope.user().profileImageURL;
    };
    $scope.uploadImage = function(file) {
    file.upload = Upload.upload({
     url: 'api/users/'+$scope.user()._id +'/picture',
     method: 'POST',
     data: {file: file, user:$scope.user()._id}
    });


   
    file.upload.then(function (response) {
      $timeout(function () {
         $scope.user().profileImageURL=file.result = response.data;

      });
    }, function (response) {
      if (response.status > 0){
        $scope.errorMsg = response.status + ': ' + response.data;
        $scope.removeImage();
      }
    }, function (evt) {
      $scope.success = true;
    });
    };
  }
]);
