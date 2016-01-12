describe('Controller: Patients Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'patients.matchbox'));

    var patientsCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _patientService_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        patientsCtrl = $controller('PatientsController', {
            $scope: scope,
            DTOptionsBuilder: {
                newOptions: function() {
                    return {
                        withDisplayLength: function(length) {
                            // This is a mock function f the DTOptionsBuilder
                        }
                    }
                }
            },
            DTColumnDefBuilder: null,
            patientService: _patientService_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the patient list object with 3 patients on a success response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicPatientsData')
            .respond([
                {patientSequenceNumber: '100'},
                {patientSequenceNumber: '101'},
                {patientSequenceNumber: '102'}
            ]);
        scope.loadPatientList();
        httpBackend.flush();

        expect(scope.patientList.length).toBe(3);
        expect(scope.patientList[0].patientSequenceNumber).toBe('100');
        expect(scope.patientList[1].patientSequenceNumber).toBe('101');
        expect(scope.patientList[2].patientSequenceNumber).toBe('102');
    });

    it('should not populate the patient list object on an error response', function() {
        httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicPatientsData').respond(500);
        scope.loadPatientList();
        httpBackend.flush();

        expect(scope.patientList.length).toBe(0);
    });
});