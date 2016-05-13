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
                    console.log(d);
                    $scope.treatmentArmList = d.data;
                    console.log(d.data);

                    console.log($scope);
                });
                /*.then(function(d) {
                    angular.forEach(d.data, function (value) {
                    //$.each(d.data, function( key, value ) {

                        $scope.treatmentArmList .push({
                            name: 'EAY131-T'
                            /*name: value.data.treatment_arm_id,
                            current_patients: value.data.current_patients,
                            former_patients: value.data.former_patients,
                            not_enrolled_patients: value.data.not_enrolled_patients,
                            pending_patients: value.data.pending_patients,
                            treatment_arm_status: value.data.treatment_arm_status,
                            date_created: value.data.date_created,
                            date_opened: value.data.date_opened,
                            date_closed: value.date.date_closed,
                            date_suspended: value.data.date_suspended*/
                        /*});

                    });
                });*/
        };


    });