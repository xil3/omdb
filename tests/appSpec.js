describe('apiHelper test', function(){
    describe('when isImdbId is called', function(){        
        beforeEach(module('omdbApp'));
        
        it('returns true for tt0111161, which is a valid IMDB id', inject(function(apiHelper) {
            expect( apiHelper.isImdbId('tt0111161') ).toEqual(true);
        }));
    });

    describe('when getMovies is called', function(){        
        var httpBackend;
        
        beforeEach(module('omdbApp'));
        
        beforeEach(inject(function ($httpBackend) {
            httpBackend = $httpBackend;
        }));
        
        afterEach(function () {
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();
        });
        
        it('returns single JSON object', inject(function(apiHelper) {
            httpBackend.expectJSONP("http://www.omdbapi.com?callback=JSON_CALLBACK&i=tt0082498&plot=full&r=json&tomatoes=true&type=movie&y=").respond({
                Title: "The Shawshank Redemption",
                Year: "1994",
                Rated: "R",
                Released: "14 Oct 1994",
                Runtime: "142 min",
                Genre: "Crime, Drama",
                Director: "Frank Darabont",
                Writer: "Stephen King (short story \"Rita Hayworth and Shawshank Redemption\"), Frank Darabont (screenplay)",
                Actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
                Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                Language: "English",
                Country: "USA",
                Awards: "Nominated for 7 Oscars. Another 14 wins & 21 nominations.",
                Poster: "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg",
                Metascore: "80",
                imdbRating: "9.3",
                imdbVotes: "1,642,589",
                imdbID: "tt0111161",
                Type: "movie",
                Response: "True"
            });
            
            apiHelper.getMovies({
                'search': 'tt0082498',
                'y': '',
                'type': 'movie',
                'tomatoes': true
            }, function(response) {
                // the response should just be an object
                httpBackend.flush()
                expect(response).toEqual("lala");
            });
        }));
    });
});