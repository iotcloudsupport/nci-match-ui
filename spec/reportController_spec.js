/**
 * Created by hendrikssonm on 12/11/15.
 */

//HTTP Test
angular.module('reportListApp', [])
    .controller('reportListAppControllerWithoutParameters', function noParametersController($scope, $http) {
        var getReportWithoutParametersData = function getReportWithoutParametersData() {
            $http.get('http://localhost:4567/reportList', {
                params: {  }
            }).success(function(data, status, headers, config) {
                $scope.report = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.report = [];
            });
        };

        /* On Load */
        $scope.report = [{
            name: 'screenedVsWithaMoi',
            id: {
                description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.'
            },
            description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.',
            dataname: '-',
            displayname: '-'
        }];

        $scope.keyword = '';
        //Start describes
        getReportWithoutParametersData();

    })
    .controller('reportListAppController', function withParametersController($scope, $http) {
        var getReportWithParametersData = function getReportWithParametersData() {
            $http.get('http://localhost:4567/reportList', {
                params: { name: $scope.keyword }
            }).success(function(data, status, headers, config) {
                $scope.movies = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.movies = [];
            });
        };

        $scope.reportwithparams = [{
            name: 'patientEligibleArmsNoTiebreaker',
            id: {
                description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
                params: [{
                    "name": 'patientSequenceNumber',
                    "displayName": 'Patient Sequence Number'
                }]
            },
            description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
            dataname: 'patientSequenceNumber',
            displayname: 'Patient Sequence Number'
        }];

        /* On Load */
        $scope.keyword = 'screenedVsWithaMoi';

        //Start describes
        getReportWithParametersData;
    })
    .controller('reportListAppController', function requiredReportParametersController($scope, $http) {
        var getRequireParameterforReportData = function getRequireParameterforReportData() {
            $http.get('http://localhost:4567/geneList', {
                params: { selectedReport: $scope.keyword }
            }).success(function(data) {
                $scope.movies = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.movies = [];
            });
        };

        $scope.reportrequiredparameters = [{
                name : 0,
                id : 'TP53'
            },
            {
                name : 1,
                id : 'KRAS'
            },
            {
                name : 2,
                id : 'ESR1'
            },
            {
                name : 3,
                id: 'IDH1'
        }];

        /* On Load */
        $scope.keyword = "geneSummaryReport";

        //Start describes
        getRequireParameterforReportData;
    });

//param.selectedReport == "geneSummaryReport"

//Describes
describe('reportListAppController', function() {
    beforeEach(module('reportListApp'));

    var httpData = [{
        name: 'screenedVsWithaMoi',
        id: {
            description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.'
        },
        description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.',
        dataname: '-',
        displayname: '-'
    }];

    var httpParamsData = [{
        name: 'patientEligibleArmsNoTiebreaker',
        id: {
            description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
            params: [{
                "name": 'patientSequenceNumber',
                "displayName": 'Patient Sequence Number'
            }]
        },
        description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
        dataname: 'patientSequenceNumber',
        displayname: 'Patient Sequence Number'
    }];

    var httpReportParameters = [{
            name : 0,
            id : 'TP53'
        },
        {
            name : 1,
            id : 'KRAS'
        },
        {
            name : 2,
            id : 'ESR1'
        },
        {
            name : 3,
            id: 'IDH1'
    }];

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:4567/reportList').respond({
            Search: httpData
        });
    }));

    it('should load report WITHOUT parameters', function () {
        var noParametersController = $controller('reportListAppControllerWithoutParameters', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.report).toEqual(httpData);
    });

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:4567/reportList').respond({
            Search: httpParamsData
        });
    }));

    it('should load report WITH parameters', function () {
        var withParametersController = $controller('reportListAppController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.reportwithparams).toEqual(httpReportParameters);
    });

    //Load report that requires parameter/parameters
    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:4567/geneList?selectedReport=geneSummaryReport').respond({
            Search: httpParamsData
        });
    }));

    it('should load Required Parameter WITH report selection', function () {
        var withParametersController = $controller('reportListAppController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.reportrequiredparameters).toEqual(httpReportParameters);
    });

});









