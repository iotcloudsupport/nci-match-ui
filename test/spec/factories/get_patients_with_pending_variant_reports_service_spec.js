describe('Factory: Get Patients with Pending Variant Reports Service', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var dashboardService,
        httpBackend;

    beforeEach(inject(function (_matchApi_, $httpBackend) {
        matchApi = _matchApi_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 3 dashboards', function () {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingVariantReport').respond([{}, {}, {}]);
        matchApi
            .getPatientVariantReports()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(3);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getPatientsWithPendingVariantReport').respond(500);
        matchApi
            .getPatientVariantReports()
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