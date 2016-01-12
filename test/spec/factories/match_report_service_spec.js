describe('Factory: Biopsy Sequence Service Factory', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var reportService,
        httpBackend;

    beforeEach(inject(function (_reportService_, $httpBackend) {
        reportService = _reportService_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 1 report', function () {
        httpBackend.when('GET', 'http://server:80/reportapi/reportList').respond([{}]);
        reportService
            .getReportList()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(1);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/reportapi/reportList').respond(500);
        reportService
            .getReportList()
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