angular.module('iradmin.matchbox',[])
    .controller('IrAdminController', function( $scope, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, irAdminApi) {
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

                    var array = [];

                    //alert(JSON.stringify(value.hostName))

                    //"dbReportPath" : /local/content/wildfly/standalone-18080/log/iruploader/129-43-127-133/dbreport-1458133264676.json,
                    //    "dataFilePath" : /local/content/wildfly/standalone-18080/log/iruploader/129-43-127-133/data-1458143402272.txt,
                    //    "logFilePath" : /local/content/wildfly/standalone-18080/log/iruploader/129-43-127-133/iruploader-1458133264676.log


                    //array.push(value.dbReportPath)
                    var timer = 'fa fa-clock-o fa-2x';


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
        }
    });
