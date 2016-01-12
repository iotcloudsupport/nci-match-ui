describe('Factory: Molecular Sequence Service Factory', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var molecularSequenceService,
        httpBackend;

    beforeEach(function () {
        inject(function (_molecularSequenceService_, $httpBackend) {
            molecularSequenceService = _molecularSequenceService_;
            httpBackend = $httpBackend;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 4 patient specimen tracking objects', function () {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary').respond([{}, {}, {}, {}]);
        molecularSequenceService
            .getMolecularSequenceList()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(4);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary').respond(500);
        molecularSequenceService
            .getMolecularSequenceList()
            .then(
                function(response) {
                    throw 'Not expecting the success block to be called.';
                },
                function(response) {
                    expect(response.status).toBe(500);
                });
        httpBackend.flush();
    });

});