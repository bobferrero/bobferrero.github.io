describe('PetFinder', function () {

	beforeEach(module('PetFinder'));

	// mock petcache
	beforeEach(module(function ($provide, $sceDelegateProvider) {
		$provide.value('petcache', {
			get: function () { },
			put: function () { }
		});
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow loading from jpets
			'**//jpets.herokuapp.com/rhc/api/v1/**'
		  ]);
	}));

	it('is not defined', inject(function (petfinder) {
		expect(petfinder).toBeDefined();
	}));

	it('findPets returns a bad result', inject(function (petfinder, $httpBackend) {
		$httpBackend.expectJSONP("//jpets.herokuapp.com/rhc/api/v1/pet/pet.find?animal=dog&callback=JSON_CALLBACK&count=100&format=json&location=92618&offset=0").respond({ a: true });

		var result = false;
		var success = function () {
			result = true;
		};
		petfinder.findPets({ animal: 'dog', location: '92618' }, success);
		$httpBackend.flush();
		expect(result).toBe(true);
	}));
	it('findPets returns a bad result', inject(function (petfinder, $httpBackend) {
		$httpBackend.expectJSONP("//jpets.herokuapp.com/rhc/api/v1/pet/shelter.find?callback=JSON_CALLBACK&count=100&format=json&location=92618&offset=0").respond({ a: true });

		var result = false;
		var success = function () {
			result = true;
		};
		petfinder.findShelters({ location: '92618' }, success);
		$httpBackend.flush();
		expect(result).toBe(true);
	}));

	it('angular.extend vs Object.assign', inject(function (petfinder) {
		// just wanted to compare angular.extend with object.assign.  it's being used in petfinder.js
		var one = { count: 100, callback: 'JSON_CALLBACK' };
		var two = { animal: 'dog', location: '92618' };
		var params = angular.extend({}, one, two);
		var params2 = Object.assign({}, one, two);
		expect(params).toEqual(params2);
	}));
});