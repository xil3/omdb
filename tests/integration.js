describe('OMDB Project Tests', function() {
    it('should have a proper title', function() {
        browser.get('http://localhost/omdb/');

        expect(browser.getTitle()).toEqual('OMDB Project');
    });
    
    it('should find just 1 row - shawshank redemption', function() {
        browser.get('http://localhost/omdb/');

        element(by.model('searchData.title')).sendKeys('tt0111161');
        element(by.buttonText("Search")).click();

        expect(element.all(by.repeater('(key, movie) in movies')).count()).toEqual(1);
    });
});