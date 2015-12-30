var app = angular.module('match_http_Factory', []);
app.factory('patientService', function() {
    var factory = {};
    factory.beAwesome = function() {
        return 'Awesome!';
    }
    return factory;
});
app.factory('treatmentArmService', function() {
    var factory = {};
    factory.beAwesome = function() {
        return 'Awesome!';
    }
    return factory;
});

//Patient Service
describe('app: match_http_Factory patientService', function() {
    beforeEach(module('match_http_Factory'));
    var $controller;
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));
    // Factory of interest is called patientService
    describe('factory: patientService', function() {
        var factory = null;
        beforeEach(inject(function(patientService) {
            factory = patientService;
        }))
        it('Should define methods', function() {
            expect(factory.beAwesome).toBeDefined()
            expect(factory.beAwesome).toEqual(jasmine.any(Function));
        });
    });
})

//Treatment Arm Service
describe('app: match_http_Factory treatmentArmService', function() {
    beforeEach(module('match_http_Factory'));
    var $controller;
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));
    // Factory of interest is called treatmentArmService
    describe('factory: treatmentArmService', function() {
        var factory = null;
        beforeEach(inject(function(treatmentArmService) {
            factory = treatmentArmService;
        }))
        it('Should define methods', function() {
            expect(factory.beAwesome).toBeDefined()
            expect(factory.beAwesome).toEqual(jasmine.any(Function));
        });
    });
});