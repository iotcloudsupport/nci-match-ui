angular.module('patients.matchbox',[])
    .controller('PatientsController', function( $scope, $http, matchConfig ) {

        $scope.patientList = []

        $scope.loadPatientList = function() {
            $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicPatientsData')
                .success(function (data) {
                    $scope.patientList = data;
                })
                .error(function (data, status, header, config) {
                    console.log(data + '|' + status + '|' + header + '|' + config);
                });
        }

    });