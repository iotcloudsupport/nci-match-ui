angular.module('patients.matchbox',[])
.controller('PatientsController', function($scope, patientService) {

    $scope.patientList = [];

    $scope.loadPatientList = function() {
        patientService
            .getBasicPatientsData()
            .then(function(d) {
                $scope.patientList = d.data;
        });
    };

});