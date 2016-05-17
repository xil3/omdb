describe('OMDB Project Tests', function() {
    it('should have a proper title', function() {
      browser.get('http://localhost/omdb/');

      expect(browser.getTitle()).toEqual('OMDB Project');
    });
    
    
});