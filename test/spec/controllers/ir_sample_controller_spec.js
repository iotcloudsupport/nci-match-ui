xdescribe('Controller: Ir Sample Controller', function () {

    'use strict'

    function getVariantReportData() {

        var data = [
            {
                variantType: 'SNV',
                geneName: 'PIK3CA',
                chromosome: 'chr3',
                position: '178916946',
                identifier: 'COSM12580',
                reference: 'G',
                alternative: 'C',
                protein: 'p.Lys111Asn',
                dna: 'c.333G>C',
                purpose: '',
                function:''
            },
            {
                variantType: 'SNV',
                geneName: 'PIK33',
                chromosome: 'chr5',
                position: '178916946',
                identifier: 'CO212580',
                reference: 'G',
                alternative: 'C',
                protein: 'p.Ly4411Asn',
                dna: 'c.333G>C',
                purpose: '',
                function:''
            },
            {
                variantType: 'SNV',
                geneName: 'P4A',
                chromosome: 'chr7',
                position: '178223946',
                identifier: 'CO6612580',
                reference: 'G',
                alternative: 'C',
                protein: 'p.Ly8911Asn',
                dna: 'c.333D>C',
                purpose: '',
                function:''
            }
        ];

        return data;
    }


    function getNegativeVariantsTestData() {

        var data = [
            {
                publicMedIds: 'SNV',
                position: 'PIK3CA',
                geneName: 'chr3',
                variantType:'Indel',
                reference: 'G',
                alternative: 'C',
                hgvs: 'hgvs',
                protein: 'Lys111Asn',
                function: ''
            },
            {
                publicMedIds: 'SNV',
                position: 'PRR3CA',
                geneName: 'chr2',
                variantType:'Indel',
                reference: 'C',
                alternative: 'T',
                hgvs: 'hgvs',
                protein: 'Lys881Asn',
                function: ''
            },
            {
                publicMedIds: 'SNV',
                position: 'PCA',
                geneName: 'chr13',
                variantType:'Indel',
                reference: '9X',
                alternative: 'T',
                hgvs: 'hgvs',
                protein: 'Lio558sn',
                function: ''
            }
        ];

        return data;
    }


    beforeEach(module('config.matchbox', 'http.matchbox', 'matchbox.irsample'));

    var $scope;
    var irSampleVariantApi;
    var reportsCtrl;
    var httpBackend;
    var $stateParams;
    var $q;
    var deferred;
    var testVariantReportData  = getVariantReportData();
    var testNegativeVariantsData  = getNegativeVariantsTestData();
    var $log;
    var prompt;

    beforeEach(inject(function (_$rootScope_, $controller, $httpBackend, _$stateParams_, _irSampleVariantApi_, _$log_, _$q_, _$http_) {  //$scope, $http, $window, $stateParams, irSampleVariantApi, DTOptionsBuilder
        deferred = _$q_.defer();
        $stateParams = _$stateParams_;
        $log = _$log_;
        $q = _$q_;
        irSampleVariantApi = _irSampleVariantApi_;
        $scope = _$rootScope_.$new();

        reportsCtrl = $controller('SampleController', {
            $scope: $scope,
            $stateParams: {sampleId: 'SampleControl_MoCha_10'},
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
            irSampleVariantApi: _irSampleVariantApi_,
            $log: $log

        });
    }));

    it('should have DataTable objects defined', function () {
        expect($scope.dtOptions).toBeDefined();
    });

    describe('General', function () {
        it('should have empty list until load is called', function () {
            expect($scope.positiveControlList).toBeDefined();
            expect($scope.positiveControlList.length).toBe(0);

            expect($scope.negativeVariantsList).toBeDefined();
            expect($scope.negativeVariantsList.length).toBe(0);

        });
    });

    describe('General', function () {
        it('should have empty list until load is called', function () {
            expect($scope.positiveControlList).toBeDefined();
            expect($scope.positiveControlList.length).toBe(0);
        });
    });


    it('should call api load method and have the Variant Positive Controls list populated', function () {
        deferred.resolve(testVariantReportData);

        spyOn(irSampleVariantApi, 'loadVariantReportList').and.returnValue(deferred.promise);

        $scope.loadVariantReportList();
        $scope.$apply();

        expect(irSampleVariantApi.loadVariantReportList).toHaveBeenCalled();
        expect($scope.positiveControlList.length).toBeLessThan(200);
    });

    it('should call api load method and have the Variant Positive Controls list populated', function () {
        deferred.resolve(testNegativeVariantsData);

        spyOn(irSampleVariantApi, 'loadVariantReportList').and.returnValue(deferred.promise);

        $scope.loadVariantReportList();
        $scope.$apply();

        expect(irSampleVariantApi.loadVariantReportList).toHaveBeenCalled();
        expect($scope.negativeVariantsList.length).toBeLessThan(200);
    });

});