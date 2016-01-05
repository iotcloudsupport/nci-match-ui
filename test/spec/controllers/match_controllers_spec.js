


//Factory
//patientList.factory('PatientFactory', function($resource){
//    return $resource('Users/users.json');
//});

//Login
var loginList = angular.module('loginController', []);

loginList.controller('LoginCtrl', ['$scope', function($scope){

    $scope.loginList =
    [
        {
            "email":"john.doe@nih.gov",
            "email_verified":true,
            "clientID":"uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH",
            "user_id":"auth0|567ac03ddba91aaa49d67ee2",
            "picture":"https://s.gravatar.com/avatar/a895c7b7123b171a2deb9c94074f827f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png",
            "nickname":"john.doe",
            "identities":[
                {
                "user_id":"567ac03ddba91aaa49d67ee2",
                "provider":"auth0",
                "connection":"MATCH-Development",
                "isSocial":false
                }
            ],
        "updated_at":"2016-01-05T16:13:12.925Z",
        "created_at":"2015-12-23T15:39:41.121Z",
        "name":"john.doe@nih.gov",
        "global_client_id":"elcvqh3ioNbOWvJTz39BKuy4uDxAoGI0"
        }
    ];
}]);

describe('LoginApp', function() {
    describe('LoginApp loginController', function() {
        beforeEach(module('loginController'));
        describe('LoginCtrl', function() {
            it('should create Login controller array',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("LoginCtrl", {$scope: scope });
                    expect(scope.loginList.length).toBe(1);
                    expect(scope.loginList[0].email).toBe('john.doe@nih.gov');
                }));
            it('should create Login controller identities array',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("LoginCtrl", {$scope: scope });
                    expect(scope.loginList[0].identities.length).toBe(1);
                    expect(scope.loginList[0].identities[0].user_id).toBe('567ac03ddba91aaa49d67ee2');
                }));
        });
    });
});

//Patient
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


//Treatment Arm
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

//Biopsy Sequence
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
                    expect(scope.biopsyList[1].biopsies[0].biopsySequenceNumber).toBe('N-14-000005');
                    expect(scope.biopsyList[1].biopsies[0].samples.length).toBe(1);
                }));
            it('should have empty sample array ',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("BioListCtrl", {$scope: scope });
                    expect(scope.biopsyList[2].biopsies.length).toBe(1);
                    expect(scope.biopsyList[2].biopsies[0].biopsySequenceNumber).toBe('N-14-000006');
                    expect(scope.biopsyList[2].biopsies[0].samples.length).toBe(0);
                }));
        });
    });
});

//Molecular Sequence
var msnList = angular.module('msnController', []);

msnList.controller('MsnListCtrl', ['$scope', function($scope){
    $scope.msnList =
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
                "patientSequenceNumber":"232re_Random",
                "biopsies":[
                    {
                        "biopsySequenceNumber":"N-15-00005",
                        "specimenReceivedDate":1451334073120,
                        "specimenFailureDate":null,
                        "ptenOrderDate":1450902074608,
                        "ptenResultDate":1451334074691,
                        "pathologyReviewdate":1451334076171,
                        "samples":[]
                    }
                ]
            }
        ];
}]);

//Molecular Sequence
describe('msnListApp', function() {
    describe('msnListApp msnController', function() {
        beforeEach(module('msnController'));
        describe('MsnListCtrl', function() {
            it('should create "patientSequenceNumber" be 201re',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("MsnListCtrl", {$scope: scope });
                    expect(scope.msnList.length).toBe(3);
                    expect(scope.msnList[0].patientSequenceNumber).toBe('201re');
                }));
            it('should have biopsy array ',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("MsnListCtrl", {$scope: scope });
                    expect(scope.msnList[1].biopsies.length).toBe(1);
                    expect(scope.msnList[1].biopsies[0].biopsySequenceNumber).toBe('N-14-000005');
                    expect(scope.msnList[1].biopsies[0].samples.length).toBe(1);
                    expect(scope.msnList[1].biopsies[0].samples[0].molecularSequenceNumber).toBe('289_1451335943');
                }));
            it('should have empty sample array ',
                inject(function($rootScope, $controller) {
                    var scope = $rootScope.$new();
                    var ctrl = $controller("MsnListCtrl", {$scope: scope });
                    expect(scope.msnList[2].patientSequenceNumber).toBe('232re_Random');
                    expect(scope.msnList[2].biopsies.length).toBe(1);
                    expect(scope.msnList[2].biopsies[0].biopsySequenceNumber).toBe('N-15-00005');
                    expect(scope.msnList[2].biopsies[0].samples.length).toBe(0);
                    expect(scope.msnList[2].biopsies[0].samples[0]).toBe(undefined);
                }));
        });
    });
});

