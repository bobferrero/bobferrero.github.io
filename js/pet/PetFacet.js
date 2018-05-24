angular.module('PetFacet', [])
.factory('petfacet', [function () {

  var built = { 'value': false };

  var facets = {
    'ages': { 'value': [] },
    'sizes': { 'value': [] },
    'genders': { 'value': [] },
    'locations': { 'value': [] },
    'breeds': { 'value': [] },
    'options': { 'value': [] }
  };

  var ids = { 'seen': [] };

  var initialize = function () {
    built.value = false;
    facets.ages.value = [];
    facets.sizes.value = [];
    facets.locations.value = [];
    facets.genders.value = [];
    facets.breeds.value = [];
    facets.options.value = [];
    ids.seen = {};
  };

  // default orderby function that can be overridden by facet controllers
  var orderby = function (arrayItem) {
    return arrayItem.name ? arrayItem.name : arrayItem;
  };

  // used by facet controllers
  var clearSelections = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].selected = null;
    }
  };

  var clearAll = function () {
    for (var i in facets) {
      for (var j = 0; j < facets[i].value.length; j++) {
        facets[i].value[j].selected = null;
      }
    }
  };

  var buildFacets = function (item) {
    if (item.contact)
      buildPetFacets(item);
    else
      buildShelterFacets(item);
  };

  var buildShelterFacets = function (shelter) {
    built.value = true;

    if (ids.seen[shelter.id.$t] == true) {
      // already seen this id
      return;
    } else {
      ids.seen[shelter.id.$t] = true;
    }

    var shelterAddress = buildShelterAddress(shelter);
    if (shelterAddress) {
      buildFilter(facets.locations.value, shelterAddress);
    }

  };

  var buildShelterAddress = function (shelter) {
    var address = [];
    if (shelter.address1.$t) address.push(shelter.address1.$t);
    if (shelter.city.$t) address.push(shelter.city.$t + ', ');
    if (shelter.state.$t) address.push(shelter.state.$t);
    if (shelter.zip.$t) address.push(shelter.zip.$t);
    return address.join(" ");
  };

  var buildPetFacets = function (pet) {
    built.value = true;

    if (ids.seen[pet.id.$t] == true) {
      // already seen this id
      return;
    } else {
      ids.seen[pet.id.$t] = true;
    }

    if (pet.age.$t) {
      buildFilter(facets.ages.value, pet.age.$t);
    }

    if (pet.size.$t) {
      buildFilter(facets.sizes.value, pet.size.$t);
    }

    if (pet.contact.zip.$t) {
      buildFilter(facets.locations.value, pet.contact.zip.$t);
    }

    if (pet.sex.$t) {
      buildFilter(facets.genders.value, pet.sex.$t);
    }

    if (pet.breeds) {
      if (pet.breeds.breed.$t) {
        buildFilter(facets.breeds.value, pet.breeds.breed.$t);
      } else {
        for (var b in pet.breeds.breed) {
          buildFilter(facets.breeds.value, pet.breeds.breed[b].$t);
        }
      }
    }

    if (pet.options && pet.options.option && pet.options.option.length > 0) {
      for (var o in pet.options.option) {
        buildFilter(facets.options.value, pet.options.option[o].$t);
      }
    }
  };

  var createId = function (name) {
    return 'id' + name.replace(/[\W ,]/g, '_');
  };

  var buildFilter = function (array, name) {
    var id = createId(name);
    if (typeof array[id] === 'undefined') {
      array[id] = array.length;
      // change selected to be undefined instead of null?
      array.push({ 'id': id, 'index': array.length, 'name': name, count: 0, selected: null });
    }
    var index = array[id];
    array[index].count++;
  };

  var checkFilters = function (pet) {
    var age = checkFilter(pet.age, facets.ages.value);
    if (age)
      return true;

    var size = checkFilter(pet.size, facets.sizes.value);
    if (size)
      return true;

    var loc = checkFilter(pet.contact.zip, facets.locations.value);
    if (loc)
      return true;

    var sex = checkFilter(pet.sex, facets.genders.value);
    if (sex)
      return true;

    var breed = checkFilter(pet.breeds.breed, facets.breeds.value);
    if (breed)
      return true;

    var opt = checkFilter(pet.options.option, facets.options.value);
    if (opt)
      return true;

    // if all are undefined, no filters were specified - return true;
    // if any is true, one of the above checks would have stopped execution
    // so either the result is false or undefined at this point - if none are false - display the pet.
    return age !== false && size !== false && loc !== false && sex !== false && breed !== false && opt !== false;
  };

  var checkFilter = function (petValue, array) {
    var filter;
    var value;
    var index;
    for (var i = 0; i < array.length; i++) {
      // if one is selected then apply this filter criteria
      if (array[i].selected === true) {
        filter = true;
      }
    }
    if (filter) {
      if (petValue.$t && typeof petValue.$t == 'string') {
        value = createId(petValue.$t);
        index = array[value];
        if (array[index].selected) {
          return true;
        }
      } else {
        var oneofthem = false;
        for (var j in petValue) {
          value = createId(petValue[j].$t);
          index = array[value];
          if (array[index].selected) {
            return true;
          }
        }
      }
      return false;
    }

    // filter can only be 'undefined' here which means no filter selections for this facet, 
    // otherwise the filter value is returned above
    return filter;
  }

  return {
    facets: facets,
    checkFilters: checkFilters,
    buildFacets: buildFacets,
    clearSelections: clearSelections,
    clearAll: clearAll,
    orderby: orderby,
    initialize: initialize,
    built: built
  };

} ]);