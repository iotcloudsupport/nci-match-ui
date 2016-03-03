describe('Controller: Specimen Tracking Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'specimen-tracking.matchbox'));

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
            matchApi: _matchApi_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the biopsies list with 1 biopsy on a success response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary')
            .respond([
                {"patientSequenceNumber":"10368","biopsies":[{"biopsySequenceNumber":"N-15-00005","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10368_1000_N-15-00005","lab":"Boston","dnaShippedDate":1449927199419,"trackingNumber":"987654321"}]}]}
            ]);
        scope.loadSpecimenTrackingList();
        httpBackend.flush();

        expect(scope.specimentTrackingList.length).toBe(1);
        expect(scope.specimentTrackingList[0].patientSequenceNumber).toBe('10368');
        expect(scope.specimentTrackingList[0].biopsySeqenuceNumber).toBe('N-15-00005');
        expect(scope.specimentTrackingList[0].molecularSequenceNumber).toBe('10368_1000_N-15-00005');
        expect(scope.specimentTrackingList[0].lab).toBe('Boston');
        expect(scope.specimentTrackingList[0].trackingNumber).toBe('987654321');
    });

    it('should not populate the biopsies list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary').respond(500);
        scope.loadSpecimenTrackingList();
        httpBackend.flush();

        expect(scope.specimentTrackingList.length).toBe(0);
    });

});