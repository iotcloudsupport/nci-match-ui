describe('Controller: dashboard Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'dashboard.matchbox'));

    var DashCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller,
                                $rootScope,
                                _matchApi_,
                                $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        DashCtrl = $controller('DashboardPendingReviewController', {
            $scope: scope,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withDisplayLength: function (length) {
                            // This is a mock function of the DTOptionsBuilder
                        },
                        withOption: function (bLengthChange) {
                            // This is a mock function of the DTOptionsBuilder
                        }
                    };
                }
            },
            DTColumnDefBuilder: {
                newColumnDef: function () {
                    return {
                        notVisible: function () {}
                    };
                }
            },
            matchApi: _matchApi_,
        });


    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the dashboard Variant Reports list with  on a success response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingVariantReport')
            .respond([
                {
                    "patientSequenceNumber":"10375",
                    "biopsySequenceNumber":"N-15-00005",
                    "currentPatientStatus":"REGISTRATION",
                    "specimenReceivedDate":1449922209071,
                    "molecularSequenceNumber":"10375_1000_N-15-00005",
                    "jobName":"testjob6",
                    "ngsStatus":"PENDING",
                    "ngsDateReceived":1446758737780,
                    "daysPending":38,
                    "location":"Boston"
                },
                {
                    "patientSequenceNumber":"10376",
                    "biopsySequenceNumber":"N-15-00006",
                    "currentPatientStatus":"REGISTRATION",
                    "specimenReceivedDate":1449922209078,
                    "molecularSequenceNumber":"10376-15-00005",
                    "jobName":"testjob3",
                    "ngsStatus":"PENDING",
                    "ngsDateReceived":1446758737780,
                    "daysPending":18,
                    "location":"Boston"
                },
                {
                    "patientSequenceNumber":"10377",
                    "biopsySequenceNumber":"N-15-00007",
                    "currentPatientStatus":"REGISTRATION",
                    "specimenReceivedDate":1449922205071,
                    "molecularSequenceNumber":"10377-15-00005",
                    "jobName":"testjob8",
                    "ngsStatus":"PENDING",
                    "ngsDateReceived":1446758737780,
                    "daysPending":5,
                    "location":"Boston"
                }
            ]);
        scope.loadPatientVariantReportsList();
        httpBackend.flush();

        expect(scope.pendingVariantReportList.length).toBe(3);
        expect(scope.pendingVariantReportList[0].patientSequenceNumber).toBe('10375');
        expect(scope.pendingVariantReportList[1].biopsySequenceNumber).toBe('N-15-00006');
        expect(scope.pendingVariantReportList[2].jobName).toBe('testjob8');
    });

    it('should not populate the Variant Reports list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingVariantReport').respond(500);
        scope.loadPatientVariantReportsList();
        httpBackend.flush();

        expect(scope.pendingVariantReportList.length).toBe(0);
    });


    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


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

});