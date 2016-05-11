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
        // alert(matchConfig.matchApiBaseUrl + '/common/rs/getGraphInfoFromVCF?patientId=10005&biopsySequenceNumber=T-15-000022&jobName=MSN3111_v1_fc12ad97-2c1e-45e2-8beb-8a77eef4ecf6')
        // http://localhost:8080/match/common/rs/getGraphInfoFromVCF?patientId=10005&biopsySequenceNumber=T-15-000022&jobName=MSN3111_v1_fc12ad97-2c1e-45e2-8beb-8a77eef4ecf6
        return {
            getSvgGene: function() {

                // molecularSequenceNumber=SampleControl_MoCha_10
                // http://localhost:8080/match/common/rs/getSampleControlGraphInfoFromVCF?molecularSequenceNumber=SampleControl_MoCha_1

                return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getGraphInfoFromVCF?patientId=10005&biopsySequenceNumber=T-15-000022&jobName=MSN3111_v1_fc12ad97-2c1e-45e2-8beb-8a77eef4ecf6');

                // return $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getSampleControlGraphInfoFromVCF?molecularSequenceNumber=SampleControl_MoCha_10');
            }
        };
    })
    .factory('matchApiMock', function($http, matchConfig, $q, $log) {
        return {
            getPatientDetailsData: function(patientSequenceNumberParam) {
                $log.debug('Loading Patient ' + patientSequenceNumberParam);
                
                var deferred = $q.defer();
                
                var data = {
                    patientSequenceNumber: 100065,
                    gender: 'Male',
                    ethnicity: 'White',
                    currentStep: 1,
                    status: 'REGISTRATION',
                    concordance: 'Yes',
                    diseases:[
                        {name: 'Invasive breast cancer', medDraCode: 1000961}
                    ],
                    treatmentArm: 'EAY131-B',
                    assignment: { id: 123, reason: 'The patient arm match on variant indetifier [ABC, EDF]' },
                    drugs: ['Drug 1', 'Drug 2', 'Drug 3'],
                    documents: [
                        {url:'url1', title: 'Document 1'},
                        {url:'url2', title: 'Document 2'},
                        {url:'url3', title: 'Document 3'}
                    ],
                    steps: [
                        {
                            stepNumber: 0,
                            subSteps: [
                                {
                                    status: 'REGISTRATION',
                                    treatmentArm: 'EAY131-B',
                                    variantReport: 'reportLink',
                                    assignmentReport: 'reportLink',
                                    statusDate: 'Sep 29, 2015, 9:00 PM'
                                },
                                {
                                    status: 'PENDING APPROVAL',
                                    treatmentArm: 'EAY131-B',
                                    variantReport: 'reportLink',
                                    assignmentReport: 'reportLink',
                                    statusDate: 'Sep 30, 2015, 9:00 PM'
                                },
                                {
                                    status: 'ON_TREATMENT_ARM',
                                    treatmentArm: 'EAY131-B',
                                    variantReport: 'reportLink',
                                    assignmentReport: 'reportLink',
                                    statusDate: 'Oct 1, 2015, 9:00 PM'
                                }
                            ]
                        }
                    ]
                }
                
                deferred.resolve(data);
                return deferred.promise;
            },
            getPatientListData: function(psn) {
                var deferred = $q.defer();
                
                var data = [
                    {
                        patientSequenceNumber: 100065,
                        gender: 'Male',
                        ethnicity: 'White',
                        status: 'REGISTRATION',
                        treatmentArm: 'EAY131-A',
                        step: 0,
                        registrationDate: 1441165873572,
                        diseases: 'Disease 1'
                    },   
                    {
                        patientSequenceNumber: 100087,
                        gender: 'Female',
                        ethnicity: 'White',
                        status: 'PENDING',
                        treatmentArm: 'EAY131-B',                        
                        step: 1,
                        registrationDate: 1430165873572,
                        diseases: 'Disease 3'
                    },   
                    {
                        patientSequenceNumber: 100099,
                        gender: 'Male',
                        ethnicity: 'Hispanic',
                        status: 'ON_TREATMENT_ARM',
                        treatmentArm: 'EAY131-C',                        
                        step: 2,
                        registrationDate: 1440765873572,
                        offTrialDate: 1440165878572,
                        diseases: 'Disease 3'
                    }   
                ];
                
                deferred.resolve(data);
                return deferred.promise;
            }
        };
    })
  ;