'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {


  it('index.html loads url /', function () {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toMatch("https://www.example.com");
  });


  // describe('pets/dog', function () {

  //   beforeEach(function () {
  //     browser.get('index.html');
  //   });


  //   it('should render pets/dog when user navigates to /pets/dog', function () {
  //     expect(element.all(by.css('select[data-ng-model="animal"]')).first().getText()).
  //       toMatch(/Dogs/);
  //   });

  // });


  // describe('pets/cat', function () {

  //   beforeEach(function () {
  //     browser.get('index.html');
  //   });


  //   it('should render pets/cats', function () {
  //     expect(element.all(by.css('select[data-ng-model="animal"]')).first().getText()).
  //       toMatch(/she/);
  //   });

  // });
});
