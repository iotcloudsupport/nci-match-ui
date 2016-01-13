describe('Controller: Molecular Sequences Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'molecular-sequences.matchbox'));

    var molecularSequencesCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _molecularSequenceService_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        molecularSequencesCtrl = $controller('MolecularSequencesController', {
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
            molecularSequenceService: _molecularSequenceService_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the molecular sequence list with 1 molecular sequence on a success response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary')
            .respond([
                {"patientSequenceNumber":"10368","biopsies":[{"biopsySequenceNumber":"N-15-00005","specimenReceivedDate":1449922209071,"specimenFailureDate":null,"ptenOrderDate":1449940269071,"ptenResultDate":1449940329071,"pathologyReviewdate":1449922389071,"samples":[{"molecularSequenceNumber":"10368_1000_N-15-00005","lab":"Boston","dnaShippedDate":1449927199419,"trackingNumber":"987654321"}]}]}
            ]);
        scope.loadMolecularSequencesList();
        httpBackend.flush();

        expect(scope.molecularSequencesList.length).toBe(1);
        expect(scope.molecularSequencesList[0].molecularSequenceNumber).toBe('10368_1000_N-15-00005');
        expect(scope.molecularSequencesList[0].patientSequenceNumber).toBe('10368');
        expect(scope.molecularSequencesList[0].biopsySeqenuceNumber).toBe('N-15-00005');
        expect(scope.molecularSequencesList[0].lab).toBe('Boston');
        expect(scope.molecularSequencesList[0].trackingNumber).toBe('987654321');
        expect(scope.molecularSequencesList[0].nucleicAcidSendoutDate).toBe(1449927199419);
    });

    it('should not populate the molecular sequence list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary').respond(500);
        scope.loadMolecularSequencesList();
        httpBackend.flush();

        expect(scope.molecularSequencesList.length).toBe(0);
    });

});