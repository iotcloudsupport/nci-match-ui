angular.module('iradmin.matchbox',[])
    .controller('IrAdminController',
        function( $scope, $http, DTOptionsBuilder, irAdminApi) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
             .withDisplayLength(5);

        this.dtInstance = {};

        $scope.irList = [];
        $scope.positiveListMocha = [];
        $scope.positiveListMDCC = [];

        $scope.negativeListMocha = [];
        $scope.negativeListMDCC = [];

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
                            'dbReportPath': value.dbReportPath,
                            'dataFilePath': value.dataFilePath,
                            'logFilePath': value.logFilePath
                        });
                    });
                });
            };


            $scope.loadSampleControlsList = function () {
                irAdminApi
                    .loadSampleControlsList()
                    .then(function (d) {

                        angular.forEach(d.data, function (value,key) {

                            var positivesets = value.sampleControls;
                            var negativesets = value.ntcControls;

                            //Positive sets
                            angular.forEach(positivesets, function (v,k) {

                                if(v.site === 'MoCha'){

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

                                if(v.site === 'MoCha'){

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
                    });
            };
    });
