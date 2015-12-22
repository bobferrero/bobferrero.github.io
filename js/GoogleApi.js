angular.module('GoogleApi', [])
.factory('googleApi', ['$http', function ($http) {


  var initMap = function (element, center) {
    // Create a map object and specify the DOM element for display.
    return new google.maps.Map(element, {
      center: center,
      scrollwheel: true,
      zoom: 10
    });
  };
  
  var addMarker = function (map, position, title) {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title
    })
  };

  var geocode = function (location, success, error) {
    if (typeof success != 'function') success(null);

    var params = { address: location };
    var config = { headers: { 'Content-Type': undefined }, params: params };
    var errorfn = error || function (a, b, c, d) { throw new Error(a + ' ' + b + ' ' + c + ' ' + d) };
    $http.get('http://dev.bobferrero.com:8080/rhc/api/v1/gl/geocode/json', config).then(success, errorfn);

  };

  var reverseGeocode = function (center, success, error) {
    if (typeof success != 'function') success(null);

    var params = { latlng: center.lat+','+center.lng };
    var config = { headers: { 'Content-Type': undefined }, params: params };
    var errorfn = error || function (a, b, c, d) { throw new Error(a + ' ' + b + ' ' + c + ' ' + d) };
    $http.get('http://dev.bobferrero.com:8080/rhc/api/v1/gl/geocode/json', config).then(success, errorfn);

  };

  return {
    initMap: initMap,
    addMarker: addMarker,
    geocode: geocode,
    reverseGeocode, reverseGeocode
  };

} ]);