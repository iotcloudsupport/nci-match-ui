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
    .factory('reportService', function($http, matchConfig) {
        return {
            getReportList: function() {
                return $http.get(matchConfig.reportApiBaseUrl + '/reportList');
            }
        };
    });
