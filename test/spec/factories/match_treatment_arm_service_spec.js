describe('Factory: Get Basic Treatment Arms Service', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var matchApi,
        httpBackend;

    beforeEach(inject(function (_matchApi_, $httpBackend) {
        matchApi = _matchApi_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 5 treatment arms', function () {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicTreatmentArms').respond([{}, {}, {}, {}, {}]);
        matchApi
            .getBasicTreatmentArms()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(5);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicTreatmentArms').respond(500);
        matchApi
            .getBasicTreatmentArms()
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