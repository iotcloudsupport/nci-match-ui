(function () {
    "use strict";

    angular.module('http.matchbox', [])
        .factory('workflowApi', workflowApi)
        .factory('matchApi', matchApi)
        .factory('reportApi', reportApi)
        .factory('treatmentArmApi', treatmentArmApi)
        .factory('irAdminApi', irAdminApi)
        .factory('irSampleVariantApi', irSampleVariantApi)
        .factory('svgApi', svgApi)
        .factory('patientApi', patientApi);

    function workflowApi($http, matchConfig) {
        return {
            getDashboardStatistcs: function () {
                return $http.get(matchConfig.workflowApiBaseUrl + '/dashboardStatistics');
            },
            getRejoinRequested: function () {
                return $http.get(matchConfig.workflowApiBaseUrl + '/rejoinRequested');
            }
        };
    }

    function matchApi($http, matchConfig) {
        // Note: Legacy API that will be replaced in the future.
        return {
            getBasicPatientsData: function () {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData');
            },
            getPatientDetailsData: function (psn) {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientDetails?patientSequenceNumber=' + psn);
            },
            getBasicTreatmentArms: function () {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicTreatmentArms');
            },
            getPatientSpecimentTrackingSummary: function () {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/patientSpecimenTrackingSummary');
            },
            getPatientVariantReports: function () {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientsWithPendingVariantReport');
            },
            getPatientPendingAssignmentReports: function () {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getPatientsWithPendingAssignmentReport');
            }
        };
    }

    function reportApi($http, matchConfig) {
        return {
            getPatientInLimboReports: function () {
                return $http.get(matchConfig.reportApiBaseUrl + '/limboPatient');
            },
            getReportList: function () {
                return $http.get(matchConfig.reportApiBaseUrl + '/reportList');
            },
            getActivityFeedList: function () {
                return $http.get(matchConfig.reportApiBaseUrl + '/reportList');
            }
        };
    }

    function treatmentArmApi($http, matchConfig) {
        return {
            getTreatmentArms: function () {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/basicTreatmentArms');
            },
            getAllTreatmentArms: function () {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/treatmentArms');
            },
            getTreatmentArmDetails: function (taId) {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/treatmentArms/' + taId);
            }

        };
    }

    function irAdminApi($http, matchConfig) {

        return {
            loadHeartBeatList: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getIrUploaderAdminObjects');
            },
            loadSampleControlsList: function() {
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getSampleControlsBySite');
            }
        };

    }

    function irSampleVariantApi($http, $stateParams, matchConfig) {

        return {
            loadVariantReportList: function() {
                var id = $stateParams.sampleId;
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getVariantReportForSampleControl?molecularSequenceNumber=' + id);
            }
        };

    }


    function svgApi($http, $stateParams, matchConfig) {
        return {
            getSvgGene: function () {
                var id = $stateParams.sampleId;
                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getSampleControlGraphInfoFromVCF?molecularSequenceNumber=' + id);
            }
        };
    }

    function patientApi($http, matchConfig) {
        return {
            loadPatient: loadPatient,
            loadPatientList: loadPatientList
        }

        function loadPatient(id) {
            return $http.get(matchConfig.patientApiBaseUrl + '/patients/' + id);
        }

        function loadPatientList() {
            return $http.get(matchConfig.patientApiBaseUrl + '/patients');
        }
    }
} ());