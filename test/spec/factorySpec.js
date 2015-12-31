function servicePatientCtrl($scope, httplink) {
    $scope.palink = httplink;
}
function serviceTaCtrl($scope, treatmentArmFactory) {
    $scope.talink = treatmentArmFactory;
}
function serviceBiopsyCtrl($scope, biopsySequenceFactory) {
    $scope.biopsylink = biopsySequenceFactory;
}
function serviceMsnCtrl($scope, molecularSequenceFactory) {
    $scope.msnlink = molecularSequenceFactory;
}

//angular.module('config.matchbox.Factory', ['ngResource'])
//    .factory('apilink', function() {
//        return "/common/rs/getBasicPatientsData";
//    });
angular.module('patientFactory', ['ngResource'])
    .factory('httplink', function() {
        return "/common/rs/getBasicPatientsData";
    });
angular.module('treatmentArmFactory', ['ngResource'])
    .factory('treatmentArmFactory', function() {
        return "/common/rs/getBasicTreatmentArms";
    });
angular.module('biopsySequenceFactory', ['ngResource'])
    .factory('biopsySequenceFactory', function() {
        return "/common/rs/patientSpecimenTrackingSummary";
    });
angular.module('molecularSequenceFactory', ['ngResource'])
    .factory('molecularSequenceFactory', function() {
        return "/common/rs/patientSpecimenTrackingSummary";
    });

describe('Patient http factory ', function() {
    beforeEach(module('patientFactory'));
    it('should be Patient factory service',
        inject(function($rootScope, $controller) {
        var scope = $rootScope.$new();
        var ctrl = $controller(servicePatientCtrl, {$scope: scope});
        expect(scope.palink).toEqual("/common/rs/getBasicPatientsData");
    }));
});

describe('Treatment Arm http factory ', function() {
    beforeEach(module('treatmentArmFactory'));
    it('should be Ta factory service',
        inject(function($rootScope, $controller) {
        var scope = $rootScope.$new();
        var ctrl = $controller(serviceTaCtrl, {$scope: scope});
        expect(scope.talink).toEqual("/common/rs/getBasicTreatmentArms");
    }));
});

describe('Biopsy sequence http factory ', function() {
    beforeEach(module('biopsySequenceFactory'));
    it('should be biopsy sequence factory service',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller(serviceBiopsyCtrl, {$scope: scope});
            expect(scope.biopsylink).toEqual("/common/rs/patientSpecimenTrackingSummary");
        }));
});

describe('Molecular sequence http factory ', function() {
    beforeEach(module('molecularSequenceFactory'));
    it('should be biopsy sequence factory service',
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller(serviceMsnCtrl, {$scope: scope});
            expect(scope.msnlink).toEqual("/common/rs/patientSpecimenTrackingSummary");
        }));
});
