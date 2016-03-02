angular.module('http.matchbox', [])
    .factory('workflowApi', function($http, matchConfig) {
        return {
            getDashboardStatistcs: function() {
                return $http.get(matchConfig.workflowApiBaseUrl + '/dashboardStatistics');
            },
            getRejoinRequested: function() {
                return $http.get(matchConfig.workflowApiBaseUrl + '/rejoinRequested');
            }
        };
    })
    .factory('matchApi', function($http, matchConfig) {
        return {
            getBasicPatientsData: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData');
            },
            getBasicTreatmentArms: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicTreatmentArms');
            },
            getBiopsySequenceList: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/patientSpecimenTrackingSummary');
            },
            getMolecularSequenceList: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/patientSpecimenTrackingSummary');
            },
            getPatientVariantReports: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientsWithPendingVariantReport');
            },
            getPatientPendingAssignmentReports: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientsWithPendingAssignmentReport');
            }
        };
    })
    .factory('reportApi', function($http, matchConfig) {
        return {
            getPatientInLimboReports: function() {
                return $http.get(matchConfig.reportApiBaseUrl + '/limboPatient');
            },
            getReportList: function() {
                return $http.get(matchConfig.reportApiBaseUrl + '/reportList');
            }
        };
    })
    .factory('feedApi', function($http, matchConfig) {
        return {
            getActivityFeedList: function() {
                return $http.get(matchConfig.reportApiBaseUrl + '/reportList');
            }
        };
    })
    .factory('treatmentArmApi', function($http, matchConfig) {
        return {

        };
    });
