describe('Controller: Ir Report Controller', function () {

    'use strict'

    function getTestData() {

        // "id" : 55b8f62a00922fdd29b46e7e,
        //     "hostName" : NCIAS-D1356,
        //     "ipAddress" : 10.133.226.13,
        //     "status" : Lost contact! Last heartbeat was sent 99598 minutes ago,
        //     "lastContactDate" : 1458143402201,
        //     "location" : ,
        // "externalIpAddress" : 10.133.226.13,
        //     "dbReport" : dbReport,
        //     "dataFile" : dataFile,
        //     "logFile" : logFile,
        //     "dbReportPath" : /local/content/wildfly/standalone-18080/log/iruploader/10-133-226-13/dbreport-1458140462188.json,
        //     "dataFilePath" : /local/content/wildfly/standalone-18080/log/iruploader/10-133-226-13/data-1458143402180.txt,
        //     "logFilePath" : /local/content/wildfly/standalone-18080/log/iruploader/10-133-226-13/iruploader-1458140462188.log,
        //     "lastNotificationDate" : 1448918220981


        var data = [
            {
                hostName: 'NCIAS-D1356',
                ipAddress: '10.133.226.13',
                status: "Lost contact! Last heartbeat was sent 99598 minutes ago",
                lastContactDate: '1458143402201',
                externalIpAddress: '10.133.226.13',
                dbReport: "dbReport",
                lastNotificationDate: '1441165873572'
            },
            {
                hostName: 'NCS-DA',
                ipAddress: '10.133.211.17',
                status: "All Clear",
                lastContactDate: '1458143402201',
                externalIpAddress: '10.133.226.13',
                dbReport: "dbReport",
                lastNotificationDate: '1441165873572'
            },
            {
                hostName: 'NCI-MATCH-IR',
                ipAddress: '12.334.106.13',
                status: "All Clear",
                lastContactDate: '1458143402201',
                externalIpAddress: '10.133.226.24',
                dbReport: "dbReport",
                lastNotificationDate: '1441165873572'
            }
        ];

        return data;
    }

    beforeEach(module('config.matchbox', 'http.matchbox', 'iradmin.matchbox'));
    var $scope;
    var irAdminApi;
    var reportsCtrl;
    var httpBackend;
    var $q;
    var deferred;
    var testData;
    var $log;

    beforeEach(inject(function (_$rootScope_, $controller, $httpBackend, _irAdminApi_, _$log_, _$q_, _$http_) {  //$scope, $http, $window, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi
        testData = getTestData();
        deferred = _$q_.defer();
        $log = _$log_;
        $q = _$q_;
        httpBackend = $httpBackend;
        $scope = _$rootScope_.$new();
        irAdminApi = _irAdminApi_;
        reportsCtrl = $controller('IrAdminController', {
            $scope: $scope,
            $http: _$http_,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withDisplayLength: function (length) {
                            return 5;
                        }
                    };
                }
            },
            irAdminApi: _irAdminApi_
        });
    }));

    // afterEach(function () {
    //     httpBackend.verifyNoOutstandingExpectation();
    //     httpBackend.verifyNoOutstandingRequest();
    // });

    it('should have DataTable objects defined', function () {
        expect($scope.dtOptions).toBeDefined();
    });

    describe('General', function () {
        it('should have empty list until load is called', function () {
            expect($scope.irList).toBeDefined();
            expect($scope.irList.length).toBe(0);
        });
    });

    it('should call api load method and have the list populated', function () {
        deferred.resolve(testData);

        spyOn(irAdminApi, 'loadHeartBeatList').and.returnValue(deferred.promise);

        $scope.loadHeartBeatList();
        $scope.$apply();

        expect(irAdminApi.loadHeartBeatList).toHaveBeenCalled();
        expect($scope.irList.length).toBeLessThan(200);
    });
});