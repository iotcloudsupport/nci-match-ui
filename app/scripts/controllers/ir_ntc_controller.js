angular.module('irntc.matchbox',['ui.router'])
    .controller('NtcController', function( $scope, $http, $stateParams, DTOptionsBuilder, irNtcQualityApi) {

        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.singleNucleotideVariantsList = [];
        $scope.indelsList = [];
        $scope.copyNumberVariantsList = [];
        $scope.geneFusionsList = [];

        var posts = undefined;
        $scope.loadNtcUnfilteredReportList = function () {
            irNtcQualityApi
                .loadNtcUnfilteredReportList()
                .then(function (d) {
                    posts = d.data;

                    $scope.singleNucleotideVariantsList = posts.singleNucleotideVariants;
                    $scope.indelsList = posts.indels;
                    $scope.copyNumberVariantsList = posts.copyNumberVariants;
                    $scope.geneFusionsList = posts.geneFusions;

                });
            };
    });
