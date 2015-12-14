///**
// * Created by hendrikssonm on 12/11/15.
// */
//
////HTTP Test
//angular.module('reportListApp', [])
//    .controller('reportListAppControllerWithoutParameters', function noParametersController($scope, $http) {
//        var getReportWithoutParametersData = function getReportWithoutParametersData() {
//            $http.get('http://localhost:4567/reportList', {
//                params: {  }
//            }).success(function(data, status, headers, config) {
//                $scope.report = data.Search;
//            }).error(function(data, status, headers, config) {
//                $scope.report = [];
//            });
//        };
//
//        /* On Load */
//        $scope.report = [{
//            name: 'screenedVsWithaMoi',
//            id: {
//                description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.'
//            },
//            description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.',
//            dataname: '-',
//            displayname: '-'
//        }];
//
//        $scope.keyword = '';
//        //Start describes
//        getReportWithoutParametersData();
//
//    })
//    .controller('reportListAppController', function withParametersController($scope, $http) {
//        var getReportWithParametersData = function getReportWithParametersData() {
//            $http.get('http://localhost:4567/reportList', {
//                params: { name: $scope.keyword }
//            }).success(function(data, status, headers, config) {
//                $scope.report = data.Search;
//            }).error(function(data, status, headers, config) {
//                $scope.report = [];
//            });
//        };
//
//        $scope.reportwithparams = [{
//            name: 'patientEligibleArmsNoTiebreaker',
//            id: {
//                description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
//                params: [{
//                    "name": 'patientSequenceNumber',
//                    "displayName": 'Patient Sequence Number'
//                }]
//            },
//            description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
//            dataname: 'patientSequenceNumber',
//            displayname: 'Patient Sequence Number'
//        }];
//
//        /* On Load */
//        $scope.keyword = 'screenedVsWithaMoi';
//
//        //Start describes
//        getReportWithParametersData;
//    })
//    .controller('requireParametersforReportController', function requiredReportParametersController($scope, $http) {
//        var getRequireParameterforReportData = function getRequireParameterforReportData() {
//            $http.get('http://localhost:4567/geneList', {
//                params: { selectedReport: $scope.keyword }
//            }).success(function(data) {
//                $scope.report = data.Search;
//            }).error(function(data, status, headers, config) {
//                $scope.report = [];
//            });
//        };
//
//        $scope.reportrequiredparameters = [{
//                name : 0,
//                id : 'TP53'
//            },
//            {
//                name : 1,
//                id : 'KRAS'
//            },
//            {
//                name : 2,
//                id : 'ESR1'
//            },
//            {
//                name : 3,
//                id: 'IDH1'
//        }];
//
//        /* On Load */
//        $scope.keyword = "geneSummaryReport";
//
//        //Start describes
//        getRequireParameterforReportData;
//    })
//    //.controller('generateReportController', function generateReportController($scope, $http) {
//    //    var getGenerateReportController = function getGenerateReportController() {
//    //        $http.get('http://localhost:4567/geneList', {
//    //            params: { reportParameters: $scope.keyword }
//    //        }).success(function(data) {
//    //            $scope.report = data.Search;
//    //        }).error(function(data, status, headers, config) {
//    //            $scope.report = [];
//    //        });
//    //    };
//    //
//    //    $scope.reportrequiredparameters = [{
//    //        name : 0,
//    //        id : 'TP53'
//    //    },
//    //        {
//    //            name : 1,
//    //            id : 'KRAS'
//    //        },
//    //        {
//    //            name : 2,
//    //            id : 'ESR1'
//    //        },
//    //        {
//    //            name : 3,
//    //            id: 'IDH1'
//    //        }];
//    //
//    //    /* On Load */
//    //    $scope.pname = "screenedVsWithaMoi";
//    //    $scope.pdataName;
//    //
//    //    //Start describes
//    //    getGenerateReportController;
//    //})
//;
//
////Describes
//describe('reportListAppController', function() {
//    beforeEach(module('reportListApp'));
//
//    var httpData = [{
//        name: 'screenedVsWithaMoi',
//        id: {
//            description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.'
//        },
//        description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.',
//        dataname: '-',
//        displayname: '-'
//    }];
//
//    var httpParamsData = [{
//        name: 'patientEligibleArmsNoTiebreaker',
//        id: {
//            description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
//            params: [{
//                "name": 'patientSequenceNumber',
//                "displayName": 'Patient Sequence Number'
//            }]
//        },
//        description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
//        dataname: 'patientSequenceNumber',
//        displayname: 'Patient Sequence Number'
//    }];
//
//    //var httpGeneraterParameters = ['01/01/1970',
//    //    '<a class="btn btn-success" type="button" href="http://localhost:4567/downloadReportFile?name=screenedVsWithaMoi&createdDate=1450104094&type=json">' +
//    //    '<b>JSON</b><i class="fa fa-file-code-o fa-lg"></i>screenedVsWithaMoi</a>' +
//    //    '<a class = "btn btn-warning" type = "button" href = "http://localhost:4567/downloadReportFile?name=screenedVsWithaMoi&createdDate=1450104094&type=csv" >' +
//    //    '<b>CSV</b><i class = "fa fa-file-text-o fa-lg" > </i>screenedVsWithaMoi</a>' +
//    //    '<a class = "btn btn-primary" type = "button" href = "http://localhost:4567/downloadReportFile?name=screenedVsWithaMoi&createdDate=1450104094&type=excel" >' +
//    //    '<b>EXCEL</b><i class = "fa fa-file-excel-o fa-lg" > </i>screenedVsWithaMoi</a>'
//    //    ];
//
//    var httpReportParameters = [{
//            name : 0,
//            id : 'TP53'
//        },
//        {
//            name : 1,
//            id : 'KRAS'
//        },
//        {
//            name : 2,
//            id : 'ESR1'
//        },
//        {
//            name : 3,
//            id: 'IDH1'
//    }];
//
//    //*** STAR CONDITION TESTS ***//
//    //Load
//    beforeEach(inject(function(_$controller_, _$httpBackend_) {
//        $controller = _$controller_;
//        $scope = {};
//        $httpBackend = _$httpBackend_;
//        $httpBackend.whenGET('http://localhost:4567/reportList').respond({
//            Search: httpData
//        });
//    }));
//    //Load report without parameters
//    it('should load report WITHOUT parameters', function () {
//        var noParametersController = $controller('reportListAppControllerWithoutParameters', { $scope: $scope });
//        //$httpBackend.flush();
//        expect($scope.report).toEqual(httpData);
//    });
//
//    //Load
//    beforeEach(inject(function(_$controller_, _$httpBackend_) {
//        $controller = _$controller_;
//        $scope = {};
//        $httpBackend = _$httpBackend_;
//        $httpBackend.whenGET('http://localhost:4567/reportList').respond({
//            Search: httpParamsData
//        });
//    }));
//    //Load report with parameters
//    it('should load report WITH parameters', function () {
//        var withParametersController = $controller('reportListAppController', { $scope: $scope });
//        //$httpBackend.flush();
//        expect($scope.reportwithparams).toEqual(httpParamsData);
//    });
//
//    //Load
//    beforeEach(inject(function(_$controller_, _$httpBackend_) {
//        $controller = _$controller_;
//        $scope = {};
//        $httpBackend = _$httpBackend_;
//        $httpBackend.whenGET('http://localhost:4567/geneList?selectedReport=geneSummaryReport').respond({
//            Search: httpReportParameters
//        });
//    }));
//    //Load report that requires parameter/parameters
//    it('should load Required PARAMETERS WITH report selection', function () {
//        var requiredParametersController = $controller('requireParametersforReportController', { $scope: $scope });
//        //$httpBackend.flush();
//        expect($scope.reportrequiredparameters).toEqual(httpReportParameters);
//    });
//
//    //Load
//    //beforeEach(inject(function(_$controller_, _$httpBackend_) {
//    //    $controller = _$controller_;
//    //    $scope = {};
//    //    $httpBackend = _$httpBackend_;
//    //    $httpBackend.whenGET('http://localhost:4567/generateReport?name=screenedVsWithaMoi').respond({
//    //        Search: httpGeneraterParameters
//    //    });
//    //}));
//    ////Load report that requires parameter/parameters
//    //it('should load Required PARAMETERS WITH report selection', function () {
//    //    var requiredParametersController = $controller('requireParametersforReportController', { $scope: $scope });
//    //    //$httpBackend.flush();
//    //    expect($scope.reportrequiredparameters).toEqual(httpGeneraterParameters);
//    //});
//});
//
//
//
//
//
//
//
//
//



/**
 * Created by hendrikssonm on 12/11/15.
 */

//HTTP PATIENT CONTROLLER TEST
angular.module('reportLoaderListApp', [])
    .controller('reportLoaderTableController', function reportLoaderTableController($scope, $http) {
        var getreportLoaderTableControllerData = function getreportLoaderTableControllerData() {
            $http.get('http://localhost:8080/match/common/rs/getBasicPatientsData', {
                params: {  }
            }).success(function(data) {
                $scope.reportLoaders = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.reportLoaders = [];
            });
        };

        /* On Load */
        $scope.reportLoaders = [
            {
                "name":"screenedVsEnrolled",
                "displayName":"Screened vs. Enrolled",
                "description":"This report calculates the numbers of patients enrolled with the MatchBox and those having a confirmed variant report."
            },
            {
                "name":"screenedVsWithaMoi",
                "displayName":"Screened vs. with aMOI",
                "description":"This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs."
            }
        ];

        $scope.keyword = '';
        //Start describes
        getreportLoaderTableControllerData();

    });

//Describes
describe('reportLoaderTableController', function() {
    beforeEach(module('reportLoaderListApp'));

    var httpData = [{
        "name":"screenedVsEnrolled",
        "displayName":"Screened vs. Enrolled",
        "description":"This report calculates the numbers of patients enrolled with the MatchBox and those having a confirmed variant report."
        },
        {
            "name":"screenedVsWithaMoi",
            "displayName":"Screened vs. with aMOI",
            "description":"This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs."
        }];

    //*** STAR CONDITION TESTS ***//
    //Load
    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:8080/match/common/rs/getBasicreportLoaders').respond({
            Search: httpData
        });
    }));
    //Load report without parameters
    it('should load PATIENT report', function () {
        var testreportLoaderTableController = $controller('reportLoaderTableController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.reportLoaders).toEqual(httpData);
    });




});









