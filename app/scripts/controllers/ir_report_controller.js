angular.module('iradmin.matchbox',['ui.bootstrap', 'cgPrompt', 'ui.router'])
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

        $scope.armValuesYear1 = [2, 3, 4, 5, 2, 1, 0];


            $scope.loadMap = function (id) {
                if(id == "heatmap"){$scope.schedule = "weekmap"}
                else {$scope.schedule = "heatmap"}
            };
            
        //    #######


            // Initialize random data for the demo
            var now = moment().endOf('day').toDate();
            var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
            $scope.exampleData = d3.time.days(yearAgo, now).map(function (dateElement) {

                return {
                    date: dateElement,
                    details: Array.apply(null, new Array(Math.floor(Math.random() * 25))).map(function(e, i, arr) {

                        var name = "";
                        if(i > 8){name = 'Positive Controls '}
                        else {name = 'Ntc Controls ';}

                        return {
                            'name': name + Math.floor(Math.random() * 3),
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

            // Set custom color for the calendar heatmap
            $scope.color = '#cd2327';

            // Set overview type (choices are year, month and day)
            $scope.overview = 'year';

            // Handler function
            $scope.print = function (val) {
                console.log(val);
            };
            
            
        //    ########



            // $scope.armValuesYear = [16, 13, 2, 24, 28, 1, 0];

            $scope.count_dates = [0, 0, 0, 0, 0, 0, 0];


            function loadMoChaList(data) {

                $scope.count_dates = [0, 0, 0, 0, 0, 0, 0];

                angular.forEach(data, function (value,k) {
                    angular.forEach(value, function (v,k) {
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

                // console.log("NTC DATA--> " + JSON.stringify(data));

                $scope.ntc_dates = [0, 0, 0, 0, 0, 0, 0];

                angular.forEach(data, function (value,k) {
                    angular.forEach(value, function (v,k) {
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


            $scope.positiveControlList1 = [];
            $scope.negativeVariantsList1 = [];


            $scope.positiveControlList2 = [];
            $scope.positiveControlList2 = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"3","position":"178916946","identifier":"COSM12880","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"SNV","geneName":"BRAF","chromosome":"7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"false"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];

            $scope.negativeVariantsList2 = [];
            $scope.negativeVariantsList2.push({
                'publicMedIds': '',
                'position': '112258',
                'geneName': "",
                'variantType':'Indel',
                'reference':'G',
                'alternative': 'C',
                'hgvs': 'c.887A',
                'protein': 'p.Emp186Gly',
                'function': 'missense'
            });

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
                // setVariantReport();
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
                // set the location.hash to the id of
                // the element you wish to scroll to.

                $timeout(function() {
                    $location.hash(tic);
                    // $("body").animate({scrollTop: $location.offset().top}, "slow");
                    $anchorScroll();
                });
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
            });
        };


           

            // $scope.count_dates = {
            //     'Mon':0,'Tue':0,'Wed':0,'Thu':0,'Fri':0,Sat:'',Sun:''
            // };




            //Svg for samples
            $scope.loadMochaNtc_Table = function () {

                matchApiMock
                    .loadMochaNtc_Table()
                    .then(function (d) {
                        loadMoChaNtcList(d);
                    });
            };


            // function loadMoChaNtcList(data) {
            //     // alert(JSON.stringify(data))
            //     $scope.mochaNtcList = data.data;
            // };

            //Svg for samples
            $scope.loadMDACC_Table = function () {
                matchApiMock
                    .loadMDACC_Table()
                    .then(function (d) {
                        loadMDACCList(d);
                    });
            };
            function loadMDACCList(data) {
                // alert(JSON.stringify(data))
                $scope.mdaccList = data.data;
            };

            //Svg for samples
            $scope.loadMDACCNtc_Table = function () {
                matchApiMock
                    .loadMDACCNtc_Table()
                    .then(function (d) {
                        loadMDACCNtcList(d);
                    });
            };
            function loadMDACCNtcList(data) {
                // alert(JSON.stringify(data))
                $scope.mdaccNtcList = data.data;
            };

            $scope.date = new Date();

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




            // function loadFile(data) {
            //
            //     alert(JSON.stringify(data))
            //
            //     // $scope.cnvList = data.data.copyNumberVariants;
            // };




            $scope.loadPieChart = function(site) {



                aMoiLabels = ['Failed', 'Success', 'Not Generated'];
                ntcMoiLabels = ['Failed', 'Success', 'Not Generated'];
                if(site==='mocha') {
                    aMoiValues = [15, 75, 10]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
                    ntcMoiValues = [10, 26, 4]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
                }
                else{
                    aMoiValues = [25, 67, 8];
                    ntcMoiValues = [1, 18, 2];
                }
                aMoiHighlight = "#000088"; //"#dedede";

                $scope.pieData = [
                    {
                        value: aMoiValues[0],
                        color: "darkred",
                        highlight: aMoiHighlight,
                        label: aMoiLabels[0]
                    },
                    {
                        value: aMoiValues[1],
                        color: "darkgreen",
                        highlight: aMoiHighlight,
                        label: aMoiLabels[1]
                    },
                    {
                        value: aMoiValues[2],
                        color: "#18a689", //"#ab0102",
                        highlight: aMoiHighlight,
                        label: aMoiLabels[2]
                    }

                ];


                $scope.ntcpieData = [
                    {
                        value: ntcMoiValues[0],
                        color: "orange",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[0]
                    },
                    {
                        value: ntcMoiValues[1],
                        color: "navy",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[1]
                    },
                    {
                        value: ntcMoiValues[2],
                        color: "indigo", //"#ab0102",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[2]
                    }
            ];


                $scope.ntcMDApieData = [
                    {
                        value: ntcMoiValues[0],
                        color: "orange",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[0]
                    },
                    {
                        value: ntcMoiValues[1],
                        color: "navy",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[1]
                    },
                    {
                        value: ntcMoiValues[2],
                        color: "indigo", //"#ab0102",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[2]
                    }
                ];

            }

            //Svg for samples
            $scope.loadScatterPlot = function () {

                $window.histogramPlot();
                $window.circosPlot();
                $window.piePlot();
                        // $window.d3BoxVersion5(d.data);

            };


            $scope.loadSampleBreakups = function() {

                armNames = ['Mon.', 'Tue.', ' Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];

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

                    });




                // console.log("$scope.count_dates--> "+ $scope.count_dates)

                $scope.barlegend = "Total Positive / NTC Control Status";

                var prepareData = {
                    series: [5, 3, 4]
                }

                this.pieData = prepareData;

                pieNames = [
                    'EAY131-QQQ'
                    , 'EAY131-BEEE'
                    , 'EAY131-HRRR'
                ];

                var options = {
                    percentageInnerCutout: 40
                };

                $scope.flotPieData = {
                    labels: pieNames,
                    datasets: [
                        {
                            label: "Positive Controls",
                            fillColor: "#1c84c6",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            segmentShowStroke : false,
                            animateScale : true,
                            percentageInnerCutout: 95,
                            data: prepareData
                        }
                    ]
                };

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



                mdaccNames = [
                    'Mon.'
                    , 'Tue.'
                    , ' Wed.'
                    , 'Thu.'
                    , 'Fri.'
                    , 'Sat.'
                    , 'Sun.'
                ];

                mdaccValues = [12, 15, 11, 21, 11, 1, 0];
                mdaccValues1 = [6, 7, 3, 9, 2, 1, 0];

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
                            data: mdaccValues
                        },
                        {
                            // label: "<b style='color:navy;'>No Template Controls</b>",
                            backgroundColor: 'navy',
                            fillColor: 'navy',
                            strokeColor: 'rgba(151,187,205,1)',
                            pointColor: 'rgba(151,187,205,1)',
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: mdaccValues1
                        }
                    ]
                };
            };

            $scope.loadNtcSampleBreakups = function() {
                // matchApiMock
                //     .loadMocha_List()
                //     .then(function (d) {
                //         loadMoChaList(d);
                //     });
                matchApiMock
                    .loadMochaNtc_Table()
                    .then(function (d) {
                        loadMoChaNtcList(d);
                    });

                // console.log("$scope.count_dates--> "+ $scope.count_dates)

                $scope.barlegend = "Total Positive / NTC Control Status";

                var prepareData = {
                    series: [5, 3, 4]
                }

                this.pieData = prepareData;

                pieNames = [
                    'EAY131-QQQ'
                    , 'EAY131-BEEE'
                    , 'EAY131-HRRR'
                ];

                var options = {
                    percentageInnerCutout: 40
                };

                $scope.flotPieData = {
                    labels: pieNames,
                    datasets: [
                        {
                            label: "Positive Controls",
                            fillColor: "#1c84c6",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            segmentShowStroke : false,
                            animateScale : true,
                            percentageInnerCutout: 95,
                            data: prepareData
                        }
                    ]
                };

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

                armNames = [
                    'Mon.'
                    , 'Tue.'
                    , ' Wed.'
                    , 'Thu.'
                    , 'Fri.'
                    , 'Sat.'
                    , 'Sun.'
                ];
                // armValues = [16, 13, 2, 24, 28, 1, 0];
                armValues1 = [2, 3, 4, 5, 2, 1, 0];
                // armValues2 = [10, 0.5, 73, 0, 3];

                armNamesYear = ['Mon.', 'Tue.', ' Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'
                ];
                armValuesYear = [16, 13, 2, 24, 28, 1, 0];
                armValuesYear1 = [2, 3, 4, 5, 2, 1, 0];
                // armValues2 = [10, 0.5, 73, 0, 3];







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
                            data: armValues1
                        }

                    ]
                };

                mdaccNames = [
                    'Mon.'
                    , 'Tue.'
                    , ' Wed.'
                    , 'Thu.'
                    , 'Fri.'
                    , 'Sat.'
                    , 'Sun.'
                ];

                mdaccValues = [12, 15, 11, 21, 11, 1, 0];
                mdaccValues1 = [6, 7, 3, 9, 2, 1, 0];

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
                            data: mdaccValues
                        },
                        {
                            // label: "<b style='color:navy;'>No Template Controls</b>",
                            backgroundColor: 'navy',
                            fillColor: 'navy',
                            strokeColor: 'rgba(151,187,205,1)',
                            pointColor: 'rgba(151,187,205,1)',
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: mdaccValues1
                        }
                    ]
                };
            };


            $scope.ntcBarChart = function(id){

                $scope.barlegend = "Weekly NTC Control Status"

                if(id === 'mocha'){

                    armNames = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                    ];
                    armValues = [4, 7, 3, 10, 1];
                    armValues1 = [3, 1, 1, 2, 3];

                    $scope.barData = {
                        labels: armNames,
                        datasets: [
                            {
                                label: "Accrual Dataset",
                                fillColor: "darkgreen",
                                strokeColor: "rgba(220,220,220,0.8)",
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues
                            },
                            {
                                fillColor: 'orange',
                                strokeColor: 'rgba(151,187,205,1)',
                                pointColor: 'rgba(151,187,205,1)',
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues1
                            }
                            ]};
                }
                else if (id === 'mdacc'){

                    armNames = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                    ];
                    armValues = [0, 0, 0, 1, 0];
                    armValues1 = [3, 1, 1, 2, 3];

                    $scope.barDataMDACC = {
                        labels: armNames,
                        datasets: [
                            {
                                label: "Accrual Dataset",
                                fillColor: "orange",
                                strokeColor: "rgba(220,220,220,0.8)",
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues
                            },
                            {
                                fillColor: 'darkgreen',
                                strokeColor: 'rgba(151,187,205,1)',
                                pointColor: 'rgba(151,187,205,1)',
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues1
                            }
                        ]};
                }

            };

    });
