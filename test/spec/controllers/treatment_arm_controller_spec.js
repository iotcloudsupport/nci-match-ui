
describe('Controller: Treatment Arm Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'treatment-arm.matchbox', 'angular-flot'));

    var treatmentArmCtrl,
        window,
        httpBackend,
        scope,
        stateParams;

    beforeEach(inject(function ($controller,
                                $rootScope,
                                _treatmentArmApi_,
                                $httpBackend,
                                $window) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        window = $window;


        treatmentArmCtrl = $controller('TreatmentArmController', {
            $scope: scope,
            $window: window,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withOption: function (paging) {
                            // This is a mock function of the DTOptionsBuilder
                        },
                        withOption: function (info) {
                            // This is a mock function of the DTOptionsBuilder
                        }
                    };
                }
            },
            DTColumnDefBuilder: null,
            treatmentArmApi: _treatmentArmApi_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the treatment details success response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A')
            .respond(
                {
                    name: 'EAY131-A',
                    treatment_arm_status: 'OPEN',
                    exclusion_diseases: [
                        {
                            ctep_category: "Non-Small Cell Lung Cancer",
                            medra_code: "10058354",
                            short_name: "Bronchioloalveolar carcinoma"
                        }
                    ]
                }
            );

        scope.loadTreatmentArmDetails('EAY131-A');
        //scope.displayTreatmentArmList();
        httpBackend.flush();

        expect(scope.test).toBe('test');
        expect(scope.information.name).toBe('EAY131-A');
        //expect(scope.treatmentArmList.length).toBe(2);
        //expect(scope.treatmentArmList[0].treatmentArmId).toBe('MB-S1');
        //expect(scope.treatmentArmList[1].treatmentArmId).toBe('MB-S2');
    });

    it('should not populate the treatment arm list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A').respond(500);
        scope.loadTreatmentArmDetails('EAY131-A');
        httpBackend.flush();

        //expect(scope.treatmentArmList.length).toBe(0);
    });

    it('should not populate the treatment arm list on a null', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A')
            .respond(null);
        scope.loadTreatmentArmDetails('EAY131-A');
        httpBackend.flush();

        //expect(scope.treatmentArmList.length).toBe(0);
    });


});

/*
    it('should not populate the Treatment Arm Details on an error response', function() {
        // ???? why is my scope not defined? maybe I didn't inject it in the right order somewhere? I followed the format of other files
        // maybe I need to create a pared-down version of the TA Details page and build a test and slowly add stuff in
        //httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms').respond(500);
        httpBackend.when('GET', 'http://server:80/treatmentArms/EAY131-A').respond([{"treatment_arm_status":'CLOSED'}]);
        scope.loadTreatmentArmDetails();
        httpBackend.flush();

        expect(scope.information.treatment_arm_status).toBe('');
    });*/
    /*it('should not populate the Variant Reports list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingVariantReport').respond(500);
        scope.loadPatientVariantReportsList();
        httpBackend.flush();

        expect(scope.pendingVariantReportList.length).toBe(0);
    });*/

/*
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });*/

    /*
     it('should populate the dashboard Patient Pending Assignment list with  on a success response', function() {
     httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingAssignmentReport')
     .respond([
     {
     "patientSequenceNumber" : 10372,
     "biopsySequenceNumber" : 10372-005,
     "molecularSequenceNumber" : '10372_10372-005-001',
     "jobName" : "somejob1",
     "dateAssigned" : 1450030042446,
     "patientStatus" : 'PENDING_CONFIRMATION',
     "patientCurrentStatus" : 'PENDING_CONFIRMATION',
     "patientStepNumber" : 0,
     "patientConcordance" : 'Y',
     "hoursPending" : 935
     },
     {
     "patientSequenceNumber" : 10373,
     "biopsySequenceNumber" : 'N-15-00005',
     "molecularSequenceNumber" : '10373_1000_N-15-00005',
     "jobName" : 'testjob1',
     "dateAssigned" : 1450184785555,
     "patientStatus" : 'PENDING_CONFIRMATION',
     "patientCurrentStatus" : 'PENDING_CONFIRMATION',
     "patientStepNumber" : 0,
     "patientConcordance" : 'Y',
     "hoursPending" : 893
     }
     ]);
     scope.loadPatientPendingAssignmentReportsList();
     httpBackend.flush();

     expect(scope.pendingAssignmentReportList.length).toBe(2);
     expect(scope.pendingAssignmentReportList[0].jobName).toBe("somejob1");
     expect(scope.pendingAssignmentReportList[1].molecularSequenceNumber).toBe('10373_1000_N-15-00005');
     expect(scope.pendingAssignmentReportList[1].hoursPending).toBe(893);
     });

     it('should not populate the Patient Pending Assignment on an error response', function() {
     httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingAssignmentReport').respond(500);
     scope.loadPatientPendingAssignmentReportsList();
     httpBackend.flush();

     expect(scope.pendingAssignmentReportList.length).toBe(0);
     });

     afterEach(function () {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
     });
     */


    /*
     it('should populate the dashboard Patient In Limbo Reports list with  on a success response', function() {
     httpBackend.when('GET', 'http://server:80/reportapi/limboPatient')
     .respond([
     {
     "psn" : "202re",
     "msn" : "202_N-15-00005",
     "bsn" : "N-15-00005",
     "concordance" : "W",
     "currentPatientStatus" : "REGISTRATION"
     },
     {
     "psn" : "203re",
     "msn" : "203_N-15-00005",
     "bsn" : "N-15-00006",
     "job_name" : "somejob2",
     "currentPatientStatus" : "PENDING_CONFIRMATION"
     }
     ]);
     scope.loadLimboPatientsList();
     httpBackend.flush();

     expect(scope.concordancePatientList.length).toBe(2);
     expect(scope.concordancePatientList[0].psn).toBe("202re");
     expect(scope.concordancePatientList[0].msn).toBe('202_N-15-00005');
     expect(scope.concordancePatientList[0].concordance).toBe("W");
     });

     it('should not populate the Patient In Limbo Reports on an error response', function() {
     httpBackend.when('GET', 'http://server:80/reportapi/limboPatient').respond(500);
     scope.loadLimboPatientsList();
     httpBackend.flush();

     expect(scope.concordancePatientList.length).toBe(0);
     });
     */

/*

});*/