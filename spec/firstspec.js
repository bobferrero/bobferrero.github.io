describe('test unit test',function() {

	it('should load and compile correct template', function() {
	  element(by.linkText('Pets')).click();
	  var content = element(by.css('[ng-view]')).getText();
	  expect(content).toMatch(/Pets/);
	  expect(content).toMatch(/Book Id\: Moby/);
	  expect(content).toMatch(/Chapter Id\: 1/);

	  element(by.partialLinkText('Scarlet')).click();

	  content = element(by.css('[ng-view]')).getText();
	  expect(content).toMatch(/controller\: BookCtrl/);
	  expect(content).toMatch(/Book Id\: Scarlet/);
	});

});
