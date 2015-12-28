//angular.module('patients.matchbox',[])
//    .controller('PatientsController', function( $scope, $http, matchConfig ) {
//
//        $scope.patientList = []
//
//        $scope.loadPatientList = function() {
//            $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData')
//                .success(function (data) {
//                    $scope.patientList = data;
//                })
//                .error(function (data, status, header, config) {
//                    console.log(data + '|' + status + '|' + header + '|' + config);
//                });
//        };
//    });

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