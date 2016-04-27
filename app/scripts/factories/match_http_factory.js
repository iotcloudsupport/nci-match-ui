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
        // Note: Legacy API that will be replaced in the future.
        return {
            getBasicPatientsData: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData');
            },
            getPatientDetailsData: function(psn) {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientDetails?patientSequenceNumber=' + psn);
            },
            getBasicTreatmentArms: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicTreatmentArms');
            },
            getPatientSpecimentTrackingSummary: function() {
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
            },
            getActivityFeedList: function() {
                return $http.get(matchConfig.reportApiBaseUrl + '/reportList');
            }
        };
    })
    .factory('treatmentArmApi', function($http, matchConfig) {
        return {
            getTreatmentArms: function() {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/basicTreatmentArms');
            },
            getTreatmentArmDetails: function(id) {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/treatmentArms/' + id);
            },
            getPatientStatusGraph: function(id){
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/patientStatusGraph/' + id);
            },
            getPatientDiseaseGraph: function(id){
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/patientDiseaseGraph/'+ id);
            }
        };
    })
;