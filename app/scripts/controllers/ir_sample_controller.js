angular.module('irsample.matchbox',[])
    .controller('SampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi, svgApi) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.samplesList = [];

        $scope.loadSamplesList = function () {
            $scope.sampleId = $stateParams.sampleId;
            // matchApiMock
            //     .getPatientListData()
            //     .then(function (d) {
            //         $scope.patientList = d;
            //     });
        };
    });
