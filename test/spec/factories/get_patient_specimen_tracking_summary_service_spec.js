xdescribe('Factory: Get Patient Speciment Tracking Summary Service', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var matchCommonApi,
        httpBackend;

    beforeEach(inject(function (_matchApi_, $httpBackend) {
        matchCommonApi = _matchApi_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 2 patient specimen tracking objects', function () {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary').respond([{}, {}]);
        matchCommonApi
            .getPatientSpecimentTrackingSummary()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(2);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/patientSpecimenTrackingSummary').respond(500);
        matchCommonApi
            .getPatientSpecimentTrackingSummary()
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