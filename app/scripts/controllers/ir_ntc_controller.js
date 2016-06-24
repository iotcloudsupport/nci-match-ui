angular.module('irntc.matchbox',['ui.router'])
    .controller('NtcController', function( $scope, $http, $window, $stateParams, DTOptionsBuilder, irNtcQualityApi) {

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
        $scope.barData = {};
        $scope.armNames = [];
        $scope.armValues = [];

        $scope.branch = $stateParams.branch;

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

        var posts = undefined;
        $scope.loadNtcUnfilteredReportList = function () {
            irNtcQualityApi
                .loadNtcUnfilteredReportList()
                .then(function (d) {
                    posts = d.data;


                    // $scope.armValues.push(posts.position);

                    $scope.singleNucleotideVariantsList = posts.singleNucleotideVariants;
                    $scope.indelsList = posts.indels;
                    $scope.copyNumberVariantsList = posts.copyNumberVariants;
                    $scope.geneFusionsList = posts.geneFusions;

                    // alert(posts.indels[0].position)

                    $scope.armNames.push(posts.singleNucleotideVariants[0].chromosome);
                    $scope.armValues.push(posts.singleNucleotideVariants[0].position);
                    $scope.armNames.push(posts.indels[0].chromosome);
                    $scope.armValues.push(posts.indels[0].position);
                    $scope.armNames.push(posts.copyNumberVariants[0].chromosome);
                    $scope.armValues.push(posts.copyNumberVariants[0].position);
                    $scope.armNames.push(posts.geneFusions[0].chromosome);
                    $scope.armValues.push(posts.geneFusions[0].position);

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

    });
