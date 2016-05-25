angular.module('irsample.matchbox',['ui.router'])
    .controller('SampleController', function( $scope, $http, $stateParams, DTOptionsBuilder, irSampleVariantApi) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.positiveControlList = [];
        $scope.negativeVariantsList = [];

        $scope.loadSamplesList = function () {
            $scope.sampleId = $stateParams.sampleId;
        };

        $scope.loadVariantReportList = function () {
            irSampleVariantApi
                .loadVariantReportList()
                .then(function (d) {
                    angular.forEach(d, function (value,key) {
                        //Positive Controls
                        angular.forEach(value.positiveControls, function (v,k) {
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
                                'dna':pc.dna,
                                'purpose':pc.purpose,
                                'function':pc.function

                            });
                        });
                        //Negative Variants
                            angular.forEach(value.negativeVariants, function (v,k) {
                                // var pc = v.positiveControl;
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
    });
