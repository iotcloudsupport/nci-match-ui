angular.module('treatment-arms.matchbox',[])
    .controller('TreatmentArmsController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi ) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.treatmentArmList = [];

        $scope.loadTreatmentArmList = function() {
            matchApi
                .getBasicTreatmentArms()
                .then(function(d) {
                    $scope.treatmentArmList = d.data;
                });
        };

    });