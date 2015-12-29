angular.module('treatment-arms.matchbox',[])
    .controller('TreatmentArmsController', function($scope, treatmentArmService) {

        $scope.treatmentArmList = [];

        $scope.loadTreatmentArmList = function() {
            treatmentArmService
                .getBasicTreatmentArms()
                .then(function(d) {
                    $scope.treatmentArmList = d.data;
                });
        };

    });