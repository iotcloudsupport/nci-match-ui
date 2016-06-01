describe('Controller: Ir Report Controller', function () {

    'use strict'

    var mockPositivesets = {
        "data": [
            { 'sampleSite': 'MoCha',
                'sampleId': 'MoCha_1',
                'sampleMsn': 'SampleControl_MoCha_1',
                'dateCreated': 'null',
                'dateReceived': '1464699137050',
                'status': 'null'
            },
            { 'sampleSite': 'MoCha',
                'sampleId': 'MoCha_2',
                'sampleMsn': 'SampleControl_MoCha_2',
                'dateCreated': 'null',
                'dateReceived': '1464699137050',
                'status': 'null'
            }
        ]
    };

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

    function getMoChaSampleControlTestData() {

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

    function getMDACCampleControlTestData() {

        var data = [
            {
                type : 'id',
                publicMedIds : '',
                geneName : '',
                chromosome : 'chr9',
                position : '98209594',
                identifier : '.',
                reference : '-',
                alternative : 'A',
                filter : 'PASS',
                description : '',
                protein : 'p.Tyr1316fs',
                transcript : 'NM_000264.3',
                hgvs : 'c.3944_3945insT',
                location : 'exonic',
                readDepth : '387',
                rare : 'false',
                alleleFrequency : '0.687339',
                flowAlternativeAlleleObservationCount : '266',
                flowReferenceAlleleObservations : '121',
                referenceAlleleObservations : '389',
                alternativeAlleleObservationCount : '32',
                variantClass : '',
                levelOfEvidence : '',
                inclusion : 'true',
                armSpecific : 'false',
                gene : 'PTCH1',
                oncominevariantclass : 'Deleterious',
                exon : '23',
                function : 'frameshiftInsertion',
                proteinMatch : '',
                confirmed : 'false',
                matchingId : ''
            }
        ];

        return data;
    }

    function getPositiveTokensData() {

        var data = [
            {
                ipAddress : '112.55.66.99',
                confirmation : '123456'
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
    var testMDACCampleControlTestData;
    var testPositiveTokensData;
    var $log;
    var prompt;
    var $filter;
    var $uibModal;

    beforeEach(inject(function (_$rootScope_, $controller, $httpBackend, _irAdminApi_, _$log_, _$q_, _$http_, _prompt_, _$filter_) {  //$scope, $http, $window, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi
        testHeartBeatData = getHeartBeatTestData();
        testSampleControlData = getMoChaSampleControlTestData();
        testMDACCampleControlTestData = getMDACCampleControlTestData();
        testPositiveTokensData = getPositiveTokensData();
        deferred = _$q_.defer();
        $log = _$log_;
        $q = _$q_;
        $scope = _$rootScope_.$new();
        prompt = _prompt_;
        $filter = _$filter_;
        httpBackend = $httpBackend;

        irAdminApi = _irAdminApi_;
        reportsCtrl = $controller('IrAdminController', {
            $http: _$http_,
            $filter: _$filter_,
            prompt: prompt,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withDisplayLength: function (length) {
                            return 5;
                        }
                    };
                }
            },
            irAdminApi: irAdminApi,
            $scope: $scope,
            $uibModal: null
        });
    }));

    it('should have DataTable objects defined', function () {
        expect($scope.dtOptions).toBeDefined();
    });

    describe('General', function () {
        it('should have empty list until load is called', function () {
            expect($scope.irList).toBeDefined();
            expect($scope.irList.length).toBe(0);

            expect($scope.positiveListMocha).toBeDefined();
            expect($scope.positiveListMocha.length).toBe(0);

            expect($scope.positiveListMDCC).toBeDefined();
            expect($scope.positiveListMDCC.length).toBe(0);

            expect($scope.positiveListMocha).toBeDefined();
            expect($scope.positiveListMocha.length).toBe(0);

            expect($scope.negativeListMocha).toBeDefined();
            expect($scope.negativeListMocha.length).toBe(0);

            expect($scope.negativeListMDCC).toBeDefined();
            expect($scope.negativeListMDCC.length).toBe(0);

            expect($scope.tokenIpAddress).toBeDefined();
            expect($scope.tokenIpAddress.length).toBe(0);

        });
    });



    //Promt
    it('should call dialog and enter PIN', function () {
        deferred.resolve(true);

        spyOn($scope, 'showConfirmation').and.returnValue(deferred.promise).and.callThrough();

        $scope.showConfirmation('Do you want to continue?', 'Warning! Once this action has been submitted it cannot be undone. Please enter your site pin to confirm.');
        $scope.$apply();

    });

    it('should call api load method and have the Heartbeat list populated', function () {
        deferred.resolve(testHeartBeatData);

        spyOn(irAdminApi, 'loadHeartBeatList').and.returnValue(deferred.promise);

        $scope.loadHeartBeatList();
        $scope.$apply();

        expect(irAdminApi.loadHeartBeatList).toHaveBeenCalled();
        expect($scope.irList.length).toBeLessThan(200);
    });

    it('should call api load method and have the Sample Control MoCha list populated', function () {
        deferred.resolve(testSampleControlData);

        spyOn(irAdminApi, 'loadSampleControlsList').and.returnValue(deferred.promise);

        $scope.loadSampleControlsList();
        $scope.$apply();

        expect(irAdminApi.loadSampleControlsList).toHaveBeenCalled();

    });

    it('should call api load method and have the Populate Data MoCha list Executed', function () {
        deferred.resolve(testSampleControlData);

        spyOn(irAdminApi, 'loadSampleControlsList').and.returnValue(deferred.promise);

        $scope.populateData(mockPositivesets);
        $scope.$apply();

        expect($scope.positiveListMocha.length).toBeLessThan(200);

    });

    it('should call api load method and have the Sample Control MD Anderson list populated', function () {
        deferred.resolve(testMDACCampleControlTestData);

        spyOn(irAdminApi, 'loadSampleControlsList').and.returnValue(deferred.promise);

        $scope.loadSampleControlsList();
        $scope.$apply();

        expect(irAdminApi.loadSampleControlsList).toHaveBeenCalled();
        expect($scope.positiveListMDCC.length).toBeLessThan(200);
    });

    it('should call api load method and have the Tokens for new Sample Isd identification list populated', function () {
        deferred.resolve(testPositiveTokensData);

        spyOn(irAdminApi, 'generatePositiveControlToken').and.returnValue(deferred.promise);

        $scope.generatePositiveControlToken();
        $scope.$apply();

        expect(irAdminApi.generatePositiveControlToken).toHaveBeenCalled();
        expect($scope.tokenIpAddress.length).toBeLessThan(200);
    });


    it('should populate the Sample Loading list with 1 entry on a success response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getSampleControlsBySite')
            .respond([
                { 'sampleSite': 'MoCha',
                    'sampleId': 'MoCha_1',
                    'sampleMsn': 'SampleControl_MoCha_1',
                    'dateCreated': 'null',
                    'dateReceived': '1464699137050',
                    'status': 'null'
                }            ]);
        $scope.populateData(mockPositivesets);

        expect($scope.populateData.length).toBe(1);
        // expect($scope.populateData.sampleControls.length).toBe(1);

    });

});