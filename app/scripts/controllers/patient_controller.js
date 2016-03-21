angular.module('patient.matchbox',[])
    .controller('PatientController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, idService) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0)
                .withOption('type', 'html')
        ];
        this.dtInstance = {};

        $scope.patientDetailsList = [];
        $scope.patientId = [];



    });
