angular.module('matchbox.iradmin',['ui.bootstrap', 'cgPrompt', 'ui.router'])
    .controller('IrAdminController',
        function( $scope, $http, $window, $stateParams, DTOptionsBuilder, irAdminApi, matchApiMock, $location, $anchorScroll, $timeout, sharedCliaProperties) {

        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        var vm = this;
        vm.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5);

        vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('bLengthChange', false);

        vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('searching', false);

        this.dtInstance = {};

        $scope.irList = [];
        $scope.moChaList = [];
        $scope.mdAccList = [];
        $scope.MDList = [];
        $scope.positiveListMocha = [];
        $scope.positiveListMDCC = [];
        $scope.negativeListMocha = [];
        $scope.negativeListMDCC = [];
        $scope.tokenIpAddress = [];
        $scope.positiveList = [];
        $scope.negativeList = [];

        $scope.singleNucleotideVariantsList = [];
        $scope.indelsList = [];
        $scope.copyNumberVariantsList = [];
        $scope.geneFusionsList = [];
        $scope.sitename = 'undefined';
        $scope.barlegend = 'Total Positive / NTC Control Status';
        $scope.titleid = "";
        $scope.mochaList=[];
        $scope.mochaNtcList=[];
        $scope.mdaccList=[];
        $scope.mdaccNtcList=[];
        $scope.status = "";
        $scope.branch = sharedCliaProperties.getProperty();
        $scope.mid = "undefined";
        $scope.cellColor = "";
        $scope.hrReports = null;
        $scope.loadSampleHRFiles = loadSampleHRFiles;
        $scope.schedule = "weekmap";

            $scope.loadMap = function (id) {
                if(id == "heatmap"){
                    $scope.schedule = "weekmap";
                    $scope.barlegend = "Total Positive / NTC Control Status";
                }
                else {
                    $scope.schedule = "heatmap";
                    $scope.barlegend = "History of Total Positive / NTC Control Status";
                }
            };
            
            //HEATMAP
            // Initialize random data for the demo
            var now = moment().endOf('day').toDate();
            var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
            $scope.exampleData = d3.time.days(yearAgo, now).map(function (dateElement) {



                return {
                    date: dateElement,
                    details: Array.apply(null, new Array(Math.floor(Math.random() * 2))).map(function(e, i, arr) {

                        // console.log(Math.random() * 3)

                        var name = "";
                        if((Math.random() * 3) > 2){name = 'Positive Controls ';}
                        else {name = 'Ntc Controls ';}

                        return {
                            'name': name + Math.floor(Math.random() * 123),
                            'date': function () {
                                var projectDate = new Date(dateElement.getTime());
                                projectDate.setHours(Math.floor(Math.random() * 24))
                                projectDate.setMinutes(Math.floor(Math.random() * 60));
                                return projectDate;
                            }(),
                            'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600)
                        };
                    }),
                    init: function () {
                        this.total = this.details.reduce(function (prev, e) {

                            return prev + e.value;
                        }, 0);
                        return this;
                    }
                }.init();

            });
            //HEATMAP

            // Set custom color for the calendar heatmap
            $scope.color = '#cd2327';
            $scope.overview = 'year';


            $scope.count_dates = [0, 0, 0, 0, 0, 0, 0];
            $scope.count_mda_dates = [0, 0, 0, 0, 0, 0, 0];
            $scope.ntc_dates = [0, 0, 0, 0, 0, 0, 0];
            $scope.ntc_mda_dates = [0, 0, 0, 0, 0, 0, 0];
            $scope.ntc_mda_ntc_dates = [0, 0, 0, 0, 0, 0, 0];
            $scope.pos_status = [0, 0, 0];
            $scope.ntc_status = [0, 0, 0];
            $scope.pos_mda_status = [0, 0, 0];
            $scope.ntc_mda_status = [0, 0, 0];

            aMoiLabels = ['Failed', 'Success', 'Not Generated'];
            ntcMoiLabels = ['Failed', 'Success', 'Not Generated'];

            //MOCHA
            function loadMoChaList(data) {
                $scope.count_dates = [0, 0, 0, 0, 0, 0, 0];

                angular.forEach(data, function (value,k) {
                    angular.forEach(value, function (v,k) {

                        if(v.current_status === 'FAILED'){$scope.pos_status[0] += 1;}
                        if(v.current_status === 'PASSED'){$scope.pos_status[1] += 1;}
                        else if(v.current_status === '-'){$scope.pos_status[2] += 1;}

                        var tmp;
                        switch (v.week_date) {
                            case 'Mon':
                                tmp = $scope.count_dates[0];
                                $scope.count_dates[0] = tmp + 1;
                                break;
                            case 'Tue':
                                tmp = $scope.count_dates[1];
                                $scope.count_dates[1] = tmp + 1;
                                break;
                            case 'Wed':
                                tmp = $scope.count_dates[2];
                                $scope.count_dates[2] = tmp + 1;
                                break;
                            case 'Thu':
                                tmp = $scope.count_dates[3];
                                $scope.count_dates[3] = tmp + 1;
                                break;
                            case 'Fri':
                                tmp = $scope.count_dates[4];
                                $scope.count_dates[4] = tmp + 1;
                                break;
                            case 'Sat':
                                // console.log("Selected Case Number is 6");
                                break;
                            default:
                        }
                    });

                });
                $scope.mochaList = data.data;
            };

            function loadMoChaNtcList(data) {

                $scope.ntc_dates = [0, 0, 0, 0, 0, 0, 0];

                angular.forEach(data, function (value,k) {
                    angular.forEach(value, function (v,k) {

                        if(v.current_status === 'FAILED'){$scope.ntc_status[0] += 1;}
                        else if(v.current_status === 'PASSED'){$scope.ntc_status[1] += 1;}
                        else if(v.current_status === '-'){$scope.ntc_status[2] += 1;}

                        var tmp;
                        switch (v.week_date) {
                            case 'Mon':
                                tmp = $scope.ntc_dates[0];
                                $scope.ntc_dates[0] = tmp + 1;
                                break;
                            case 'Tue':
                                tmp = $scope.ntc_dates[1];
                                $scope.ntc_dates[1] = tmp + 1;
                                break;
                            case 'Wed':
                                tmp = $scope.ntc_dates[2];
                                $scope.ntc_dates[2] = tmp + 1;
                                break;
                            case 'Thu':
                                tmp = $scope.ntc_dates[3];
                                $scope.ntc_dates[3] = tmp + 1;
                                break;
                            case 'Fri':
                                tmp = $scope.ntc_dates[4];
                                $scope.ntc_dates[4] = tmp + 1;
                                break;
                            case 'Sat':
                                // console.log("Selected Case Number is 6");
                                break;
                            default:
                        }
                    });
                });
                $scope.mochaNtcList = data.data;
            };
            //MOCHA

            //MDA
            function loadMDACCList(data) {

                $scope.count_mda_dates = [0, 0, 0, 0, 0, 0, 0];

                angular.forEach(data, function (value,k) {
                    angular.forEach(value, function (v,k) {
                        if(v.current_status === 'FAILED'){$scope.pos_mda_status[0] += 1;}
                        else if(v.current_status === 'PASSED'){$scope.pos_mda_status[1] += 1;}
                        else if(v.current_status === '-'){$scope.pos_mda_status[2] += 1;}

                        var tmp;
                        switch (v.week_date) {
                            case 'Mon':
                                tmp = $scope.count_mda_dates[0];
                                $scope.count_mda_dates[0] = tmp + 1;
                                break;
                            case 'Tue':
                                tmp = $scope.count_mda_dates[1];
                                $scope.count_mda_dates[1] = tmp + 1;
                                break;
                            case 'Wed':
                                tmp = $scope.count_mda_dates[2];
                                $scope.count_mda_dates[2] = tmp + 1;
                                break;
                            case 'Thu':
                                tmp = $scope.count_mda_dates[3];
                                $scope.count_mda_dates[3] = tmp + 1;
                                break;
                            case 'Fri':
                                tmp = $scope.count_mda_dates[4];
                                $scope.count_mda_dates[4] = tmp + 1;
                                break;
                            case 'Sat':
                                // console.log("Selected Case Number is 6");
                                break;
                            default:
                        }
                    });
                });
                $scope.mdaccList = data.data;
            };

            function loadMDANtcList(data) {
                $scope.ntc_mda_ntc_dates = [0, 0, 0, 0, 0, 0, 0];

                angular.forEach(data, function (value,k) {
                    angular.forEach(value, function (v,k) {

                        if(v.current_status === 'FAILED'){$scope.ntc_mda_status[0] += 1;}
                        else if(v.current_status === 'PASSED'){$scope.ntc_mda_status[1] += 1;}
                        else if(v.current_status === '-'){$scope.ntc_mda_status[2] += 1;}

                        var tmp;
                        switch (v.week_date) {
                            case 'Mon':
                                tmp = $scope.ntc_mda_ntc_dates[0];
                                $scope.ntc_mda_ntc_dates[0] = tmp + 1;
                                break;
                            case 'Tue':
                                tmp = $scope.ntc_mda_ntc_dates[1];
                                $scope.ntc_mda_ntc_dates[1] = tmp + 1;
                                break;
                            case 'Wed':
                                tmp = $scope.ntc_mda_ntc_dates[2];
                                $scope.ntc_mda_ntc_dates[2] = tmp + 1;
                                break;
                            case 'Thu':
                                tmp = $scope.ntc_mda_ntc_dates[3];
                                $scope.ntc_mda_ntc_dates[3] = tmp + 1;
                                break;
                            case 'Fri':
                                tmp = $scope.ntc_mda_ntc_dates[4];
                                $scope.ntc_mda_ntc_dates[4] = tmp + 1;
                                break;
                            case 'Sat':
                                // console.log("Selected Case Number is 6");
                                break;
                            default:
                        }
                    });
                });
                $scope.mdaccNtcList = data.data;
            };
            //MDA


        function loadSampleHRFiles() {
            var hr_files = [];
            hr_files.push({
                'report':'data/sample_hr_data_report.json',
                'data':'data/sample_hr_data_file.txt',
                'log':'data/sample_hr_log_file.txt'
            });
            $scope.hrReports = hr_files;
            // alert(JSON.stringify( $scope.hrReports))
        };

            $scope.getFileButtonClass = getFileButtonClass;
        function getFileButtonClass(filePath) {
            return filePath ? vm.enabledFileButtonClass : vm.disabledFileButtonClass;
        }


        if($scope.branch === 'mocha'){
            $scope.sitename = 'MoCha';

        }
        else {
            $scope.sitename = 'MDACC';
        }

        $scope.siteName = [];
        $scope.site = 'undefined';
        $scope.positives = 'undefined';
        $scope.barData = {};

        $scope.positiveControlList = [];
        $scope.negativeVariantsList = [];




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

            $scope.moChaList.push(
                {'ipAddress': '129.43.127.133', 'externalIpAddress': '129.43.127.133', 'host': 'NCI-MATCH-IR', 'status': 'CONNECTED', 'lastcon': 'June 21, 2016 5:50 PM GMT'}
            );
            $scope.mdAccList.push(
                {'ipAddress': '129.43.127.133', 'externalIpAddress': '129.43.127.133', 'host': 'ip-D15889', 'status': 'CONNECTED', 'lastcon': 'July 1, 2016 5:50 PM GMT'}
            );

            $scope.setSampleType = setSampleType;

            function setSampleType(reportType) {

                $scope.positives = "undefined";
                $scope.negatives = "undefined";

                if(reportType === 'MoCha'){
                    $scope.branch = 'mocha';
                    $scope.sitename = 'MoCha';

                }
                else if(reportType === 'MDACC'){
                    $scope.branch = 'mdacc';
                    $scope.sitename = 'MDACC';
                }

                if ($scope.SampleType === reportType) {
                    return;
                }

                $scope.SampleType = reportType;
            }

        //
            $scope.barOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };

            $scope.gotoBottom = function(id) {

                var tic = id + 'bottom';

                $timeout(function() {
                    $location.hash(tic);
                    // $("body").animate({scrollTop: $location.offset().top}, "slow");
                    $anchorScroll();
                });
            };


            //Svg for samples
            $scope.loadMochaNtc_Table = function () {
                matchApiMock
                    .loadMochaNtc_Table()
                    .then(function (d) {
                        loadMoChaNtcList(d);
                    });
            };

            $scope.date = new Date();

            $scope.showPositiveControlConfirmation = function (id) {
                //Clean tables
                $scope.positiveListMocha = [];
                $scope.positiveListMDCC = [];
                $scope.negativeListMocha = [];
                $scope.negativeListMDCC = [];
                $scope.tokenIpAddress = [];
                if(id === 'MoCha'){$scope.generateMocha_Table();}
                else {$scope.generateMDACC_Table();}

            };

            $scope.showNoTemplateControlConfirmation = function (id) {
                //Clean tables
                $scope.positiveListMocha = [];
                $scope.positiveListMDCC = [];
                $scope.negativeListMocha = [];
                $scope.negativeListMDCC = [];
                $scope.tokenIpAddress = [];
                if(id === 'MoCha'){$scope.generateNtcMocha_Table();}
                else {$scope.generateNtcMDACC_Table();}
            };

            $scope.posDate = "undefined";
            $scope.tvarDate = "undefined";
            $scope.aid = "undefined";

            //POSITIVES
            //Svg for samples
            $scope.openPositives = function (id, status) {
                $scope.selectedRow = id;
                $scope.mid = id;
                $scope.titleid = id;
                $scope.status = status;
                $scope.positives = 'mocha';
                
                var index = id.substring(id.indexOf("MoCha_") + 6, id.length) + '.json';
                
                matchApiMock
                    .openPositives(index)
                    .then(function (d) {
                        loadPositivesList(d);
                    });
            };

            // GENERATE TABLES
            $scope.generateMocha_Table = function () {

                   var nr = $scope.mochaList.length + 2;
               var mol = "SampleControl_MoCha_" + nr;

                       $scope.mochaList.push({
                               "molecular_is": mol,
                           "variant_reports": "-",
                           "current_status": "-",
                           "date_created": $scope.date,
                           "date_received": "-"
                   });
            };

            $scope.generateNtcMocha_Table = function () {

                   var nr = $scope.mochaNtcList.length + 2;
               var mol = "NtcControl_MoCha_" + nr;

                   $scope.mochaNtcList.push({
                           "molecular_is": mol,
                       "variant_reports": "-",
                       "current_status": "-",
                       "date_created": "June 8, 2016 4:51 PM GMT",
                       "date_received": "-"
               });
            };

            $scope.generateMDACC_Table = function () {

                   var nr = $scope.mdaccList.length + 1;
               var mol = "SampleControl_MDACC_" + nr;

                   $scope.mdaccList.push({
                           "molecular_is": mol,
                       "variant_reports": "-",
                       "current_status": "-",
                       "date_created": "June 8, 2016 4:51 PM GMT",
                       "date_received": "-"
               });
            };

            $scope.generateNtcMDACC_Table = function () {

                   var nr = $scope.mdaccNtcList.length + 1;
               var mol = "NtcControl_MDACC_" + nr;

                   $scope.mdaccNtcList.push({
                           "molecular_is": mol,
                       "variant_reports": "-",
                       "current_status": "-",
                       "date_created": $scope.date,
                       "date_received": "-"
               });
            };
            // GENERATE TABLES
            
            //SNV
            function loadPositivesList(data) {

                $scope.positiveControlList = data.data;
                angular.forEach(data.data, function (value,key) {
                    if(value.negativeVariantsList !== undefined){
                        $scope.negativeVariantsList = value.negativeVariantsList;
                    }
                });
            };


            //MDA Positives
            $scope.openMDACCPositives = function (id, status) {
                $scope.selectedRow = id;
                $scope.mid = id;
                $scope.titleid = id;
                $scope.status = status;
                $scope.positives = 'mdacc';

                var index = id.substring(id.indexOf("MDACC_") + 6, id.length) + '.json';

                matchApiMock
                    .openMDACCPositives(index)
                    .then(function (d) {
                        loadMDAPositivesList(d);
                    });
            };

            //SNV
            function loadMDAPositivesList(data) {

                $scope.positiveControlList = data.data;

                angular.forEach(data.data, function (value,key) {
                    if(value.negativeVariantsList !== undefined){
                        $scope.negativeVariantsList = value.negativeVariantsList;
                    }
                });
            };

            $scope.closePositives = function() {
                $scope.selectedRow = "";
                $scope.positives = 'undefined';

            };
            //POSITIVES

            function loadNegativesList(data) {

                angular.forEach(data, function (value,key) {

                    if(value.type == 'snv'){
                        $scope.indelsList.push(value);
                        // $scope.negativeVariantsList = value.negativeVariantsList;
                    }
                    if(value.type == 'id'){
                        $scope.indelsList.push(value);
                        // $scope.negativeVariantsList = value.negativeVariantsList;
                    }
                    if(value.type == 'gf'){
                        $scope.geneFusionsList.push(value);
                        // $scope.negativeVariantsList = value.negativeVariantsList;
                    }
                });
            };

            $scope.openNegatives = function(id, status) {
                $scope.selectedRow = id;
                $scope.negatives = 'mocha';
                $scope.status = status;

                var url ="data/sample_ntc_mocha_control_1.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadNegativesList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });
            };

            $scope.openMDANegatives = function(id, status) {
                $scope.selectedRow = id;
                $scope.negatives = 'mdacc';
                $scope.status = status;

                var url ="data/sample_ntc_mdacc_control_1.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadNegativesList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });
            };

            $scope.closeNegatives = function() {
                $scope.selectedRow = "";
                $scope.negatives = 'undefined';

            };

            //LOAD SAMPLES
            $scope.loadSampleBreakups = function() {

                armNames = ['Mon.', 'Tue.', ' Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];
                mdaccNames = ['Mon.', 'Tue.', ' Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];

                matchApiMock
                    .loadMocha_List()
                    .then(function (d) {
                        loadMoChaList(d);

                        $scope.barData = {
                            labels: armNames,
                            datasets: [
                                {
                                    // label: "<b style='color:darkgreen;'>Positive Controls</b>",
                                    backgroundColor: 'darkgreen',
                                    fillColor: 'darkgreen',
                                    strokeColor: 'rgba(220,220,220,0.8)',
                                    pointColor: 'darkgreen',
                                    highlightFill: '#23c6c8', //"rgba(220,220,220,0.75)",
                                    highlightStroke: 'rgba(220,220,220,1)',
                                    data:  $scope.count_mda_dates
                                },
                                {
                                    // label: "<b style='color:navy;'>No Template Controls</b>",
                                    backgroundColor: 'navy',
                                    fillColor: 'navy',
                                    strokeColor: 'rgba(151,187,205,1)',
                                    pointColor: 'navy',
                                    highlightFill: '#23c6c8', //'rgba(220,220,220,0.75)',
                                    highlightStroke: 'rgba(220,220,220,1)',
                                    data: $scope.ntc_dates
                                }

                            ]
                        };

                        aMoiHighlight = "#000088"; //"#dedede";

                        $scope.pieData = [
                            {
                                value: $scope.pos_status[0],
                                color: "darkred",
                                highlight: aMoiHighlight,
                                label: aMoiLabels[0]
                            },
                            {
                                value: $scope.pos_status[1],
                                color: "darkgreen",
                                highlight: aMoiHighlight,
                                label: aMoiLabels[1]
                            },
                            {
                                value: $scope.pos_status[2],
                                color: "#18a689", //"#ab0102",
                                highlight: aMoiHighlight,
                                label: aMoiLabels[2]
                            }

                        ];
                    });

                matchApiMock
                    .loadMochaNtc_Table()
                    .then(function (d) {
                        loadMoChaNtcList(d);

                        $scope.barData = {
                            labels: armNames,
                            datasets: [
                                {
                                    // label: "<b style='color:darkgreen;'>Positive Controls</b>",
                                    backgroundColor: 'darkgreen',
                                    fillColor: 'darkgreen',
                                    strokeColor: 'rgba(220,220,220,0.8)',
                                    pointColor: 'darkgreen',
                                    highlightFill: '#23c6c8', //"rgba(220,220,220,0.75)",
                                    highlightStroke: 'rgba(220,220,220,1)',
                                    data:  $scope.count_dates
                                },
                                {
                                    // label: "<b style='color:navy;'>No Template Controls</b>",
                                    backgroundColor: 'navy',
                                    fillColor: 'navy',
                                    strokeColor: 'rgba(151,187,205,1)',
                                    pointColor: 'navy',
                                    highlightFill: '#23c6c8', //'rgba(220,220,220,0.75)',
                                    highlightStroke: 'rgba(220,220,220,1)',
                                    data: $scope.ntc_dates
                                }

                            ]
                        };

                        $scope.ntcpieData = [
                            {
                                value: $scope.ntc_status[0],
                                color: "orange",
                                highlight: aMoiHighlight,
                                label: ntcMoiLabels[0]
                            },
                            {
                                value: $scope.ntc_status[1],
                                color: "navy",
                                highlight: aMoiHighlight,
                                label: ntcMoiLabels[1]
                            },
                            {
                                value: $scope.ntc_status[2],
                                color: "indigo", //"#ab0102",
                                highlight: aMoiHighlight,
                                label: ntcMoiLabels[2]
                            }
                        ];
                    });


                matchApiMock
                    .loadMDACC_Table()
                    .then(function (d) {
                        loadMDACCList(d);

                        // console.log($scope.count_mda_dates);

                        $scope.barDataMDACC = {
                            labels: mdaccNames,
                            datasets: [
                                {
                                    // label: "<b style='color:darkgreen;'>Positive Controls</b>",
                                    backgroundColor: 'darkgreen',
                                    fillColor: "darkgreen",
                                    strokeColor: "rgba(220,220,220,0.8)",
                                    highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                    highlightStroke: "rgba(220,220,220,1)",
                                    data: $scope.count_mda_dates
                                },
                                {
                                    // label: "<b style='color:navy;'>No Template Controls</b>",
                                    backgroundColor: 'navy',
                                    fillColor: 'navy',
                                    strokeColor: 'rgba(151,187,205,1)',
                                    pointColor: 'rgba(151,187,205,1)',
                                    highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                    highlightStroke: "rgba(220,220,220,1)",
                                    data: $scope.ntc_mda_ntc_dates
                                }
                            ]
                        };

                        aMoiHighlight = "#000088"; //"#dedede";

                        $scope.pieMdaData = [
                            {
                                value: $scope.pos_mda_status[0],
                                color: "darkred",
                                highlight: aMoiHighlight,
                                label: aMoiLabels[0]
                            },
                            {
                                value: $scope.pos_mda_status[1],
                                color: "darkgreen",
                                highlight: aMoiHighlight,
                                label: aMoiLabels[1]
                            },
                            {
                                value: $scope.pos_mda_status[2],
                                color: "#18a689", //"#ab0102",
                                highlight: aMoiHighlight,
                                label: aMoiLabels[2]
                            }

                        ];

                    });


                matchApiMock
                    .loadMDACCNtc_Table()
                    .then(function (d) {
                        loadMDANtcList(d);

                        $scope.barDataMDACC = {
                            labels: mdaccNames,
                            datasets: [
                                {
                                    // label: "<b style='color:darkgreen;'>Positive Controls</b>",
                                    backgroundColor: 'darkgreen',
                                    fillColor: "darkgreen",
                                    strokeColor: "rgba(220,220,220,0.8)",
                                    highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                    highlightStroke: "rgba(220,220,220,1)",
                                    data: $scope.count_mda_dates
                                },
                                {
                                    // label: "<b style='color:navy;'>No Template Controls</b>",
                                    backgroundColor: 'navy',
                                    fillColor: 'navy',
                                    strokeColor: 'rgba(151,187,205,1)',
                                    pointColor: 'rgba(151,187,205,1)',
                                    highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                    highlightStroke: "rgba(220,220,220,1)",
                                    data: $scope.ntc_mda_ntc_dates
                                }
                            ]
                        };

                        $scope.ntcMdapieData = [
                            {
                                value: $scope.ntc_mda_status[0],
                                color: "orange",
                                highlight: aMoiHighlight,
                                label: ntcMoiLabels[0]
                            },
                            {
                                value: $scope.ntc_mda_status[1],
                                color: "navy",
                                highlight: aMoiHighlight,
                                label: ntcMoiLabels[1]
                            },
                            {
                                value: $scope.ntc_mda_status[2],
                                color: "indigo", //"#ab0102",
                                highlight: aMoiHighlight,
                                label: ntcMoiLabels[2]
                            }
                        ];

                    });

                $scope.barlegend = "Total Positive / NTC Control Status";
                /**
                 * Options for Doughnut chart
                 */
                $scope.doughnutOptions = {
                    segmentShowStroke : true,
                    segmentStrokeColor : "#fff",
                    segmentStrokeWidth : 2,
                    percentageInnerCutout : 55, // This is 0 for Pie charts
                    animationSteps : 100,
                    animationEasing : "easeOutBounce",
                    animateRotate : true,
                    animateScale : false
                };
            };

    });
