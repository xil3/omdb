omdbApp.factory('apiHelper', function($http) {
    var apiHelper = {};
    
    var endpoint = "http://www.omdbapi.com?callback=JSON_CALLBACK",
        defaultParams = {
            plot: "full",
            r: "json"
        };
    
    /**
     * Private Methods
     */
    
    /**
     * Checks if the search query is an IMDB ID
     * 
     * @param {type} str
     * @returns {Boolean}
     */
    function isImdbId(str) {
        if(str.search(/^tt\d+/) != -1) {
            console.log("Is IMDB id");
            return true;
        }
            
        console.log("not an IMDB id");
        return false;
    }
    
    /**
     * Public Methods
     */
    
    /**
     * Get all movies, based on search query; but it also returns just single movies (if just an IMDB ID is provided)
     * 
     * @param {type} params
     * @param {type} callback
     * @returns {undefined}
     */
    apiHelper.getMovies = function(params, callback) {
        // adding data to the endpoint
        angular.merge(params, defaultParams);
        
        // need to check if it's a valid IMDB id, and alter the query accordingly
        if(isImdbId(params.search)) {
            params.i = params.search;
        } else {
            params.s = params.search;
        }
        
        // don't need this property anymore
        delete params.search;
        
        console.log(params);
        
        $http.jsonp(endpoint, {
            'params': params
        }).success(function(data){
            console.log(data);
            callback(data);
        });
    };

    return apiHelper;
});