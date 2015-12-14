/**
 * Created by hendrikssonm on 12/11/15.
 */

//HTTP PATIENT CONTROLLER TEST
angular.module('molecularSequenceListApp', [])
    .controller('molecularSequenceTableController', function molecularSequenceTableController($scope, $http) {
        var getmolecularSequenceTableControllerData = function getmolecularSequenceTableControllerData() {
            $http.get('http://localhost:4567/patientSpecimenTrackingSummary', {
                params: {  }
            }).success(function(data, status, headers, config) {
                $scope.molecularSequences = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.molecularSequences = [];
            });
        };

        /* On Load */

        $scope.molecularSequences = [
            {
                "molecularSequenceId":"EAY131-R",
                "molecularSequenceName":"Trametinib B-RAF other than V600K/E",
                "currentPatients":0,
                "formerPatients":0,
                "notEnrolledPatients":0,
                "pendingPatients":0,
                "molecularSequenceStatus":"OPEN",
                "dateCreated":1438968820239,
                "dateOpened":1439352000000,
                "dateClosed":null,
                "dateSuspended":null
            },
            {
                "molecularSequenceId":"EAY131-A",
                "molecularSequenceName":"Afatinib in EGFR activating",
                "currentPatients":1,
                "formerPatients":0,
                "notEnrolledPatients":0,
                "pendingPatients":0,
                "molecularSequenceStatus":"OPEN",
                "dateCreated":1438968827096,
                "dateOpened":1439352000000,
                "dateClosed":null,
                "dateSuspended":null
            }
            ];

        $scope.keyword = '';
        //Start describes
        getmolecularSequenceTableControllerData();

    });

//Describes
describe('molecularSequenceTableController', function() {
    beforeEach(module('molecularSequenceListApp'));

    var httpData = [{
        "molecularSequenceId":"EAY131-R",
        "molecularSequenceName":"Trametinib B-RAF other than V600K/E",
        "currentPatients":0,
        "formerPatients":0,
        "notEnrolledPatients":0,
        "pendingPatients":0,
        "molecularSequenceStatus":"OPEN",
        "dateCreated":1438968820239,
        "dateOpened":1439352000000,
        "dateClosed":null,
        "dateSuspended":null
        },
        {
            "molecularSequenceId":"EAY131-A",
            "molecularSequenceName":"Afatinib in EGFR activating",
            "currentPatients":1,
            "formerPatients":0,
            "notEnrolledPatients":0,
            "pendingPatients":0,
            "molecularSequenceStatus":"OPEN",
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
        $httpBackend.whenGET('http://localhost:4567/patientSpecimenTrackingSummary').respond({
            Search: httpData
        });
    }));
    //Load report without parameters
    it('should load PATIENT report', function () {
        var testmolecularSequenceTableController = $controller('molecularSequenceTableController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.molecularSequences).toEqual(httpData);
    });




});









