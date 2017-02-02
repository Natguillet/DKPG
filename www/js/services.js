angular
    .module('starter')
    .factory('Medics', function($http) {
        var url = '/';

        return {
            getMedics: function() {
                $http.get(url + 'data/medicjson.json').success(function (results){
                  return results;
                });
            },
        }
    });
