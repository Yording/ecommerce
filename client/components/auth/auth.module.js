'use strict';

angular.module('sachaAppApp.auth', [
  'sachaAppApp.constants',
  'sachaAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
