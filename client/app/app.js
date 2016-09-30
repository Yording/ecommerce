'use strict';

angular.module('sachaAppApp', [
  'sachaAppApp.auth',
  'sachaAppApp.admin',
  'sachaAppApp.constants',
  'ngCookies',
  'ngResource',
  'ui.select',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngFileUpload',
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.exporter',
  'ui.grid.selection',
  'ui.grid.pagination',
  'ui.grid.moveColumns',
  'ui.grid.cellNav',
  'wu.masonry',
  'ngScrollSpy',
  'ngCart',


])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
