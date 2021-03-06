xdescribe('Controller: Treatment Arms Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'matchbox.treatment-arms'));

    var treatmentArmsCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _treatmentArmApi_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        treatmentArmsCtrl = $controller('TreatmentArmsController', {
            $scope: scope,
            DTOptionsBuilder: {
                newOptions: function() {
                    return {
                        withDisplayLength: function(length) {
                            // This is a mock function of the DTOptionsBuilder
                        }
                    }
                }
            },
            DTColumnDefBuilder: null,
            treatmentArmApi: _treatmentArmApi_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    /*it('should populate the treatment arm list with 2 arms on a success response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/basicTreatmentArms')
            .respond([
                {treatmentArmId: 'MB-S1'},
                {treatmentArmId: 'MB-S2'}
            ]);
        scope.displayTreatmentArmList();
        httpBackend.flush();

        expect(scope.treatmentArmList.length).toBe(2);
        expect(scope.treatmentArmList[0].treatmentArmId).toBe('MB-S1');
        expect(scope.treatmentArmList[1].treatmentArmId).toBe('MB-S2');
    });*/

    /*it('should not populate the treatment arm list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/basicTreatmentArms').respond(500);
        scope.displayTreatmentArmList();
        httpBackend.flush();

        expect(scope.treatmentArmList.length).toBe(0);
    });*/

});