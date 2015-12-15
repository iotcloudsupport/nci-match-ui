/**
 * Created by hendrikssonm on 12/11/15.
 */

//HTTP PATIENT CONTROLLER TEST
angular.module('reportLoaderListApp', [])
    .controller('reportLoaderTableController', function reportLoaderTableController($scope, $http) {
        var getreportLoaderTableControllerData = function getreportLoaderTableControllerData() {
            $http.get('http://localhost:4567/reportList', {
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
        $httpBackend.whenGET('http://localhost:4567/reportList').respond({
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









