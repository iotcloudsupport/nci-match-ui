angular.module('treatment-arms.matchbox',[])
    .controller('TreatmentArmsController', function( $scope, $http, matchConfig ) {

        $scope.treatmentArmList = []

        $scope.loadTreatmentArmList = function() {
            $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicTreatmentArms')
                .success(function (data) {
                    $scope.treatmentArmList = data;
                })
                .error(function (data, status, header, config) {
                    console.log(data + '|' + status + '|' + header + '|' + config);
                });
        }

    });