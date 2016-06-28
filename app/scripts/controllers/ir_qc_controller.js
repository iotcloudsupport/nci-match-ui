angular.module('qcsample.matchbox',[])
    .controller('QcSampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, svgApi) {
        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(50);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.sampleId=$stateParams.sampleId;
        $scope.samplesList = [];
        $scope.singleNucleotideVariants = [];
        $scope.indels = [];
        $scope.copyNumberVariants = [];
        $scope.geneFusions = [];
        $scope.branch = "";

        if($scope.sampleId.indexOf('MoCha') >= 0) {
            $scope.branch = 'mocha';
        }
        else{
            $scope.branch = 'mdacc';
        }


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
        $scope.loadSvgGeneMockList = function () {
                    $window.d3BoxVersion5Mock();
        };
        //Svg for ntc
        $scope.loadSvgNtcList = function () {
            svgApi
                .getSvgNtc()
                .then(function (d) {
                    $window.d3BoxVersion5(d.data);
                    // $window.d3BoxVersion5Mock();
                });
        };

        //Svg for ntc  MOCK
        $scope.loadSvgNtcMockList = function () {
            // svgApi
            //     .getSvgNtc()
            //     .then(function (d) {
                    // $window.d3BoxVersion5(d.data);
                    $window.d3BoxVersion5Mock();
                // });
        };


        $scope.loadPieChart = function(site) {

            aMoiLabels = ['ELRP1'
                ,'v5TBP'
                ,'v5MYC'
                ,'v5HMBS'
                ,'v5ITGB7'];

            if(site==='mocha') {
                aMoiValues = [4, 35, 45, 9]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
            }
            else{
                aMoiValues = [1, 45, 15, 1];
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
                }
            ];
        }

        $scope.loadSampleBreakups = function() {

            // var ctx = document.getElementById("irSampleCanvas").getContext("2d");
            // ctx.canvas.width = 300;
            // ctx.canvas.height = 300;

            var prepareData = {
                series: [5, 3, 4]
            }

            this.pieData = prepareData;

            pieNames = [
                'ELRP1'
                ,'v5TBP'
                ,'v5MYC'
                ,'v5HMBS'
                ,'v5ITGB7'
            ];

            $scope.flotPieData = {
                labels: pieNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "#1c84c6",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: prepareData
                    }
                ]
            };


            // <td id="LRP1" width="15%">8668</td>
            // <td id="v5TBP" width="15%">708413</td>
            //     <td id="v5MYC" width="15%">75577</td>
            //     <td id="v5HMBS" width="15%">164227</td>
            //     <td id="v5ITGB7" width="15%">1028</td>
            //     <td id="v5sum" width="15%">957913</td>

            armNames = [
                'ELRP1'
                ,'v5TBP'
                ,'v5MYC'
                ,'v5HMBS'
                ,'v5ITGB7'
            ];
            armValues = [8668, 708413, 75577, 164227, 1028];

            $scope.barData = {
                labels: armNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "#1c84c6",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: armValues
                    }
                ]
            };


            // alert(JSON.stringify($scope.barData))

        };

    });
