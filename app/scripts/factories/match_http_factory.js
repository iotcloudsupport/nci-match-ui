angular.module('http.matchbox', [])
    .factory('workflowApi', function($http, matchConfig) {
        return {
            getDashboardStatistcs: function() {
                return $http.get(matchConfig.workflowApiBaseUrl + '/dashboardStatistics');
            }
        }
    })
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
    .factory('biopsySequenceService', function($http, matchConfig) {
        return {
            getBiopsySequenceList: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/patientSpecimenTrackingSummary');
            }
        };
    })
    .factory('molecularSequenceService', function($http, matchConfig) {
        return {
            getMolecularSequenceList: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/patientSpecimenTrackingSummary');
            }
        };
    })
    .factory('patientsWithPendingVariantReportService', function($http, matchConfig) {
        return {
            getPatientVariantReports: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientsWithPendingVariantReport');
            }
        };
    })
    .factory('patientsWithPendingAssignmentReportService', function($http, matchConfig) {
        return {
            getPatientPendingAssignmentReports: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientsWithPendingAssignmentReport');
            }
        };
    })
    .factory('patientsInLimboService', function($http, matchConfig) {
        return {
            getPatientInLimboReports: function() {
                return $http.get(matchConfig.reportApiBaseUrl + '/limboPatient');
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
