
var patientList = angular.module('patientController', []);

patientList.controller('PatientListCtrl', ['$scope', function($scope){
    $scope.patientList =
        [
            {"patientSequenceNumber":"201re",
            "currentStatus":"REGISTRATION",
            "currentStepNumber":"0",
            "diseases":"",
            "currentTreatmentArm":null,
            "registrationDate":1451334263613,
            "offTrialDate":null},
            {"patientSequenceNumber":"202re",
            "currentStatus":"REGISTRATION",
            "currentStepNumber":"0",
            "diseases":"",
            "currentTreatmentArm":null,
            "registrationDate":1451334263613,
            "offTrialDate":null
            }
        ];
}]);

describe('phonesApp', function() {
    describe('phoneApp patientController', function() {
        beforeEach(module('patientController'));
        describe('PatientListCtrl', function() {
            it('should create "patientSequenceNumber" be 202re',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("PatientListCtrl", {$scope: scope });
                    expect(scope.patientList.length).toBe(2);
                    expect(scope.patientList[1].patientSequenceNumber).toBe('202re');
                }));
        });
    });
});


var taList = angular.module('taController', []);

taList.controller('TaListCtrl', ['$scope', function($scope){
    $scope.patientList =
        [
            {"treatmentArmId":"CukeTest-770-3",
                "treatmentArmName":"CukeTest770-3",
                "currentPatients":0,
                "formerPatients":0,
                "notEnrolledPatients":0,
                "pendingPatients":0,
                "treatmentArmStatus":"PENDING",
                "dateCreated":1451333928407,
                "dateOpened":null,"dateClosed":null,
                "dateSuspended":null},
            {"treatmentArmId":"CukeTest-770-4",
                "treatmentArmName":"CukeTest770-4",
                "currentPatients":0,
                "formerPatients":0,
                "notEnrolledPatients":0,
                "pendingPatients":0,
                "treatmentArmStatus":"PENDING",
                "dateCreated":1451333928407,
                "dateOpened":null,"dateClosed":null,
                "dateSuspended":null},
        ];
}]);

describe('phonesApp', function() {
    describe('phoneApp taController', function() {
        beforeEach(module('taController'));
        describe('TaListCtrl', function() {
            it('should create "treatmentArmName" be CukeTest770-4',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("TaListCtrl", {$scope: scope });
                    expect(scope.patientList.length).toBe(2);
                    expect(scope.patientList[1].treatmentArmName).toBe('CukeTest770-4');
                }));
        });
    });
});

