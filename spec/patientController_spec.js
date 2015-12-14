/**
 * Created by hendrikssonm on 12/11/15.
 */

//HTTP PATIENT CONTROLLER TEST
angular.module('patientListApp', [])
    .controller('patientTableController', function patientTableController($scope, $http) {
        var getPatientTableControllerData = function getPatientTableControllerData() {
            $http.get('http://localhost:8080/match/common/rs/getBasicPatientsData', {
                params: {  }
            }).success(function(data, status, headers, config) {
                $scope.patients = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.patients = [];
            });
        };

        /* On Load */

        $scope.patients = [{
            "patientSequenceNumber":"10001",
            "currentStatus":"REGISTRATION",
            "currentStepNumber":"0",
            "diseases":"",
            "currentTreatmentArm":null,
            "registrationDate":1439843678000,
            "offTrialDate":null
        },
        {
            "patientSequenceNumber":"10002",
            "currentStatus":"REGISTRATION",
            "currentStepNumber":"0",
            "diseases":"",
            "currentTreatmentArm":null,
            "registrationDate":1439923380000,
            "offTrialDate":null
        }];

        //$scope.report = [{
        //    name: 'screenedVsWithaMoi',
        //    id: {
        //        description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.'
        //    },
        //    description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.',
        //    dataname: '-',
        //    displayname: '-'
        //}];

        $scope.keyword = '';
        //Start describes
        getPatientTableControllerData();

    });

//Describes
describe('patientTableController', function() {
    beforeEach(module('patientListApp'));

    var httpData = [{
        "patientSequenceNumber":"10001",
        "currentStatus":"REGISTRATION",
        "currentStepNumber":"0",
        "diseases":"",
        "currentTreatmentArm":null,
        "registrationDate":1439843678000,
        "offTrialDate":null
    },
    {
        "patientSequenceNumber":"10002",
        "currentStatus":"REGISTRATION",
        "currentStepNumber":"0",
        "diseases":"",
        "currentTreatmentArm":null,
        "registrationDate":1439923380000,
        "offTrialDate":null
    }];

    //*** STAR CONDITION TESTS ***//
    //Load
    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:8080/match/common/rs/getBasicPatientsData').respond({
            Search: httpData
        });
    }));
    //Load report without parameters
    it('should load PATIENT report', function () {
        var testPatientTableController = $controller('patientTableController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.patients).toEqual(httpData);
    });




});









