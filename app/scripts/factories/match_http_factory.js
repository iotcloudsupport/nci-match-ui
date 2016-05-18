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
            getAllTreatmentArms: function() {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/treatmentArms');
            },
            getTreatmentArmDetails: function(taId) {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/treatmentArms/' + taId);
            }

        };
    })
    .factory('irAdminApi', function($http, matchConfig) {

        return {
            getAdminHeartBeat: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getIrUploaderAdminObjects');
            }

        };
        return {
            getPosiveSample: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getSampleControlsBySite');
            }
        };
    })
    .factory('svgApi', function($http, matchConfig) {
        return {
            getSvgGene: function(id) {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getSampleControlGraphInfoFromVCF?molecularSequenceNumber=' + id);
                // return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getGraphInfoFromVCF?patientId=10005&biopsySequenceNumber=T-15-000022&jobName=MSN3111_v1_fc12ad97-2c1e-45e2-8beb-8a77eef4ecf6');
            }
        };
    });
