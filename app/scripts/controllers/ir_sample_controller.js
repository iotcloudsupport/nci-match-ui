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

        $scope.sampleId=$stateParams.sampleId;
        $scope.positiveControlList = [];
        $scope.negativeVariantsList = [];
        $scope.barData = {};
        $scope.armNames = [];
        $scope.armValues = [];


        this.barOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };

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


                            $scope.armNames.push(pc.geneName);
                            $scope.armValues.push(pc.position);

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

        $scope.loadSampleBreakups = function() {

            // var ctx = document.getElementById("irSampleCanvas").getContext("2d");
            // ctx.canvas.width = 300;
            // ctx.canvas.height = 300;

            var prepareData = {
                series: [5, 3, 4]
            }

            this.pieData = prepareData;

            pieNames = [
                'EAY131-QQQ'
                , 'EAY131-BEEE'
                , 'EAY131-HRRR'
            ];

            $scope.flotPieData = {
                labels: pieNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "#1c84c6",
                        strokeColor: "rgba(320,220,220,0.8)",
                        highlightFill: "#33c6c8", //"rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(320,220,220,1)",
                        data: prepareData
                    }
                ]
            };


            // armNames = [
            //     'EAY131-QQQ'
            //     , 'EAY131-BEEE'
            //     , 'EAY131-HRRR'
            //     , 'EAY131-U'
            //     , 'EAY131-E'
            //     , 'EAY131-D'
            //     , 'EAY131-F'
            //     , 'EAY131-G'
            //     , 'EAY131-T'
            //     , 'EAY131-Q'
            // ];
            // armValues = [6, 3, 2, 2, 1,1,2,3,1,1];



            $scope.barData = {
                labels: $scope.armNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "Indigo",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: $scope.armValues
                    }
                ]
            };


            // alert(JSON.stringify($scope.barData))

        };



        $scope.loadPieChart = function(site) {

            aMoiLabels = ['0 Sample Ng', '1 Sample Pos', '2 Patient', '3 aMOI', '4 Drug', '5+ Gene'];
            if(site==='mocha') {
                aMoiValues = [4, 35, 45, 9, 6, 21]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
            }
            else{
                aMoiValues = [1, 45, 15, 1, 8, 61];
            }
            aMoiHighlight = "#000088"; //"#dedede";

            $scope.pieData = [
                {
                    value: aMoiValues[0],
                    color: "#23c6c8",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[0]
                },
                {
                    value: aMoiValues[1],
                    color: "#1c84c6",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[1]
                },
                {
                    value: aMoiValues[2],
                    color: "#18a689", //"#ab0102",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[2]
                },
                {
                    value: aMoiValues[3],
                    color: "#f8ac59",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[3]
                },
                {
                    value: aMoiValues[4],
                    color: "#707070",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[4]
                },
                {
                    value: aMoiValues[5],
                    color: "#cfcfcf",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[5]
                }
            ];
        }

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
