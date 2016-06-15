angular.module('irsample.matchbox',['ui.router'])
    .controller('SampleController', function( $scope, $http, $window, $stateParams, DTOptionsBuilder, irSampleVariantApi, prompt) {

        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        function showPrompt(options) {
            return prompt(options);
        }

        $scope.positiveControlList = [];
        $scope.negativeVariantsList = [];

        $scope.loadSamplesList = function () {
            $scope.sampleId = $stateParams.sampleId;
        };

        $scope.showConfirmation = function () {
                showPrompt({
                    title: title,
                    message: message,
                    input: true,
                    buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
                }).then(function (comment) {
                    $log.debug('User entered comment: ' + comment);
                });
            };

        $scope.loadVariantReportList = function () {
            irSampleVariantApi
                .loadVariantReportList()
                .then(function (d) {
                    angular.forEach(d, function (value,key) {

                        //Positive Controls
                        angular.forEach(value.positiveControls, function (v,k) {
                            var hasMatchingVariant = v.hasMatchingVariant;
                            var pc = v.positiveControl;

                            $scope.positiveControlList.push({

                                'variantType':pc.variantType,
                                'geneName':pc.geneName,
                                'chromosome':pc.chromosome,
                                'position':pc.position,
                                'identifier':pc.identifier,
                                'reference':pc.reference,
                                'alternative':pc.alternative,
                                'protein':pc.protein,
                                'hgvs':pc.dna,
                                'purpose':pc.purpose,
                                'function':pc.function,
                                'hasMatchingVariant': hasMatchingVariant.toString()
                            });
                        });
                        //Negative Variants
                        angular.forEach(value.negativeVariants, function (v,k) {
                            $scope.negativeVariantsList.push({
                                'publicMedIds': v.publicMedIds,
                                'position': v.position,
                                'geneName': v.geneName,
                                'variantType':'Indel',
                                'reference': v.reference,
                                'alternative': v.alternative,
                                'hgvs': v.hgvs,
                                'protein': v.protein,
                                'function': v.function
                            });
                        });
                    });
                });
            };


        //Svg for samples
        $scope.loadScatterPlot = function () {

            // svgApi
            //     .getSvgGene('SampleControl_MoCha_2')
            //     .then(function (d) {
            //
            //         alert(JSON.stringify($scope.positiveControlList))

            $window.samplePlot($scope.positiveControlList);
            $window.circosPlot();
            $window.piePlot();
            // $window.d3BoxVersion5(d.data);

        };

    });
