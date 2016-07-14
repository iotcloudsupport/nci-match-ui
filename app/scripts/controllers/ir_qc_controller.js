angular.module('qcsample.matchbox',[ ])
    .controller('QcSampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, svgApi) {
        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        // .withDOM('<"top">t<"bottom"<"b_left"iT><"b_center"p><"b_right"l>><"clear spacer">');

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.confirmed = '';
        //FILTER
        $scope.$watch('confirmed', function(newValue, oldValue) {

            console.log($scope.confirmed);
            if(newValue === 'ALL') {
                $scope.filterCol = "";
            }
            else {
                $scope.filterCol = newValue;
            }
        });


        $scope.sampleId=$stateParams.sampleId;
        $scope.samplesList = [];
        $scope.singleNucleotideVariants = [];
        $scope.indels = [];
        $scope.copyNumberVariants = [];
        $scope.geneFusions = [];
        $scope.branch = "";
        $scope.sitename = 'undefined';

        
        if($scope.sampleId.indexOf('MoCha') >= 0) {
            $scope.branch = 'mocha';
            $scope.sitename = 'MoCha';
        }
        else{
            $scope.branch = 'mdacc';
            $scope.sitename = 'MDACC';
        }

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
            var numericId = id.substring(id.indexOf("_") - 3, (id.length - 2));

            if (numericId !== null) {
                $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + numericId.toLowerCase(), "_blank");
            }
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
            $window.d3BoxVersion5Mock();
        };


        $scope.loadPieChart = function(site) {

            aMoiLabels = ['LRP1'
                ,'TBP'
                ,'MYC'
                ,'HMBS'
                ,'ITGB7'];

            if(site==='mocha') {
                // 8668	708413	75577	164227	1028
                aMoiValues = [8668, 558413, 75577, 164227, 1028]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
            }
            else{
                aMoiValues = [5668, 358413, 15577, 234227, 5028];
            }
            aMoiHighlight = "#000088"; //"#dedede";

            $scope.pieData = [
                {
                    value: aMoiValues[0],
                    color: "DarkCyan",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[0]
                },
                {
                    value: aMoiValues[1],
                    color: "Indigo",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[1]
                },
                {
                    value: aMoiValues[2],
                    color: "SandyBrown", //"#ab0102",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[2]
                },
                {
                    value: aMoiValues[3],
                    color: "FireBrick",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[3]
                },
                {
                    value: aMoiValues[4],
                    color: "#f8ac59",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[4]
                }

            ];
        }

        $scope.loadSampleBreakups = function() {

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

        };

        $scope.data = [];
        $scope.snvList = {};
        $scope.cnvList = {};
        $scope.geneList = {};


        //the controller
        $scope.totalDisplayed = 100;

        $scope.loadMore = function () {
            $scope.totalDisplayed += 20;
        };

        function loadQcList(data) {

            // $scope.snvList = data.singleNucleotideVariants;
            $scope.cnvList = data.copyNumberVariants;
            // $scope.geneList = data.geneFusions;

        };

        $scope.filterCol = "";

        //CNV
        $scope.loadQc_Table = function () {

            var url ="data/sample_qc.json";

            $.ajax({

                type   :  "GET",
                url      :   url,
                contentType : "application/json",
                dataType      : "json",
                data            :  {},
                success: function(data){
                    loadQcList(data)
                },
                error:function(jqXHR,textStatus,errorThrown){
                    alert("Error: "+textStatus.toString());
                }
            });
        };

        //SNV
        function loadSnvList(data) {
            $scope.snvList = data.singleNucleotideVariants;
        };
        $scope.loadSnv_Table = function () {

            var url ="data/sample_qc.json";

            $.ajax({

                type   :  "GET",
                url      :   url,
                contentType : "application/json",
                dataType      : "json",
                data            :  {},
                success: function(data){
                    loadSnvList(data)
                },
                error:function(jqXHR,textStatus,errorThrown){
                    alert("Error: "+textStatus.toString());
                }
            });
        };

        //GENE
        function loadGeneList(data) {
            $scope.geneList = data.geneFusions;
        };
        $scope.loadGene_Table = function () {

            var url ="data/sample_qc.json";

            $.ajax({

                type   :  "GET",
                url      :   url,
                contentType : "application/json",
                dataType      : "json",
                data            :  {},
                success: function(data){
                    loadGeneList(data);
                },
                error:function(jqXHR,textStatus,errorThrown){
                    alert("Error: "+textStatus.toString());
                }
            });
        };


    });
