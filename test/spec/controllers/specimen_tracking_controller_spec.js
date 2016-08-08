xdescribe('Controller: Specimen Tracking Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'matchbox.specimen-tracking'));

    var biopsiesCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _matchApi_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        biopsiesCtrl = $controller('SpecimenTrackingController', {
            $scope: scope,
            DTOptionsBuilder: {
                // Mocking the datatables DTOptionsBuilder functions to do nothing
                newOptions: function() {
                    return {
                        withDisplayLength: function(length) {}
                    }
                }
            },
            DTColumnDefBuilder: null,
            matchCommonApi: _matchApi_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    /*it('should populate the specimen tracking list with 1 entry on a success response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary')
            .respond([
                {"patient_id":"10368","biopsies":[{"biopsySequenceNumber":"N-15-00005","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10368_1000_N-15-00005","lab":"MGH","dnaShippedDate":1449927199419,"trackingNumber":"987654321"}]}]}
            ]);
        scope.loadSpecimenTrackingList();
        httpBackend.flush();

        expect(scope.specimenTrackingList.length).toBe(1);
        expect(scope.specimenTrackingList[0].patient_id).toBe('10368');
        expect(scope.specimenTrackingList[0].biopsySeqenuceNumber).toBe('N-15-00005');
        expect(scope.specimenTrackingList[0].molecular_id).toBe('10368_1000_N-15-00005');
        expect(scope.specimenTrackingList[0].lab).toBe('MGH');
        expect(scope.specimenTrackingList[0].trackingNumber).toBe('987654321');
    });

    it('should not populate the specimen tracking list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary').respond(500);
        scope.loadSpecimenTrackingList();
        httpBackend.flush();

        expect(scope.specimenTrackingList.length).toBe(0);
    });

    it('should populate the specimen tracking list with 5 entries, MGH count == 2, MDACC count == 3, and the other sites count == 0 on a success response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary')
            .respond([
                {"patient_id":"10368","biopsies":[{"biopsySequenceNumber":"N-15-00005","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10368_1000_N-15-00005","lab":"MGH","dnaShippedDate":1449927199419,"trackingNumber":"987654321"}]}]},
                {"patient_id":"10369","biopsies":[{"biopsySequenceNumber":"N-15-00006","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10369_1000_N-15-00006","lab":"MGH","dnaShippedDate":1449927199419,"trackingNumber":"987654322"}]}]},
                {"patient_id":"10370","biopsies":[{"biopsySequenceNumber":"N-15-00007","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10370_1000_N-15-00007","lab":"MDACC","dnaShippedDate":1449927199419,"trackingNumber":"987654323"}]}]},
                {"patient_id":"10371","biopsies":[{"biopsySequenceNumber":"N-15-00008","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10371_1000_N-15-00008","lab":"MDACC","dnaShippedDate":1449927199419,"trackingNumber":"987654324"}]}]},
                {"patient_id":"10372","biopsies":[{"biopsySequenceNumber":"N-15-00009","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10372_1000_N-15-00009","lab":"MDACC","dnaShippedDate":1449927199419,"trackingNumber":"987654325"}]}]}

            ]);
        scope.loadSpecimenTrackingList();
        httpBackend.flush();

        expect(scope.specimenTrackingList.length).toBe(5);
        expect(scope.sites.mgh.count).toBe(2);
        expect(scope.sites.mgh.percent).toBe(40);
        expect(scope.sites.yale.count).toBe(0);
        expect(scope.sites.yale.percent).toBe(0);
        expect(scope.sites.mda.count).toBe(3);
        expect(scope.sites.mda.percent).toBe(60);
        expect(scope.sites.mocha.count).toBe(0);
        expect(scope.sites.mocha.percent).toBe(0);
    });*/

});