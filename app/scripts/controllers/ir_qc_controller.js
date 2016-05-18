angular.module('qcsample.matchbox',[])
    .controller('QcSampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi, svgApi) {
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


        $scope.loadSvgGeneList = function (id) {
            // alert($stateParams.sampleId)
            svgApi
                .getSvgGene($stateParams.sampleId)
                .then(function (d) {

                    $window.d3BoxVersion5(d.data);

                    // GeneSvg.buildGeneChartVersion5(d.data.parsedVCFGenes,mapd,cellularity,tvcVersion,screenwidth);
                });
        };

    });
