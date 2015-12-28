//angular.module('treatment-arms.matchbox',[])
//    .controller('TreatmentArmsController', function( $scope, $http, matchConfig ) {
//
//        $scope.treatmentArmList = []
//
//        $scope.loadTreatmentArmList = function() {
//            $http.get(matchConfig.matchApiBaseUrl + '/common/rs/getBasicTreatmentArms')
//                .success(function (data) {
//                    $scope.treatmentArmList = data;
//                })
//                .error(function (data, status, header, config) {
//                    console.log(data + '|' + status + '|' + header + '|' + config);
//                });
//        }
//
//    });

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