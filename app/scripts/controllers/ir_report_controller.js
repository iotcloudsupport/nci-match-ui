angular.module('iradmin.matchbox',[])
    .controller('IrAdminController',
        function( $scope, $http, $window, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.irList = [];

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
    });
