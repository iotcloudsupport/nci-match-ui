angular.module('iradmin.matchbox',['ui.bootstrap', 'cgPrompt', 'ui.router'])
    .controller('IrAdminController',
        function( $scope, $http, $window, $stateParams, DTOptionsBuilder, irAdminApi, prompt, $uibModal, $filter) {

        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bLengthChange', false);

        $scope.dtOptions = DTOptionsBuilder.newOptions()
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
        $scope.branch = $stateParams.branch;
        $scope.siteName = [];
        $scope.site = 'undefined';
        $scope.barData = {};


        $scope.mockListMDCC = [{"sampleSite":"MDACC","sampleId":"MDACC_1","sampleMsn":"NtcControl_MDACC_1","dateCreated":1466776298978,"dateReceived":1466776367227,"status":null}];


            $scope.setSampleType = setSampleType;


            function setSampleType(reportType) {

                if(reportType === 'MoCha'){
                    $scope.branch = 'mocha';
                }
                else if(reportType === 'MDAC'){
                    $scope.branch = 'mdacc';
                }

                if ($scope.SampleType === reportType) {
                    return;
                }

                $scope.SampleType = reportType;
                // setVariantReport();
            }

            // $scope.getMDACC = getMDACC;
            // $scope.getMOCHA = getMOCHA;

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


        //Populate Data
        $scope.populateData = function(d) {


            angular.forEach(d.data, function (value,key) {
                if(value.siteName !== 'Unknown' && (value.siteName === 'MoCha'  || value.siteName === 'MDACC')) {
                    $scope.siteName.push(value.siteName);
                    $scope.site = value.siteName;
                    $scope.tokenIpAddress.push({ 'siteName': value.siteName, 'siteIpAddress': value.siteIpAddress });
                }

                var positivesets = value.sampleControls;
                var negativesets = value.ntcControls;

                //Positive sets
                angular.forEach(positivesets, function (v,k) {

                    if(v.site === 'MoCha') {

                        $scope.positiveListMocha.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                    else if(v.site === 'MDACC') {

                        $scope.positiveListMDCC.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                });

                //Negative sets
                angular.forEach(negativesets, function (v,k) {

                    if(v.site === 'MoCha') {

                        $scope.negativeListMocha.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                    else if(v.site === 'MDACC') {

                        $scope.negativeListMDCC.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }


                });

                // alert(JSON.stringify($scope.positiveListMDCC))
                // alert(JSON.stringify($scope.negativeListMDCC))


            });
        };

        $scope.showPositiveControlConfirmation = function (id) {

        prompt({
            "title": "Do you want to continue?",
            "message": "Warning! Once this action has been submitted it cannot be undone. Please enter your site pin to confirm. ",
            "input": true,
            "label": "PIN",
            "value": ""
        }).then(function(result){
            var items = {};
            var d = $filter('filter')($scope.tokenIpAddress, id);
            items.confirmation = result;
            items.ipAddress = d[0].siteIpAddress;
            irAdminApi
                .generatePositiveControlToken(items)
                .then(
                    function () {
                        irAdminApi
                            .loadSampleControlsList()
                            .then(function (d) {
                                //Clean tables
                                $scope.positiveListMocha = [];
                                $scope.positiveListMDCC = [];
                                $scope.negativeListMocha = [];
                                $scope.negativeListMDCC = [];
                                $scope.tokenIpAddress = [];

                                $scope.populateData(d);
                            });
                    },
                function(response) { // optional
                });
            });
        };


        $scope.showNoTemplateControlConfirmation = function (id) {
            prompt({
                "title": "Do you want to continue?",
                "message": "Warning! Once this action has been submitted it cannot be undone. Please enter your site pin to confirm. ",
                "input": true,
                "label": "PIN",
                "value": ""
            }).then(function(result){
                var items = {};
                var d = $filter('filter')($scope.tokenIpAddress, id);
                items.confirmation = result;
                items.ipAddress = d[0].siteIpAddress;
                irAdminApi
                    .generateNoTemplateControlToken(items)
                    .then(
                        function () {
                            irAdminApi
                                .loadSampleControlsList()
                                .then(function (d) {
                                    //Clean tables
                                    $scope.positiveListMocha = [];
                                    $scope.positiveListMDCC = [];
                                    $scope.negativeListMocha = [];
                                    $scope.negativeListMDCC = [];
                                    $scope.tokenIpAddress = [];

                                    $scope.populateData(d);
                                });
                        },
                        function(response) { // optional
                        });
            });
        };

        $scope.loadHeartBeatList = function () {
            irAdminApi
                .loadHeartBeatList()
                .then(function (d) {
                    angular.forEach(d.data, function (value,key) {
                        var timer = ['fa fa-clock-o fa-2x', 'color:green'];
                        var time = "On time";

                        if (key === 2) {
                            timer = ['fa fa-warning fa-2x', 'color:orange'];
                            time = "1.5 hours ago";
                        }

                        if (key === 3) {
                            timer = ['fa fa-warning fa-2x', 'color:red'];
                            time = "8.5 hours ago";
                        }
                        // var dbreport = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dbReport?ipAddress="+value.externalIpAddress;
                        // var datafile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dataFile?ipAddress="+value.externalIpAddress;
                        // var logfile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/logFile?ipAddress="+value.externalIpAddress;

                        var dbreport = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dbReport?ipAddress=129.43.127.133";
                        var datafile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dataFile?ipAddress=129.43.127.133";
                        var logfile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/logFile?ipAddress=129.43.127.133";

                        if(value.location !== "Yale" &&  value.location !== "MGH") {

                            // alert(value.location)

                            $scope.irList.push({
                                'timer': timer,
                                'time': time,
                                'hostName': value.hostName,
                                'ipAddress': value.ipAddress,
                                'externalIpAddress': value.externalIpAddress,
                                'status': value.status,
                                'lastContactDate': value.lastContactDate,
                                'dbReport': value.dbReport,
                                'dataFile': value.dataFile,
                                'logFile': value.logFile,
                                'location': value.location,
                                'dbReportPath': dbreport,
                                'dataFilePath': datafile,
                                'logFilePath': logfile
                            });
                        }
                    });
                });
            };

            $scope.loadHeartMoChaBeatList = function () {
                irAdminApi
                    .loadHeartBeatList()
                    .then(function (d) {
                        angular.forEach(d.data, function (value,key) {
                            var timer = ['fa fa-clock-o fa-2x', 'color:green'];
                            var time = "On time";

                            if (key === 2) {
                                timer = ['fa fa-warning fa-2x', 'color:orange'];
                                time = "1.5 hours ago";
                            }

                            if (key === 3) {
                                timer = ['fa fa-warning fa-2x', 'color:red'];
                                time = "8.5 hours ago";
                            }
                            // var dbreport = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dbReport?ipAddress="+value.externalIpAddress;
                            // var datafile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dataFile?ipAddress="+value.externalIpAddress;
                            // var logfile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/logFile?ipAddress="+value.externalIpAddress;

                            var dbreport = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dbReport?ipAddress=129.43.127.133";
                            var datafile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dataFile?ipAddress=129.43.127.133";
                            var logfile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/logFile?ipAddress=129.43.127.133";

                            if(value.location === "MoCha") {

                                // alert(value.location)

                                $scope.moChaList.push({
                                    'timer': timer,
                                    'time': time,
                                    'hostName': value.hostName,
                                    'ipAddress': value.ipAddress,
                                    'externalIpAddress': value.externalIpAddress,
                                    'status': value.status,
                                    'lastContactDate': value.lastContactDate,
                                    'dbReport': value.dbReport,
                                    'dataFile': value.dataFile,
                                    'logFile': value.logFile,
                                    'location': value.location,
                                    'dbReportPath': dbreport,
                                    'dataFilePath': datafile,
                                    'logFilePath': logfile
                                });
                            }
                            else if(value.location === "MDACC") {

                                // alert(value.location)

                                $scope.mdAccList.push({
                                    'timer': timer,
                                    'time': time,
                                    'hostName': value.hostName,
                                    'ipAddress': value.ipAddress,
                                    'externalIpAddress': value.externalIpAddress,
                                    'status': value.status,
                                    'lastContactDate': value.lastContactDate,
                                    'dbReport': value.dbReport,
                                    'dataFile': value.dataFile,
                                    'logFile': value.logFile,
                                    'location': value.location,
                                    'dbReportPath': dbreport,
                                    'dataFilePath': datafile,
                                    'logFilePath': logfile
                                });
                            }
                        });
                    });
            };

            $scope.loadSampleControlsList = function () {
                irAdminApi
                    .loadSampleControlsList()
                    .then(function (d) {
                        $scope.populateData(d);
                    });
            };


            $scope.loadSampleMDACCControlsList = function () {

                irAdminApi
                    .loadSampleControlsList()
                    .then(function (d) {
                        $scope.populateData(d);

                    });
            };

            //Genrate Postive Token
            $scope.generatePositiveControlToken = function (items) {
                irAdminApi
                    .generatePositiveControlToken(items)
                    .then(function (d) {},
                    function(response) {});
            };

            //Genrate No Template Token
            $scope.generateNoTemplateControlToken = function (items) {
                irAdminApi
                    .generateNoTemplateControlToken(items)
                    .then(function (d) {},
                        function(response) {});
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
                //         alert(JSON.stringify(d.data))

                $window.histogramPlot();
                $window.circosPlot();
                $window.piePlot();
                        // $window.d3BoxVersion5(d.data);

            };

            // $scope.setCanvasHeight = function(elementName, heightVal) {
            //     alert(heightVal)
            //     var ctx = $(elementName)[0].getContext('2d');
            //     ctx.canvas.height = heightVal;
            // }

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
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            segmentShowStroke : false,
                            animateScale : true,
                            data: prepareData
                        }
                    ]
                };

                    armNames = [
                        'Pos. Snv'
                        , 'Pos. Indels'
                        , 'Pos. Cnv'
                        , 'Chrom Values'
                        , 'Allele Freq'
                        , 'Protein'
                        , 'Funk Gene'
                        , 'Variant Type/Snv'
                        , 'Variant Type/Id'
                        , 'Read Depth Snv'
                        , 'Read Depth Indel'
                        , 'Transcript Snv'
                        , 'Transcript Indel'
                    ];
                    armValues = [6, 3, 15, 2, 1, 11, 2, 3, 1, 23, 24, 16, 22];

                    mdaccNames = [
                        'Pos. Snv'
                        , 'Pos. Indels'
                        , 'Pos. Cnv'
                        , 'Chrom Values'
                        , 'Allele Freq'
                        , 'Protein'
                        , 'Funk Gene'
                        , 'Variant Type/Snv'
                        , 'Variant Type/Id'
                        , 'Read Depth Snv'
                        , 'Read Depth Indel'
                        , 'Transcript Snv'
                        , 'Transcript Indel'
                    ];
                    mdaccValues = [1, 8, 3, 8, 1, 1, 9, 1, 1, 31, 28, 12, 31];


                $scope.barData = {
                    labels: armNames,
                    datasets: [
                        {
                            label: "Accrual Dataset",
                            fillColor: "Indigo",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: armValues
                        }
                    ]
                };

                $scope.barDataMDACC = {
                    labels: mdaccNames,
                    datasets: [
                        {
                            label: "Accrual Dataset",
                            fillColor: "Indigo",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: mdaccValues
                        }
                    ]
                };


                // alert(JSON.stringify($scope.barData))

            };

    });
