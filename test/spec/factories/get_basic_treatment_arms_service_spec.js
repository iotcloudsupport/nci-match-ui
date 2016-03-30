describe('Factory: Get Basic Treatment Arms Service', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var treatmentArmApi,
        httpBackend;

    beforeEach(inject(function (_treatmentArmApi_, $httpBackend) {
        treatmentArmApi = _treatmentArmApi_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 5 treatment arms', function () {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/basicTreatmentArms').respond([{}, {}, {}, {}, {}]);
        treatmentArmApi
            .getTreatmentArms()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(5);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/basicTreatmentArms').respond(500);
        treatmentArmApi
            .getTreatmentArms()
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