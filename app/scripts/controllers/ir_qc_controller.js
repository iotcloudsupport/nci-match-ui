angular.module('qcsample.matchbox',[])
    .controller('QcSampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, svgApi) {
        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(50);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.samplesList = [];

        $scope.singleNucleotideVariants = [];
        $scope.indels = [];
        $scope.copyNumberVariants = [];
        $scope.geneFusions = [];

        // $scope.openCosmicGene = function (id) {
        //
        //     $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");
        //
        // };
        //
        // $scope.openCosmicId = function (id) {
        //
        //     $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");
        //
        // };
        //
        // $scope.openCosmicFusionId = function (id) {
        //
        //     $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");
        //
        // };


        $scope.openCosmicGene = function (id) {
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();

        };

        $scope.openCosmicId = function (id) {
            id = id.substring(4, id.length)
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();

        };

        $scope.openCosmicFusionId = function (id) {

            // $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();

        };

        //Svg for samples
        $scope.loadSvgGeneList = function () {
            svgApi
                .getSvgGene($stateParams.sampleId)
                .then(function (d) {
                    $window.d3BoxVersion5(d.data);
                });
        };
        //Svg for ntc
        $scope.loadSvgNtcList = function () {
            svgApi
                .getSvgNtc()
                .then(function (d) {
                    $window.d3BoxVersion5(d.data);
                });
        };
    });
