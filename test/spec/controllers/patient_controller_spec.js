describe('Controller: Patient Details Controller', function () {
    'use strict'
    
    beforeEach(module('config.matchbox', 'http.matchbox', 'patient.matchbox'));

    var patientsCtrl,
        httpBackend,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _matchApi_, $stateParams, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        //_$routeParams_.patientSequenceNumber = "100065";
        patientsCtrl = $controller('PatientController', {
            $scope: scope,
            //$routeParams: {patientSequenceNumber: 'patientSequenceNumber'},
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
    
    describe('Header', function(){
        xit ('should have correct Patient Sequence Number', function(){
            expect(scope.patientSequenceNumber).toBe('100065');
        });
    });
    
    describe('Summary Tab', function(){
        
    });
    
    describe('Biopsy Tab', function(){
        
    });
    
    describe('Assignment Report Tab', function(){
        
    });
    
    describe('Documents Tab', function(){
        
    });

    //afterEach(function () {
    //    httpBackend.verifyNoOutstandingExpectation();
    //    httpBackend.verifyNoOutstandingRequest();
    //});
    //
    //it('should populate the patient list with 3 patients on a success response', function() {
    //    httpBackend.when('GET', 'http://server:80//common/rs/getPatientDetails?patientSequenceNumber=10065')
    //        .respond([
    //            {patientStatus: 'ON_TREATMENT_ARM'},
    //            {currentTreatmentArmId: 'EAY131-B'},
    //            {comments: 'ABCD'}
    //        ]);
    //    scope.loadPatientDetailsList();
    //    httpBackend.flush();
    //
    //    expect(scope.patientDetailsList.length).toBe(3);
    //    expect(scope.patientDetailsList[0].patientStatus).toBe('ON_TREATMENT_ARM');
    //    expect(scope.patientDetailsList[1].currentTreatmentArmId).toBe('EAY131-B');
    //    expect(scope.patientDetailsList[2].comments).toBe('ABCD');
    //});
    //
    //it('should not populate the patient list on an error response', function() {
    //    httpBackend.when('GET', 'http://server:80//common/rs/getPatientDetails?patientSequenceNumber=10065').respond(500);
    //    scope.loadPatientDetailsList();
    //    httpBackend.flush();
    //
    //    expect(scope.patientDetailsList.length).toBe(0);
    //});

});