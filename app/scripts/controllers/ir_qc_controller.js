angular.module('qcsample.matchbox',[])
    .controller('QcSampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi, svgApi) {
        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.samplesList = [];

        $scope.loadSvgGeneList = function (id) {
            svgApi
                .getSvgGene($stateParams.sampleId)
                .then(function (d) {
                    $window.d3BoxVersion5(d.data);
                });
        };
    });
