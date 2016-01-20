describe('Controller: Reports Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'reports.matchbox'));

    var reportsCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _reportApi_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        reportsCtrl = $controller('ReportsController', {
            $scope: scope,
            DTOptionsBuilder: {
                // Mocking the datatables DTOptionsBuilder functions to do nothing
                newOptions: function() {
                    return {
                        withDisplayLength: function(length) {}
                    }
                }
            },
            DTColumnDefBuilder: {
                // Mocking the datatables DTColumnDefBuilder functions to do nothing
                newColumnDef: function(idx) {
                    return {
                        notSortable : function() {}
                    }
                }
            },
            reportApi: _reportApi_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the report list with 2 reports on a success response', function() {
        httpBackend.when('GET', 'http://server:80/reportapi/reportList')
            .respond([
                {name: 'screenedVsEnrolled'},
                {name: 'screenedVsWithaMoi'}
            ]);
        scope.loadReportList();
        httpBackend.flush();

        expect(scope.reportList.length).toBe(2);
        expect(scope.reportList[0].name).toBe('screenedVsEnrolled');
        expect(scope.reportList[0].excelHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsEnrolled&type=excel');
        expect(scope.reportList[0].jsonHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsEnrolled&type=json');
        expect(scope.reportList[0].csvHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsEnrolled&type=csv');

        expect(scope.reportList[1].name).toBe('screenedVsWithaMoi');
        expect(scope.reportList[1].excelHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsWithaMoi&type=excel');
        expect(scope.reportList[1].jsonHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsWithaMoi&type=json');
        expect(scope.reportList[1].csvHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsWithaMoi&type=csv');
    });

    it('should not populate the report list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/reportapi/reportList').respond(500);
        scope.loadReportList();
        httpBackend.flush();

        expect(scope.reportList.length).toBe(0);
    });

});