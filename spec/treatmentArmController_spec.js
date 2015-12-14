/**
 * Created by hendrikssonm on 12/11/15.
 */

//HTTP PATIENT CONTROLLER TEST
angular.module('treatmentArmListApp', [])
    .controller('treatmentArmTableController', function treatmentArmTableController($scope, $http) {
        var gettreatmentArmTableControllerData = function gettreatmentArmTableControllerData() {
            $http.get('http://localhost:8080/match/common/rs/getBasicTreatmentArms', {
                params: {  }
            }).success(function(data, status, headers, config) {
                $scope.treatmentarms = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.treatmentarms = [];
            });
        };

        /* On Load */

        $scope.treatmentarms = [
            {
                "treatmentArmId":"EAY131-R",
                "treatmentArmName":"Trametinib B-RAF other than V600K/E",
                "currentPatients":0,
                "formerPatients":0,
                "notEnrolledPatients":0,
                "pendingPatients":0,
                "treatmentArmStatus":"OPEN",
                "dateCreated":1438968820239,
                "dateOpened":1439352000000,
                "dateClosed":null,
                "dateSuspended":null
            },
            {
                "treatmentArmId":"EAY131-A",
                "treatmentArmName":"Afatinib in EGFR activating",
                "currentPatients":1,
                "formerPatients":0,
                "notEnrolledPatients":0,
                "pendingPatients":0,
                "treatmentArmStatus":"OPEN",
                "dateCreated":1438968827096,
                "dateOpened":1439352000000,
                "dateClosed":null,
                "dateSuspended":null
            }
            ];

        $scope.keyword = '';
        //Start describes
        gettreatmentArmTableControllerData();

    });

//Describes
describe('treatmentArmTableController', function() {
    beforeEach(module('treatmentArmListApp'));

    var httpData = [{
        "treatmentArmId":"EAY131-R",
        "treatmentArmName":"Trametinib B-RAF other than V600K/E",
        "currentPatients":0,
        "formerPatients":0,
        "notEnrolledPatients":0,
        "pendingPatients":0,
        "treatmentArmStatus":"OPEN",
        "dateCreated":1438968820239,
        "dateOpened":1439352000000,
        "dateClosed":null,
        "dateSuspended":null
        },
        {
            "treatmentArmId":"EAY131-A",
            "treatmentArmName":"Afatinib in EGFR activating",
            "currentPatients":1,
            "formerPatients":0,
            "notEnrolledPatients":0,
            "pendingPatients":0,
            "treatmentArmStatus":"OPEN",
            "dateCreated":1438968827096,
            "dateOpened":1439352000000,
            "dateClosed":null,
            "dateSuspended":null
        }];

    //*** STAR CONDITION TESTS ***//
    //Load
    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:8080/match/common/rs/getBasicTreatmentArms').respond({
            Search: httpData
        });
    }));
    //Load report without parameters
    it('should load PATIENT report', function () {
        var testtreatmentArmTableController = $controller('treatmentArmTableController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.treatmentarms).toEqual(httpData);
    });




});









