describe('Controller: Patient Details Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'patient.matchbox'));

    var patientsCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _matchApi_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        patientsCtrl = $controller('PatientController', {
            $scope: scope,
            DTOptionsBuilder: {
                newOptions: function() {
                    return {
                        withDisplayLength: function(length) {
                            // This is a mock function of the DTOptionsBuilder
                        }
                    };
                }
            },
            DTColumnDefBuilder: null,
            matchApi: _matchApi_
        });
    }));

    //afterEach(function () {
    //    httpBackend.verifyNoOutstandingExpectation();
    //    httpBackend.verifyNoOutstandingRequest();
    //});
    //
    //it('should populate the patient list with 3 patients on a success response', function() {
    //    httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicPatientsData')
    //        .respond([
    //            {patientSequenceNumber: '100'},
    //            {patientSequenceNumber: '101'},
    //            {patientSequenceNumber: '102'}
    //        ]);
    //    scope.loadPatientDetailsList();
    //    httpBackend.flush();
    //
    //    expect(scope.patientList.length).toBe(3);
    //    expect(scope.patientList[0].patientSequenceNumber).toBe('100');
    //    expect(scope.patientList[1].patientSequenceNumber).toBe('101');
    //    expect(scope.patientList[2].patientSequenceNumber).toBe('102');
    //});
    //
    //it('should not populate the patient list on an error response', function() {
    //    httpBackend.when('GET', 'http://server:80/match/common/rs/getBasicPatientsData').respond(500);
    //    scope.loadPatientTableList();
    //    httpBackend.flush();
    //
    //    expect(scope.patientList.length).toBe(0);
    //});

});