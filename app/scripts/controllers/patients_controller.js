angular.module('patients.matchbox',[])
    .controller('PatientsController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi ) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.patientList = [];

        $scope.loadPatientList = function() {
            matchApi
                .getBasicPatientsData()
                .then(function(d) {
                    $scope.patientList = d.data;
            });
        };

    });