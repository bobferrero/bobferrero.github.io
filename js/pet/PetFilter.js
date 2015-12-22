angular.module('PetFilter', ['PetFinder'])

.filter('checkmark', function () {
  // adds a checkmark or X for true/false, respectively
  // from the Angular tutorial
  return function (input) {
    return input ? '\u2713' : '\u2718';
  };
})

.filter('address', function () {
  return function (contact) {
    return contact && (contact.city.$t + ', ' + contact.state.$t + ' ' + contact.zip.$t);
  };
})

.filter('description', function () {
  return function (description) {
    var d = description["$t"];
    return d && d.length && d.length > 0 ? (d.substring(0, 500) + (d.length > 500 ? ' READ MORE...' : '')) : null;
  };
})

.filter('photos', function () {
  return function (photos, size) {
    var result = [];
    for (var p in photos) {
      if (photos[p]['@size'] == size) {
        result.push(photos[p]);
      }
    }
    return result;
  };
})

.filter('shelters', function (petfinder) {
  return function (input) {
    var value = input;
    // TODO
    // var callback = function (data) { value = data.petfinder.sheltername; };
    // petfinder.findShelter(input, callback.bind(this));
    return value;
  };

}).filter('sizes', function () {
  var sizes = {
    "S": "Small",
    "M": "Medium",
    "L": "Large",
    "XL": "Extra-Large"
  };
  return function (input) {
    return sizes[input] + '-sized';
  };
})

.filter('sexes', function () {
  var sexes = {
    "M": "Male",
    "F": "Female"
  };
  return function (input) {
    return sexes[input];
  };
})

.filter('status', function () {
  var status = {
    "A": "Adoptable",
    "H": "On Hold",
    "P": "Pending",
    "X": "Adopted"
  };
  return function (input) {
    return status[input];
  };
})

.filter('breeds', function () {
  return function (input) {
    if (!input) return '';

    if (input.$t) {
      return input.$t;
    }

    // it's an array of breeds
    var result = '';
    for (type in input) {
      result += (result.length > 0 ? ', ' : '') + input[type].$t;
    }
    return result;
  };
})

.filter('options', function () {
  var options = {
    "altered": "Spayed / Neutered",
    "noClaws": "No Claws",
    "hasShots": "Has Current Shots",
    "housebroken": "House Broken",
    "housetrained": "House Trained",
    "noCats": "Not Good With Cats",
    "noDogs": "Not Good With Dogs",
    "noKids": "Not Good With Kids",
    "specialNeeds": "Has Special Needs"
  };
  var safeGet = function (opt) {
    return options[opt] ? options[opt] : opt;
  };
  return function (input) {
    if (!input) return '';

    if (input.$t) {
      return safeGet(input.$t);
    }

    // it's an array of breeds
    var result = '';
    for (type in input) {
      result += (result.length > 0 ? ', ' : '') + safeGet(input[type].$t);
    }
    return result;
  };
});