describe('HTTP MATCHBox Factory: Treatment Arm Service', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var treatmentArmService,
        httpBackend;

    beforeEach(function () {
        inject(function (_treatmentArmService_, $httpBackend) {
            treatmentArmService = _treatmentArmService_;
            httpBackend = $httpBackend;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 5 treatment arms', function () {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicTreatmentArms').respond([{}, {}, {}, {}, {}]);
        treatmentArmService
            .getBasicTreatmentArms()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(5);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicTreatmentArms').respond(500);
        treatmentArmService
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