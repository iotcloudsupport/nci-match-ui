angular.module('treatment-arms.matchbox',[])
    .controller('TreatmentArmsController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, treatmentArmApi ) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.treatmentArmList = [];

        $scope.displayTreatmentArmList = function() {
            treatmentArmApi
                .getTreatmentArms()
                .then(function(d) {
                    $scope.treatmentArmList = d.data;
                });
        };
    });