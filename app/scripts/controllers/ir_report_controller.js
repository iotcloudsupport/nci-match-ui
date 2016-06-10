angular.module('iradmin.matchbox',['ui.bootstrap', 'cgPrompt', 'ui.router'])
    .controller('IrAdminController',
        function( $scope, $http, $window, $stateParams, DTOptionsBuilder, irAdminApi, prompt, $uibModal, $filter) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('lengthChange', false);

        this.dtInstance = {};

        $scope.irList = [];

            $scope.moChaList = [];
            $scope.MDList = [];
            
        $scope.positiveListMocha = [];
        $scope.positiveListMDCC = [];
        $scope.negativeListMocha = [];
        $scope.negativeListMDCC = [];
        $scope.tokenIpAddress = [];

        $scope.positiveList = [];
        $scope.negativeList = [];
            $scope.branch = $stateParams.branch;

        //Populate Data
        $scope.populateData = function(d) {



            // $stateParams.sampleId
            // alert(JSON.stringify(d.data))

            angular.forEach(d.data, function (value,key) {

                if(value.siteName !== 'Unknown') {
                    $scope.tokenIpAddress.push({ 'siteName': value.siteName, 'siteIpAddress': value.siteIpAddress });
                }

                var positivesets = value.sampleControls;
                var negativesets = value.ntcControls;

                // alert(JSON.stringify(negativesets))

                //Positive sets
                angular.forEach(positivesets, function (v,k) {
                    
                    var site = v.site.toLowerCase();

                    if(site === $scope.branch) {

                        $scope.positiveList.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                    // else if(v.site === 'MDACC') {
                    //
                    //     $scope.positiveListMDCC.push({
                    //         'sampleSite': v.site,
                    //         'sampleId': v.id,
                    //         'sampleMsn': v.molecularSequenceNumber,
                    //         'dateCreated': v.dateCreated,
                    //         'dateReceived': v.dateReceived,
                    //         'status': v.status
                    //     });
                    // }
                });



                //Negative sets
                angular.forEach(negativesets, function (v,k) {

                    var site = v.site.toLowerCase();

                    if(site === $scope.branch) {
                        $scope.negativeList.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status,
                            'passed': v.passed
                        });
                    }
                    // else if(v.site === 'MDACC') {
                    //
                    //     $scope.negativeListMDCC.push({
                    //         'sampleSite': v.site,
                    //         'sampleId': v.id,
                    //         'sampleMsn': v.molecularSequenceNumber,
                    //         'dateCreated': v.dateCreated,
                    //         'dateReceived': v.dateReceived,
                    //         'status': v.status,
                    //         'passed': v.passed
                    //     });
                    // }

                    // alert(JSON.stringify( $scope.negativeListMDCC))

                });



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
                        });
                    });
            };

            $scope.loadSampleControlsList = function (id) {
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
    });
