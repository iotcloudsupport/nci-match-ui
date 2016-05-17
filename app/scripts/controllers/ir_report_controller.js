angular.module('iradmin.matchbox',[])
    .controller('IrAdminController',
        function( $scope, $http, $window, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi, svgApi) {

            // .controller('MainCtrl', function (Database,Features,$scope,$http) {

    this.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(100);

    this.dtColumnDefs = [];

    this.dtInstance = {};

    $scope.irList = [];
    $scope.sampleList = [];
            $scope.geneData =[];

    $scope.loadHeartBeatList = function () {
        irAdminApi
            .getAdminHeartBeat()
            .then(function (d) {

                angular.forEach(d.data, function (value,key) {
                    var timer = ['fa fa-clock-o fa-2x', 'color:green'];

                    if (key === 2) {
                        timer = ['fa fa-warning fa-2x', 'color:orange'];
                    }

                    if (key === 3) {
                        timer = ['fa fa-warning fa-2x', 'color:red'];
                    }

                    $scope.irList.push({
                        'timer': timer,
                        'hostName': value.hostName,
                        'ipAddress': value.ipAddress,
                        'externalIpAddress': value.externalIpAddress,
                        'status': value.status,
                        'lastContactDate': value.lastContactDate,
                        'dbReport': value.dbReport,
                        'dataFile': value.dataFile,
                        'logFile': value.logFile,
                        'location': value.location,
                        'dbReportPath': value.dbReportPath,
                        'dataFilePath': value.dataFilePath,
                        'logFilePath': value.logFilePath
                    });
                });
            });
        };


        $scope.loadSvgGeneList = function () {
            svgApi
                .getSvgGene()
                .then(function (d) {

                    $window.d3BoxVersion5(d.data);

                    // GeneSvg.buildGeneChartVersion5(d.data.parsedVCFGenes,mapd,cellularity,tvcVersion,screenwidth);
                });
        };



        $scope.loadPositiveSamples = function () {
            irAdminApi
                .getPosiveSample()
                .then(function (d) {

                    angular.forEach(d.data, function (value,key) {

                        //array.push(value.dbReportPath)
                        var timer = 'fa fa-clock-o fa-2x';


                        // $scope.sampleList.push({
                        //     'timer': timer,
                        //     'hostName': value.hostName,
                        //     'ipAddress': value.ipAddress,
                        //     'externalIpAddress': value.externalIpAddress,
                        //     'status': value.status,
                        //     'lastContactDate': value.lastContactDate,
                        //     'dbReport': value.dbReport,
                        //     'dataFile': value.dataFile,
                        //     'logFile': value.logFile,
                        //     'location': value.location,
                        //     'dbReportPath': value.dbReportPath,
                        //     'dataFilePath': value.dataFilePath,
                        //     'logFilePath': value.logFilePath
                        // });
                    });
                });
        };

    });
