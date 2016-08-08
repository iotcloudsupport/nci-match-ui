xdescribe('Factory: Get Report List Service', function () {

    beforeEach(module('config.matchbox', 'http.matchbox'));

    var reportApi,
        httpBackend;

    beforeEach(inject(function (_reportApi_, $httpBackend) {
        reportApi = _reportApi_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return back a list with 1 report', function () {
        httpBackend.when('GET', 'http://server:80/reportapi/reportList').respond([{}]);
        reportApi
            .getReportList()
            .then(function(response) {
                expect(response.status).toBe(200);
                expect(response.data.length).toBe(1);
            });
        httpBackend.flush();
    });

    it ('should return back an internal server error', function() {
        httpBackend.when('GET', 'http://server:80/reportapi/reportList').respond(500);
        reportApi
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