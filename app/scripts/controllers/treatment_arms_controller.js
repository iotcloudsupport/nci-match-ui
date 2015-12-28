angular.module('treatment-arms.matchbox',[])
    .controller('TreatmentArmsController', function(httpTreatmentArms,$scope) {
        $scope.treatmentArmList = [];
        $scope.clearData = function() {
            $scope.treatmentArmList = [];
        };
        $scope.loadTreatmentArmList = function() {
            // Call the async method and then do stuff with what is returned inside our own then function
            httpTreatmentArms.async()
                .then(function(d) {
                    $scope.treatmentArmList = d.data;
                    //$scope.data = d;
                });
        };
    });