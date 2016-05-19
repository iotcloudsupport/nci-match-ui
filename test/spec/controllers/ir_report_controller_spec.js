describe('Controller: Ir Report Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'iradmin.matchbox'));

    var reportsCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _irAdminApi_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        reportsCtrl = $controller('IrAdminController', {
            $scope: scope,
            DTOptionsBuilder: {
                // Mocking the datatables DTOptionsBuilder functions to do nothing
                newOptions: function() {
                    return {
                        withDisplayLength: function(length) {}
                    };
                }
            },
            DTColumnDefBuilder: {
               // Mocking the datatables DTColumnDefBuilder functions to do nothing
               newColumnDef: function(idx) {
                   return {
                       notSortable : function() {}
                   };
               }
            },
            DTColumnDefBuilder: null,
            irAdminApi: _irAdminApi_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    // it('should populate the report list with 2 links on a success response', function() {
    //     httpBackend.when('GET', 'http://server:80/match/common/rs/irList')
    //         .respond([
    //             {ipAddress: '129.43.127.133'},
    //             {ipAddress: '10.133.226.21'}
    //         ]);
    //     scope.loadHeartBeatList();
    //     httpBackend.flush();
    //
    //     //expect(scope.patientList.length).toBe(3);
    //     //expect(scope.patientList[0].patientSequenceNumber).toBe('100');
    //     //expect(scope.patientList[1].patientSequenceNumber).toBe('101');
    //     //expect(scope.patientList[2].patientSequenceNumber).toBe('102');
    //
    //     // expect(scope.irList.length).toBe(2);
    //     //expect(scope.irList[0].name).toBe('screenedVsEnrolled');
    //     //expect(scope.irList[0].excelHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsEnrolled&type=excel');
    //     //expect(scope.irList[0].jsonHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsEnrolled&type=json');
    //     //expect(scope.irList[0].csvHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsEnrolled&type=csv');
    //     //
    //     //expect(scope.irList[1].name).toBe('screenedVsWithaMoi');
    //     //expect(scope.irList[1].excelHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsWithaMoi&type=excel');
    //     //expect(scope.irList[1].jsonHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsWithaMoi&type=json');
    //     //expect(scope.irList[1].csvHref).toBe('http://server:80/reportapi/downloadReportFile?name=screenedVsWithaMoi&type=csv');
    // });

    // it('should not populate the report list on an error response', function() {
    //     httpBackend.when('GET', 'http://server:80/reportapi/reportList').respond(500);
    //     scope.loadHeartBeatList();
    //     httpBackend.flush();
    //
    //     expect(scope.irList.length).toBe(0);
    // });

});