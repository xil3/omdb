omdbApp.controller('SearchController', function ($scope, apiHelper) {
    // initializing the searchData as an object
    $scope.searchData = {};
    
    // setting defaults, otherwise angular sets the dropdown as empty
    $scope.searchData.type = "movie";
    $scope.searchData.tomatoes = "true";
    
    $scope.ratingLabels = ['IMDB', 'Rotten Tomatoes'];
    $scope.ratingData = [];
    
    /*
     * Private Methods
     */
    
    /**
     * Just shows and hides the detailed area, based on the key
     * 
     * @param {type} key
     * @returns {undefined}
     */
    function showHideDesc(key) {
        if(!$scope.movies[key].show) {
            $scope.movies[key].show = true;
        } else {
            $scope.movies[key].show = false;
        }
    }
    
    /*
     * Public Methods
     */
    
    /**
     * Gets all movies and sets the scope to display them in the template
     * 
     * @returns {undefined}
     */
    $scope.getMovies = function() {
        // resetting the movies to an empty array every time
        $scope.movies = [];
        
        apiHelper.getMovies({
            'search': $scope.searchData.title,
            'y': $scope.searchData.year,
            'type': $scope.searchData.type,
            'tomatoes': $scope.searchData.tomatoes
        }, function(data) {
            // checking if it has more than 1 result
            if(data.Search) {
                $scope.movies = data.Search;
            } else {
                $scope.movies.push(data);
            }
        });
    };
    
    /**
     * Gets more details about a movie (if it hasn't already), and then shows it
     * 
     * @param {type} key
     * @returns {undefined}
     */
    $scope.showDetails = function(key) {
        if($scope.movies[key].imdbRating) {
            $scope.ratingData[key] = [
                [$scope.movies[key].imdbRating, $scope.movies[key].tomatoRating]
            ];
            
            showHideDesc(key);
        } else {
            apiHelper.getMovies({
                'search': $scope.movies[key].imdbID,
                'tomatoes': $scope.searchData.tomatoes
            }, function(data) {
                $scope.movies[key] = data;

                $scope.ratingData[key] = [
                    [$scope.movies[key].imdbRating, $scope.movies[key].tomatoRating]
                ];

                showHideDesc(key);
            });
        }
        
        
    };
});