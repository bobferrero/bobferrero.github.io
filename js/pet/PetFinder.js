angular.module('PetFinder', ['PetCache'])

.factory('petfinder', ['$http', 'petcache',
function ($http, petcache) {

  var constants = { test: false, url: '//jpets.herokuapp.com/rhc/api/v1/pet/' };

  var api = {

    defaults: {
      count: 100,
      format: 'json',
      offset: 0
    },

    cachedSuccessWrapper: function (keyFunction, success, data) {
      // bound to getPets scope for location, animal, success
      if (data.data) {
        petcache.put(keyFunction(), data.data);
      }
      success(data.data);
    },

    get: function (method, options, cacheKey, success) {
      var params = angular.extend({}, this.defaults, options);
      var successwrapper = this.cachedSuccessWrapper.bind(this, cacheKey, success);
      $http.jsonp(constants.url + method, { 'params': params }).then(successwrapper);
    },

    mock: function (method, options, cacheKey, success) {
      /* use the mock for testing */
      var successwrapper = this.cachedSuccessWrapper.bind(this, cacheKey, success);
      var mockUrl = 'testing/petfinder-mock-' + method + '-' + cacheKey() + '.js';
      $http.get(mockUrl).then(successwrapper);
    }, 

    findCachedAndMocked: function (method, options, cacheKey, success) {

      if (typeof success != 'function') success();
      if (typeof options != 'object') success();

      var result = petcache.get(cacheKey());
      if (result) {
        success(result);
      } else {
        if (constants.test)
          api.mock(method, options, cacheKey, success);
        else
          api.get(method, options, cacheKey, success);
      }
    }

  };

  return {

    findPets: function (options, success) { 
      if (options.location == null || options.location.length < 5 || options.animal == null || options.animal.length < 2)
        success(null);

      api.findCachedAndMocked('pet.find', options, function () {
        return (options.location + options.animal).toLowerCase();
      }, success);
    },

    findShelters: function (options, success) { 
      if (options.location == null || options.location.length < 5)
        success(null);

      api.findCachedAndMocked('shelter.find', options, function () {
        return (options.location).toLowerCase();
      }, success);
    },

  };  // end of return statement

} ]);
