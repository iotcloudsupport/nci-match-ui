angular.module('patients.matchbox',[])
.controller('PatientsController', function($scope, DTOptionsBuilder, DTColumnDefBuilder, patientService) {

    this.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(100);
    this.dtColumnDefs = [];
    this.dtInstance = {};

    $scope.patientList = [];

    $scope.loadPatientList = function() {
        patientService
            .getBasicPatientsData()
            .then(function(d) {
                $scope.patientList = d.data;
        });
    };

});