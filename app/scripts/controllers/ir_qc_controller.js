angular.module('matchbox.qcsample',['ui.bootstrap', 'cgPrompt', 'ui.router', 'datatables', 'ngResource'])
    .controller('QcSampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, matchApiMock, sharedCliaProperties,sharedCliaArray) {
        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        // var vm = this;
        $scope.dtInstance = {};
        // vm.dtOptions = DTOptionsBuilder.newOptions()
        //     .withDisplayLength(25);


        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withDisplayLength(25);

        // vm.dtOptions = DTOptionsBuilder.newOptions()
        //     .withOption('bLengthChange', false);
        //
        // vm.dtOptions = DTOptionsBuilder.newOptions()
        //     .withOption('searching', false);



        $scope.confirmed = '';
        // $scope.dfilter = 'none';

        //FILTER
        // $scope.$watch('confirmed', function(newValue, oldValue) {
        //
        //     // console.log($scope.confirmed);
        //     if(newValue === 'ALL') {
        //         $scope.filterCol = "";
        //         // $scope.dtInstance.DataTable.search("");
        //         // $scope.dtInstance.DataTable.search("").draw();
        //     }
        //     else {
        //         // $scope.dtInstance.DataTable.search(newValue);
        //         // $scope.dtInstance.DataTable.search(newValue).draw();
        //     }
        // });


        $scope.sampleId=$stateParams.sampleId;
        $scope.samplesList = [];
        $scope.singleNucleotideVariants = [];
        $scope.indels = [];
        $scope.copyNumberVariants = [];
        $scope.geneFusions = [];
        $scope.branch = "";
        $scope.sitename = 'undefined';
        $scope.getFileButtonClass = getFileButtonClass;
        $scope.currentVariantReport = null;
        $scope.loadQc_Table = loadQc_Table;
        $scope.loadSnv_Table = loadSnv_Table;
        $scope.loadGene_Table = loadGene_Table;
        $scope.chartLink = "/data/cnvChart.json";

        // function makeid()
        // {
        //     var text = "";
        //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        //
        //     for( var i=0; i < 12; i++ )
        //         text += possible.charAt(Math.floor(Math.random() * possible.length));
        //
        //     return text;
        // }
        //
        // $scope.posDate = "undefined";
        // $scope.tvarDate = Math.floor(Math.random() * 6) + 1  ;
        // $scope.aid = makeid();

        var properties = [];
        var properties = sharedCliaArray.getProperty();

        $scope.aid = properties[0];
        $scope.posDate = properties[1];
        $scope.tvarDate = properties[2];



        function getFileButtonClass(filePath) {
            return filePath ? $scope.enabledFileButtonClass : $scope.disabledFileButtonClass;
        }

        
        if($scope.sampleId.indexOf('MoCha') >= 0) {
            $scope.branch = 'mocha';
            $scope.sitename = 'MoCha';
            sharedCliaProperties.setProperty('mocha');
        }
        else{
            $scope.branch = 'mdacc';
            $scope.sitename = 'MDACC';
            sharedCliaProperties.setProperty('mdacc');
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
        $scope.snvList = [];
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


        //Sample Mocks
        //CNV
        function loadQc_Table() {
            matchApiMock
                .loadQc_Table()
                .then(loadQcList);
        };

        function loadQcList(data) {
            $scope.cnvList = data.data.copyNumberVariants;

        };

        //SNV
        // function loadSnv_Table() {
        //     matchApiMock
        //         .loadQc_Table()
        //         .then(loadSnvList);
        // };

        function loadSnvList(data) {
            // console.log("---> " + JSON.stringify($scope.filter))
            $scope.snvList = data.data.singleNucleotideVariants;
        };
        function loadSnv_Table() {
            matchApiMock
                .loadQc_Table()
                .then(loadSnvList);
                // .then(function (d) {
                //
                //     // console.log("---> " + JSON.stringify(d))
                //
                //     // var name = "";
                //     // //Parse data
                //     // for (var i = d.data.length - 1; i >= 0; i--) {
                //     //     name = d.data[i].molecular_id;
                //     //     if (id !== name) {
                //     //         d.data.splice(i, 1);
                //     //     }
                //     // }
                //     // loadMoChaMonthList(d);
                // });
        };

        $scope.confirmedFunc = function () {
            var id = $scope.dropValue;
            $scope.snvList = [];

            matchApiMock
                .loadQc_Table()
                .then(function (d) {
                    var filter;

                    if(id === "ALL") {
                        angular.forEach(d.data.singleNucleotideVariants, function (value, key) {
                            $scope.snvList.push(value);
                        });
                    }
                    else {
                        angular.forEach(d.data.singleNucleotideVariants, function (value, key) {
                            filter = value.filter;
                            if (id === filter) {
                                $scope.snvList.push(value);
                            }
                        });
                    }
                });
        };

        //GENE
        function loadGene_Table() {
            matchApiMock
                .loadQc_Table()
                .then(loadGeneList);
        };

        function loadGeneList(data) {
            $scope.geneList = data.data.geneFusions;
        };
        //Sample Mocks

    });
