describe('Controller: Ir Report Controller', function () {

    'use strict'

    function getHeartBeatTestData() {

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

    function getSampleControlTestData() {

        var data = [
            {
                molecularSequenceNumber: "SampleControl_MoCha_1",
                dateCreated: '1452022386103',
                dateReceived: null,
                site: "MoCha",
                siteIpAddress: "119.55.127.133",
                positiveControlVersion: 0,
                positiveControlDateLoaded: null,
                status: null,
                comment: null,
                passed: false,
                nextGenerationSequence: null
            },
            {
                molecularSequenceNumber: "SampleControl_MoCha_15",
                dateCreated: '1452022386103',
                dateReceived: null,
                site: "MoCha",
                siteIpAddress: "129.43.127.03",
                positiveControlVersion: 0,
                positiveControlDateLoaded: null,
                status: null,
                comment: null,
                passed: false,
                nextGenerationSequence: null
            },
            {
                molecularSequenceNumber: "SampleControl_MoCha_25",
                dateCreated: '1452022386103',
                dateReceived: null,
                site: "MoCha",
                siteIpAddress: "159.43.127.133",
                positiveControlVersion: 0,
                positiveControlDateLoaded: null,
                status: null,
                comment: null,
                passed: false,
                nextGenerationSequence: null
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
    var testHeartBeatData;
    var testSampleControlData;
    var $log;

    beforeEach(inject(function (_$rootScope_, $controller, $httpBackend, _irAdminApi_, _$log_, _$q_, _$http_) {  //$scope, $http, $window, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi
        testHeartBeatData = getHeartBeatTestData();
        testSampleControlData = getSampleControlTestData();
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

    it('should have DataTable objects defined', function () {
        expect($scope.dtOptions).toBeDefined();
    });

    describe('General', function () {
        it('should have empty list until load is called', function () {
            expect($scope.irList).toBeDefined();
            expect($scope.irList.length).toBe(0);
        });
    });

    it('should call api load method and have the Heartbeat list populated', function () {
        deferred.resolve(testHeartBeatData);

        spyOn(irAdminApi, 'loadHeartBeatList').and.returnValue(deferred.promise);

        $scope.loadHeartBeatList();
        $scope.$apply();

        expect(irAdminApi.loadHeartBeatList).toHaveBeenCalled();
        expect($scope.irList.length).toBeLessThan(200);
    });

    it('should call api load method and have the Sample Control list populated', function () {
        deferred.resolve(testSampleControlData);

        spyOn(irAdminApi, 'loadSampleControlsList').and.returnValue(deferred.promise);

        $scope.loadSampleControlsList();
        $scope.$apply();

        expect(irAdminApi.loadSampleControlsList).toHaveBeenCalled();
        expect($scope.irList.length).toBeLessThan(200);
    });
});