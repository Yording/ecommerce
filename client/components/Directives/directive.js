'use strict';
angular.module('sachaAppApp')
  //Directiva que dispara un evento al presionar enter sobre un objecto del DOM
.directive('keyEnter', function () {
  return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.keyEnter);
                });

                event.preventDefault();
            }
        });
  };
})
   //Directiva que dispara un evento al presionar escape sobre un objecto del DOM
.directive('keyEscape', function () {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if(event.which === 27) { 
        scope.$apply(function (){
          scope.$eval(attrs.keyEscape);
        });

        event.preventDefault();
      }
    });
  };
});