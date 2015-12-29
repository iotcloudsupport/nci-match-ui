angular.module('http.matchbox', [])
    .factory('patientService', function($http, matchConfig) {
        return {
            getBasicPatientsData: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData');
            }
        };
    })
    .factory('treatmentArmService', function($http, matchConfig) {
        return {
            getBasicTreatmentArms: function() {
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
