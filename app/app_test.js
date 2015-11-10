describe('Unit Testing', function() {

  beforeEach(module('ngTest'));
  describe('Are we okay?', function() {
    it('should expect App be defined', function() {
        expect(angular.module('ngTest')).toBeDefined();
    });

  });
});
