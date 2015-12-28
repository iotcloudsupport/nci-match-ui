angular.module('patients.matchbox',[])
.controller('PatientsController', function(httpPatients,$scope) {
    $scope.patientList = [];
    $scope.clearData = function() {
        $scope.patientList = [];
    };
    $scope.loadPatientList = function() {
        // Call the async method and then do stuff with what is returned inside our own then function
        httpPatients.async()
            .then(function(d) {
                $scope.patientList = d.data;
                //$scope.data = d;
        });
    };
});