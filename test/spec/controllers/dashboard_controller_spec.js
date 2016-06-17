describe('Controller: dashboard Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'dashboard.matchbox'));

    var DashCtrl,
        DashActivityCtrl,
        httpBackend,
        scope;

    var mockStore = {
        profile: {
            email: 'matchbox.user@matchbox.app'
        },
        get: function() {
            return this.profile;
        }
    };

    beforeEach(inject(function ($controller,
                                $rootScope,
                                _matchApi_,
                                _reportApi_,
                                _workflowApi_,
                                $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        /*var store = {};

        spyOn(localStorage, 'getItem').andCallFake(function (key) {
            return store[key];
        });
        spyOn(localStorage, 'setItem').andCallFake(function (key) {
            return store[key] = value + '';
        });
        spyOn(localStorage, 'clear').andCallFake(function () {
            store = {};
        });*/

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
            reportApi: _reportApi_,
            store: mockStore
        });

        //Controller
        chartjsDonut = $controller('DashboardTreatmentArmAccrualChartController', {
            $scope: scope
        });

        //Controller
        stats = $controller('DashboardStatisticsController', {
            $scope: scope,
            workflowApi: _workflowApi_,
            store: mockStore
        });

        //Controller
        $controller('DashboardActivityFeedController', {
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
            reportApi: _reportApi_
        });
    }));

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

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the dashboard Blood Variant Reports list with  on a success response', function() {
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
        scope.loadBloodVariantReportsList();
        httpBackend.flush();

        expect(scope.pendingBloodVariantReportList.length).toBe(3);
        expect(scope.pendingBloodVariantReportList[0].patientSequenceNumber).toBe('10375');
        expect(scope.pendingBloodVariantReportList[1].biopsySequenceNumber).toBe('N-15-00006');
        expect(scope.pendingBloodVariantReportList[2].jobName).toBe('testjob8');
    });

    it('should not populate the Blood Variant Reports list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingVariantReport').respond(500);
        scope.loadBloodVariantReportsList();
        httpBackend.flush();

        expect(scope.pendingBloodVariantReportList.length).toBe(0);
    });

    it('should populate the dashboard Tissue Variant Reports list with  on a success response', function() {
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
        scope.loadTissueVariantReportsList();
        httpBackend.flush();

        expect(scope.pendingTissueVariantReportList.length).toBe(3);
        expect(scope.pendingTissueVariantReportList[0].patientSequenceNumber).toBe('10375');
        expect(scope.pendingTissueVariantReportList[1].biopsySequenceNumber).toBe('N-15-00006');
        expect(scope.pendingTissueVariantReportList[2].jobName).toBe('testjob8');
    });

    it('should not populate the Tissue Variant Reports list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingVariantReport').respond(500);
        scope.loadTissueVariantReportsList();
        httpBackend.flush();

        expect(scope.pendingTissueVariantReportList.length).toBe(0);
    });

    it('should populate the aMOI donut chart on a success response', function() {
        scope.loadChartjsDonutChart();

        expect(scope.donutData.length).toBe(6);
        expect(scope.donutData[0].value).toBe(4);
        expect(scope.donutData[5].label).toBe('5+ aMOI');
    });

    it('should populate the TA Accrual shart on a success response', function() {
        scope.loadTreatmentArmAccrual();

        expect(scope.barData.datasets[0].label).toBe("Accrual Dataset");

    });

    it('should populate the dashboard statistics on a success response', function() {
        httpBackend.when('GET', 'http://server:80/matchapi/dashboardStatistics').respond(
            {
                "number_of_patients" : 5,
                "number_of_screened_patients" : 3,
                "number_of_patients_with_treatment" : 2
            }
        );
        scope.loadDashboardStatistics();
        httpBackend.flush();

        expect(scope.numberOfPatients).toBe(5);
    });

    it('should populate the activity list on a success response', function() {
        scope.loadActivityList();
        expect(scope.activityList.length).toBe(10);
    });

});