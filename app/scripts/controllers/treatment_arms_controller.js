angular.module('treatment-arms.matchbox',[])
    .controller('TreatmentArmsController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, treatmentArmApi ) {

        this.dtOptions = {
            'info': false,
            'paging': false
        };
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.treatmentArmList = [];

        $scope.displayTreatmentArmList = function() {
            treatmentArmApi
                .getTreatmentArms()
                .then(function(d) {
                    $scope.treatmentArmList = d.data;
                    console.log(d);
                    console.log(d.data);
                });
        };
    });