
var patientList = angular.module('patientController', []);

//Factory
patientList.factory('PatientFactory', function($resource){
    return $resource('Users/users.json');
});

patientList.controller('PatientListCtrl', ['$scope', function($scope, PatientFactory){
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

describe('patientListApp', function() {
    describe('patientListApp patientController', function() {
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

describe('taListApp', function() {
    describe('taListApp taController', function() {
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


var bioList = angular.module('bioController', []);

bioList.controller('BioListCtrl', ['$scope', function($scope){
    $scope.biopsyList =
        [
            {
                "patientSequenceNumber":"201re",
                "biopsies":[
                    {
                        "biopsySequenceNumber":"N-15-00005",
                        "specimenReceivedDate":1451334265108,
                        "specimenFailureDate":null,
                        "ptenOrderDate":1450902266602,
                        "ptenResultDate":1451334266636,
                        "pathologyReviewdate":1451334268095,
                        "samples":[
                            {
                                "molecularSequenceNumber":"201_N-15-00005",
                                "lab":"Boston",
                                "dnaShippedDate":1451334269526,
                                "trackingNumber":"987654321"
                            }
                        ]
                    }
                ]
            },
            {
                "patientSequenceNumber":"289re",
                "biopsies":[
                    {
                        "biopsySequenceNumber":"N-14-000005",
                        "specimenReceivedDate":1451335943533,
                        "specimenFailureDate":null,
                        "ptenOrderDate":1450903943672,
                        "ptenResultDate":1451335943747,
                        "pathologyReviewdate":null,
                        "samples":[
                            {
                                "molecularSequenceNumber":"289_1451335943",
                                "lab":"Boston",
                                "dnaShippedDate":1451335943854,
                                "trackingNumber":"12345456789"
                            }
                        ]
                    }
                ]
            },
            {
                "patientSequenceNumber":"290re",
                "biopsies":[
                    {
                        "biopsySequenceNumber":"N-14-000006",
                        "specimenReceivedDate":1451335943533,
                        "specimenFailureDate":null,
                        "ptenOrderDate":1450903943672,
                        "ptenResultDate":1451335943747,
                        "pathologyReviewdate":null,
                        "samples":[]
                    }
                ]
            }
        ];
}]);

describe('bioListApp', function() {
    describe('bioListApp bioController', function() {
        beforeEach(module('bioController'));
        describe('BioListCtrl', function() {
            it('should create "patientSequenceNumber" be 289re',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("BioListCtrl", {$scope: scope });
                    expect(scope.biopsyList.length).toBe(3);
                    expect(scope.biopsyList[1].patientSequenceNumber).toBe('289re');
                }));
            it('should have biopsy array ',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("BioListCtrl", {$scope: scope });
                    expect(scope.biopsyList[1].biopsies.length).toBe(1);
                    expect(scope.biopsyList[1].biopsies[0].samples.length).toBe(1);
                    expect(scope.biopsyList[1].biopsies[0].biopsySequenceNumber).toBe('N-14-000005');

                }));
            it('should have empty sample array ',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("BioListCtrl", {$scope: scope });
                    expect(scope.biopsyList[2].biopsies.length).toBe(1);
                    expect(scope.biopsyList[2].biopsies[0].samples.length).toBe(0);
                    expect(scope.biopsyList[2].biopsies[0].biopsySequenceNumber).toBe('N-14-000006');

                }));
        });
    });
});

