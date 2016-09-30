'use strict';

(function() {

/**
 * The Util service is for thin, globally reusable, utility functions
 */
function UtilService($window) {
  var Util = {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    safeCb(cb) {
      return (angular.isFunction(cb)) ? cb : angular.noop;
    },

    /**
     * Parse a given url with the use of an anchor element
     *
     * @param  {String} url - the url to parse
     * @return {Object}     - the parsed url, anchor element
     */
    urlParse(url) {
      var a = document.createElement('a');
      a.href = url;
      return a;
    },

    /**
     * Test whether or not a given url is same origin
     *
     * @param  {String}           url       - url to test
     * @param  {String|String[]}  [origins] - additional origins to test against
     * @return {Boolean}                    - true if url is same origin
     */
    isSameOrigin(url, origins) {
      url = Util.urlParse(url);
      origins = (origins && [].concat(origins)) || [];
      origins = origins.map(Util.urlParse);
      origins.push($window.location);
      origins = origins.filter(function(o) {
        return url.hostname === o.hostname &&
          url.port === o.port &&
          url.protocol === o.protocol;
      });
      return (origins.length >= 1);
    },

    /**
     * Test whether or not a given url is same origin
     *
     * @param  {Object[]}         [data]    - array de objetos tipo key data
     * @param  {String}           key       - cadena para capturar la key
     * @return {Number}                     - suma de los valores del array con la llave key
     */
    sumByKey(data, key) {
          if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
              return 0;
          }

          var sum = 0;
          for (var i = data.length - 1; i >= 0; i--) {
              sum += parseFloat(data[i][key]);
          }

          return sum;
      }
    };


  return Util;
}

angular.module('sachaAppApp.util')
  .factory('Util', UtilService);
})();
