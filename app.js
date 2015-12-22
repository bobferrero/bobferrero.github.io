angular.module('bfAngApp', 

['ngRoute', 'ngCookies', 'IndexController', 'PetController', 'PetFacetControllers', 'PetMapController',
    'PetFilter', 'PetCache', 'PetFinder', 'PetModel', 'PetShelterController', 'PetFacet', 'GoogleApi'])

.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);