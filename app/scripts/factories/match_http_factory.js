/**
 * Created by hendrikssonm on 12/24/15.
 */
angular.module('http.matchbox', [])
    .factory('httpPatients', function($http, matchConfig) {
        return {
            async: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData');
            }
        };
    })
    .factory('httpTreatmentArms', function($http, matchConfig) {
        return {
            async: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicTreatmentArms');
            }
        };
    })
    .factory('httpReports', function($http, matchConfig) {
        return {
            async: function() {
                return $http.get(matchConfig.reportApiBaseUrl + '/reportList');
            }
        };
    });
//.factory('httpConfig', function($http, matchConfig) {
//    var promise;
//    var httpConfig = {
//        async: function() {
//            if (!promise) {
//                // $http returns a promise, which has a then function, which also returns a promise
//                promise = $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData')
//                    .then(function (response) {
//                    // The then function here is an opportunity to modify the response
//                    console.log(response);
//                    // The return value gets picked up by the then in the controller.
//                    return response.data;
//                });
//            }
//            // Return the promise to the controller
//            return promise;
//        }
//    };
//    return httpConfig;
//});