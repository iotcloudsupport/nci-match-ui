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

        $scope.openCosmicGene = function (id) {

            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");

        };

        $scope.openCosmicId = function (id) {

            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");

        };

        $scope.openCosmicFusionId = function (id) {

            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");

        };

        $scope.loadSvgGeneList = function (id) {
            svgApi
                .getSvgGene($stateParams.sampleId)
                .then(function (d) {
                    $window.d3BoxVersion5(d.data);
                });
        };


        // $scope.loadSampleQualityReportList = function () {
        //     irSampleQualityApi
        //         .loadSampleQualityReportList()
        //         .then(function (d) {
        //             // alert(JSON.stringify(d))
        //         });
        // };


        // $scope.loadSampleQualityUnfilteredReportList = function () {
        //     irSampleQualityApi
        //         .loadSampleQualityUnfilteredReportList()
        //         .then(function (d) {
        //             angular.forEach(d, function (value,key) {
        //
        //                 angular.forEach(value.singleNucleotideVariants, function (v,k) {
        //                 $scope.singleNucleotideVariants.push({
        //
        //                     'publicMedIds':v.publicMedIds,
        //                     'chromosome':v.chromosome,
        //                     'position':v.position,
        //                     'reference':v.reference,
        //                     'alternative':v.alternative,
        //                     'filters':v.filter,
        //                     'alleleFrequency':v.alleleFrequency,
        //                     'geneName':v.geneName,
        //                     'oncominevariantclass':v.oncominevariantclass,
        //                     'exon':v.exon,
        //                     'function':v.function,
        //                     'hgvs':v.hgvs,
        //                     'readDepth':v.readDepth,
        //                     'transcript':v.transcript,
        //                     'protein':v.protein
        //                     });
        //                 });
        //
        //
        //                 // alert(JSON.stringify(value.indels))
        //
        //                 angular.forEach(value.indels, function (v,k) {
        //                     $scope.indels.push({
        //
        //                         'publicMedIds':v.publicMedIds,
        //                         'chromosome':v.chromosome,
        //                         'position':v.position,
        //                         'reference':v.reference,
        //                         'alternative':v.alternative,
        //                         'filters':v.filter,
        //                         'alleleFrequency':v.alleleFrequency,
        //                         'geneName':v.geneName,
        //                         'oncominevariantclass':v.oncominevariantclass,
        //                         'exon':v.exon,
        //                         'function':v.function,
        //                         'hgvs':v.hgvs,
        //                         'readDepth':v.readDepth,
        //                         'transcript':v.transcript,
        //                         'protein':v.protein
        //                     });
        //                 });
        //
        //                 // alert(JSON.stringify($scope.singleNucleotideVariants))
        //             });
        //
        //         });
        // };

    });
