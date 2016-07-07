angular.module('qcsample.matchbox',[ ])
    .controller('QcSampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder, svgApi) {
        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        // $scope.dtOptions = DTOptionsBuilder.newOptions()
        //     .withDOM('&lt;"custom-element"&gt;pitrfl');
            // .withDOM('&lt;"custom-element"&gt;pitrfl');

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
            var numericId = id.substring(id.indexOf("_")-3, (id.length - 2));

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
            // svgApi
            //     .getSvgNtc()
            //     .then(function (d) {
                    // $window.d3BoxVersion5(d.data);
                    $window.d3BoxVersion5Mock();
                // });
        };


        $scope.loadPieChart = function(site) {

            aMoiLabels = ['LRP1'
                ,'TBP'
                ,'MYC'
                ,'HMBS'
                ,'ITGB7'];

            if(site==='mocha') {
                // 8668	708413	75577	164227	1028
                aMoiValues = [8668, 708413, 75577, 164227, 1028]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
            }
            else{
                aMoiValues = [8668, 708413, 75577, 164227, 1028];
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
                    color: "#f8ac59",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[4]
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
    // .directive('datatableWrapper', function($timeout, $compile){
    // return {
    //     restrict: 'E',
    //     transclude: true,
    //     template: '<ng-transclude></ng-transclude>',
    //     link: link
    // };
    //
    // function link(scope, element) {
    //     // Using $timeout service as a "hack" to trigger the callback function once everything is rendered
    //     $timeout(function () {
    //         // Compiling so that angular knows the button has a directive
    //         $compile(element.find('.custom-element'))(scope);
    //     }, 0, false);
    // }
    // })
    // .directive('customElement', function(){
    //     return {
    //         restrict: 'C',
    //         template: '<select class="form-control pull-right" id="snv-table-select" >' +
    //         '<option value="ALL" ng-click="filterPage(0)" selected="selected">ALL</option>' +
    //         '<option value="PASS" ng-click="filterPage(1)">PASS</option>' +
    //         '<option value="NOCALL" ng-click="filterPage(2)">NOCALL</option>' +
    //         '<option value=".">.</option>' +
    //     '</select>'
    //     };
    // });
